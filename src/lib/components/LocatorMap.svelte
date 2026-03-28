<!--
@component
LocatorMap.svelte — Static locator map using MapLibre GL JS

Renders a square, non-interactive map centered on a given location,
using an OpenFreeMap-hosted basemap tile service.

USAGE EXAMPLE:
<LocatorMap
  longitude={-73.9857}
  latitude={40.7484}
  zoom={13}
  caption="The Craig Newmark Graduate School of Journalism is in Midtown Manhattan."
  credit="OpenFreeMap / OpenStreetMap contributors"
/>
-->
<script>
  import { onMount } from 'svelte';
  import 'maplibre-gl/dist/maplibre-gl.css';

  let {
    longitude = -73.9857,    // Map center longitude (default: Midtown Manhattan)
    latitude = 40.7484,      // Map center latitude
    zoom = 13,               // Initial zoom level (0–22)
    style = 'https://tiles.openfreemap.org/styles/liberty', // OpenFreeMap basemap style URL
    caption = '',            // Optional caption below the map
    credit = '',             // Optional credit line
  } = $props();

  let mapContainer;
  let map;

  // Build a descriptive label for screen readers from the caption or coordinates
  const ariaLabel = $derived(
    caption
      ? `Map: ${caption}`
      : `Locator map centered at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
  );

  onMount(() => {
    import('maplibre-gl')
      .then(({ Map }) => {
        map = new Map({
          container: mapContainer,
          style,
          center: [longitude, latitude],
          zoom,
          interactive: false,  // Static locator map — no pan or zoom by the user
        });
      })
      .catch((err) => {
        console.error('LocatorMap: failed to load maplibre-gl', err);
      });

    return () => {
      if (map) map.remove();
    };
  });
</script>

<figure class="locator-map-figure">
  <div
    class="locator-map"
    bind:this={mapContainer}
    role="img"
    aria-label={ariaLabel}
  ></div>
  {#if caption || credit}
    <figcaption class="caption-container">
      {#if caption}
        <span class="caption">{caption}</span>
      {/if}
      {#if credit}
        <span class="credit">{credit}</span>
      {/if}
    </figcaption>
  {/if}
</figure>

<style lang="scss">
  @use '../styles' as *;

  .locator-map-figure {
    margin: var(--spacing-md) 0;
    padding: 0;
    width: 100%;

    @include tablet {
      margin: var(--spacing-lg) 0;
    }
  }

  .locator-map {
    width: 100%;
    aspect-ratio: 1 / 1;
    display: block;
  }

  .caption-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    padding-top: var(--spacing-xs);
    margin-top: var(--spacing-xs);
  }

  .caption {
    font-size: var(--font-size-sm);
    line-height: var(--leading-caption);
    color: var(--color-text);
  }

  .credit {
    font-size: var(--font-size-xs);
    color: var(--color-medium-gray);
    font-style: italic;
  }
</style>
