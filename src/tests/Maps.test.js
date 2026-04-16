import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import Geocoder from '$lib/components/Maps/Geocoder.svelte';

/** Standard Nominatim-shaped mock response used by several tests. */
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

/** Stubs globalThis.fetch with a successful Nominatim response. */
function stubFetchSuccess(data = mockResults) {
  vi.stubGlobal(
    'fetch',
    vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(data),
      })
    )
  );
}

/** Types into the input and advances fake timers past the debounce + fetch. */
async function typeAndSearch(input, text) {
  await fireEvent.input(input, { target: { value: text } });
  await vi.advanceTimersByTimeAsync(0); // debounce fires (debounceMs=0)
  await vi.advanceTimersByTimeAsync(0); // flush fetch microtasks
}

describe('Geocoder', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
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

  it('has proper combobox ARIA attributes on the input', () => {
    render(Geocoder);
    const input = screen.getByPlaceholderText('Search for an address…');
    expect(input.getAttribute('role')).toBe('combobox');
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(input.getAttribute('aria-haspopup')).toBe('listbox');
    expect(input.getAttribute('aria-autocomplete')).toBe('list');
  });

  it('does not show results list initially', () => {
    const { container } = render(Geocoder);
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });

  it('shows loading indicator during fetch', async () => {
    let resolveFetch;
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) => {
            resolveFetch = resolve;
          })
      )
    );

    const { container } = render(Geocoder, {
      props: { debounceMs: 0 },
    });

    const input = screen.getByPlaceholderText('Search for an address…');
    await fireEvent.input(input, { target: { value: 'New York' } });
    await vi.advanceTimersByTimeAsync(0);

    expect(container.querySelector('.loading-indicator')).toBeTruthy();

    // Resolve so the component finishes cleanly
    resolveFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });
    await vi.advanceTimersByTimeAsync(0);
  });

  it('displays results from Nominatim response', async () => {
    stubFetchSuccess();
    render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Search for an address…');
    await typeAndSearch(input, 'New York');

    expect(screen.getByText('New York, NY, USA')).toBeTruthy();
    expect(screen.getByText('New York Mills, MN, USA')).toBeTruthy();
  });

  it('fires onresult when a result is selected', async () => {
    stubFetchSuccess(mockResults.slice(0, 1));

    const onresult = vi.fn();
    render(Geocoder, { props: { debounceMs: 0, onresult } });

    const input = screen.getByPlaceholderText('Search for an address…');
    await typeAndSearch(input, 'New York');

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
    await vi.advanceTimersByTimeAsync(0);

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
    await typeAndSearch(input, 'New York');

    // Should not show results and should not crash
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });

  // --- Keyboard navigation tests ---

  it('ArrowDown moves activeIndex through results', async () => {
    stubFetchSuccess();
    render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Search for an address…');
    await typeAndSearch(input, 'New York');

    // First ArrowDown → index 0
    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    let options = screen.getAllByRole('option');
    expect(options[0].getAttribute('aria-selected')).toBe('true');
    expect(options[1].getAttribute('aria-selected')).toBe('false');

    // Second ArrowDown → index 1
    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    options = screen.getAllByRole('option');
    expect(options[0].getAttribute('aria-selected')).toBe('false');
    expect(options[1].getAttribute('aria-selected')).toBe('true');
  });

  it('ArrowUp from -1 jumps to the last result', async () => {
    stubFetchSuccess();
    render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Search for an address…');
    await typeAndSearch(input, 'New York');

    // ArrowUp when no item is active → last item
    await fireEvent.keyDown(input, { key: 'ArrowUp' });
    const options = screen.getAllByRole('option');
    expect(options[options.length - 1].getAttribute('aria-selected')).toBe(
      'true'
    );
  });

  it('Enter selects the active result', async () => {
    stubFetchSuccess(mockResults.slice(0, 1));
    const onresult = vi.fn();
    render(Geocoder, { props: { debounceMs: 0, onresult } });

    const input = screen.getByPlaceholderText('Search for an address…');
    await typeAndSearch(input, 'New York');

    await fireEvent.keyDown(input, { key: 'ArrowDown' });
    await fireEvent.keyDown(input, { key: 'Enter' });

    expect(onresult).toHaveBeenCalledWith({
      displayName: 'New York, NY, USA',
      lat: 40.7128,
      lng: -74.006,
    });
  });

  it('Escape closes the dropdown', async () => {
    stubFetchSuccess();
    const { container } = render(Geocoder, { props: { debounceMs: 0 } });

    const input = screen.getByPlaceholderText('Search for an address…');
    await typeAndSearch(input, 'New York');

    // Listbox should be open
    expect(container.querySelector('[role="listbox"]')).toBeTruthy();

    await fireEvent.keyDown(input, { key: 'Escape' });

    // Listbox should be closed
    expect(container.querySelector('[role="listbox"]')).toBeNull();
  });
});
