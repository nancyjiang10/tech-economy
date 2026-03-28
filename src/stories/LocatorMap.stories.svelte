<!--
  LocatorMap.stories.svelte

  Stories for the LocatorMap component.
  LocatorMap renders a square, non-interactive MapLibre GL JS map centered on
  a given location using an OpenFreeMap-hosted basemap.

  Props:
  - longitude: Map center longitude (default: -73.9857)
  - latitude: Map center latitude (default: 40.7484)
  - zoom: Initial zoom level 0–22 (default: 13)
  - style: MapLibre style URL (default: OpenFreeMap liberty)
  - caption: Optional caption text below the map
  - credit: Optional credit line
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import LocatorMap from '$lib/components/LocatorMap.svelte';

  const { Story } = defineMeta({
    title: 'Components/LocatorMap',
    component: LocatorMap,
    tags: ['autodocs'],
    argTypes: {
      longitude: {
        control: { type: 'number', step: 0.001 },
        description: 'Map center longitude',
      },
      latitude: {
        control: { type: 'number', step: 0.001 },
        description: 'Map center latitude',
      },
      zoom: {
        control: { type: 'range', min: 0, max: 22, step: 0.5 },
        description: 'Initial zoom level (0 = world, 22 = building)',
      },
      style: {
        control: 'text',
        description: 'MapLibre style URL (defaults to OpenFreeMap liberty)',
      },
      caption: {
        control: 'text',
        description: 'Optional caption displayed below the map',
      },
      credit: {
        control: 'text',
        description: 'Optional credit attribution line',
      },
    },
  });
</script>

<!-- Default: Midtown Manhattan at street level with caption and credit -->
<Story
  name="Default"
  args={{
    longitude: -73.9857,
    latitude: 40.7484,
    zoom: 13,
    caption: 'The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
>
  {#snippet children(args)}
    <LocatorMap {...args} />
  {/snippet}
</Story>

<!-- No Caption: map without caption or credit -->
<Story
  name="No Caption"
  args={{
    longitude: -73.9857,
    latitude: 40.7484,
    zoom: 13,
  }}
>
  {#snippet children(args)}
    <LocatorMap {...args} />
  {/snippet}
</Story>

<!-- Neighborhood View: zoomed out to show neighborhood context -->
<Story
  name="Neighborhood View"
  args={{
    longitude: -73.9857,
    latitude: 40.7484,
    zoom: 11,
    caption: 'Midtown Manhattan, New York City.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
>
  {#snippet children(args)}
    <LocatorMap {...args} />
  {/snippet}
</Story>

<!-- City Overview: zoomed out to show the full city -->
<Story
  name="City Overview"
  args={{
    longitude: -74.006,
    latitude: 40.7128,
    zoom: 9,
    caption: 'New York City and its five boroughs.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
>
  {#snippet children(args)}
    <LocatorMap {...args} />
  {/snippet}
</Story>

<!-- Alternate Style: OpenFreeMap bright style -->
<Story
  name="Bright Style"
  args={{
    longitude: -73.9857,
    latitude: 40.7484,
    zoom: 13,
    style: 'https://tiles.openfreemap.org/styles/bright',
    caption: 'The Craig Newmark Graduate School of Journalism, rendered with the OpenFreeMap bright style.',
    credit: 'OpenFreeMap / OpenStreetMap contributors',
  }}
>
  {#snippet children(args)}
    <LocatorMap {...args} />
  {/snippet}
</Story>
