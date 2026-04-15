import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Geocoder from '$lib/components/Maps/Geocoder.svelte';

describe('Geocoder', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with default label and placeholder', () => {
    render(Geocoder);
    expect(screen.getByLabelText('Location')).toBeTruthy();
    expect(
      screen.getByPlaceholderText('Search for an address…')
    ).toBeTruthy();
  });

  it('accepts a custom label and placeholder', () => {
    render(Geocoder, {
      props: { label: 'Find a place', placeholder: 'Type here…' },
    });
    expect(screen.getByLabelText('Find a place')).toBeTruthy();
    expect(screen.getByPlaceholderText('Type here…')).toBeTruthy();
  });

  it('renders attribution text', () => {
    render(Geocoder);
    expect(screen.getByText('Nominatim')).toBeTruthy();
    expect(screen.getByText('OpenStreetMap')).toBeTruthy();
  });

  it('has proper combobox ARIA attributes', () => {
    const { container } = render(Geocoder);
    const combobox = container.querySelector('[role="combobox"]');
    expect(combobox).toBeTruthy();
    expect(combobox.getAttribute('aria-expanded')).toBe('false');
    expect(combobox.getAttribute('aria-haspopup')).toBe('listbox');
  });

  it('does not show results list initially', () => {
    const { container } = render(Geocoder);
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });

  it('shows loading indicator during fetch', async () => {
    // Mock fetch to hang so we can check loading state
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise(() => {
            /* never resolves */
          })
      )
    );

    const { container } = render(Geocoder, {
      props: { debounceMs: 0 },
    });

    const input = screen.getByPlaceholderText('Search for an address…');
    await fireEvent.input(input, { target: { value: 'New York' } });

    // Wait for the debounce (0ms) + microtask
    await new Promise((r) => setTimeout(r, 50));

    expect(container.querySelector('.loading-indicator')).toBeTruthy();
  });

  it('displays results from Nominatim response', async () => {
    const mockResults = [
      {
        place_id: 123,
        display_name: 'New York, NY, USA',
        lat: '40.7128',
        lon: '-74.0060',
        type: 'city',
      },
      {
        place_id: 456,
        display_name: 'New York Mills, MN, USA',
        lat: '46.5180',
        lon: '-95.3764',
        type: 'city',
      },
    ];

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResults),
        })
      )
    );

    render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Search for an address…');
    await fireEvent.input(input, { target: { value: 'New York' } });

    // Wait for debounce + fetch
    await new Promise((r) => setTimeout(r, 100));

    expect(screen.getByText('New York, NY, USA')).toBeTruthy();
    expect(screen.getByText('New York Mills, MN, USA')).toBeTruthy();
  });

  it('fires onresult when a result is selected', async () => {
    const mockResults = [
      {
        place_id: 123,
        display_name: 'New York, NY, USA',
        lat: '40.7128',
        lon: '-74.0060',
        type: 'city',
      },
    ];

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResults),
        })
      )
    );

    const onresult = vi.fn();
    render(Geocoder, { props: { debounceMs: 0, onresult } });

    const input = screen.getByPlaceholderText('Search for an address…');
    await fireEvent.input(input, { target: { value: 'New York' } });

    // Wait for debounce + fetch
    await new Promise((r) => setTimeout(r, 100));

    const option = screen.getByText('New York, NY, USA');
    await fireEvent.mouseDown(option);

    expect(onresult).toHaveBeenCalledWith({
      displayName: 'New York, NY, USA',
      lat: 40.7128,
      lng: -74.006,
    });
  });

  it('does not search for queries shorter than 3 characters', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);

    render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Search for an address…');
    await fireEvent.input(input, { target: { value: 'NY' } });

    // Wait for debounce
    await new Promise((r) => setTimeout(r, 50));

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('handles API errors gracefully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 500,
        })
      )
    );

    const { container } = render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Search for an address…');
    await fireEvent.input(input, { target: { value: 'New York' } });

    // Wait for debounce + fetch
    await new Promise((r) => setTimeout(r, 100));

    // Should not show results and should not crash
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });
});
