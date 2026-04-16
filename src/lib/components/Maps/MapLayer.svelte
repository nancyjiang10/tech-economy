<!--
@component
MapLayer.svelte — Adds a GeoJSON source and layer to a parent Map

Must be placed as a child of a Map component. Uses Svelte context to
obtain the MapLibre GL map instance, then adds a GeoJSON source and a
styled layer. The layer is automatically removed when the component is
destroyed or when the map style changes and reloads.

USAGE EXAMPLE:
<Map longitude={-74.006} latitude={40.7128} zoom={10}>
  <MapLayer
    id="my-points"
    type="circle"
    data={{
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [-74.006, 40.7128] },
          properties: { name: 'NYC' },
        },
      ],
    }}
    paint={{ 'circle-radius': 8, 'circle-color': '#0033A1' }}
  />
</Map>
-->
<script>
  import { getContext, onDestroy } from 'svelte';

  let {
    id, // Unique layer identifier (required)
    type = 'circle', // MapLibre layer type: 'circle' | 'fill' | 'line' | 'symbol'
    data = { type: 'FeatureCollection', features: [] }, // GeoJSON data
    paint = {}, // MapLibre paint properties
    layout = {}, // MapLibre layout properties
  } = $props();

  if (typeof id !== 'string' || id.trim() === '') {
    throw new Error('MapLayer requires a non-empty string "id" prop.');
  }

  const ctx = getContext('maplibre-map');
  if (!ctx) {
    throw new Error(
      'MapLayer must be placed inside a Map component. No map context found.'
    );
  }

  /** Adds the source and layer to the map. */
  function addLayer() {
    const map = ctx.getMap();
    if (!map) return;

    // Remove existing source/layer if already present (e.g. after style reload)
    if (map.getLayer(id)) map.removeLayer(id);
    if (map.getSource(id)) map.removeSource(id);

    map.addSource(id, {
      type: 'geojson',
      data,
    });

    map.addLayer({
      id,
      type,
      source: id,
      paint,
      layout,
    });
  }

  /** Removes the source and layer from the map. */
  function removeLayer() {
    const map = ctx.getMap();
    if (!map) return;
    if (map.getLayer(id)) map.removeLayer(id);
    if (map.getSource(id)) map.removeSource(id);
  }

  // Re-add the layer whenever the map style reloads (e.g. theme change)
  function handleStyleLoad() {
    addLayer();
  }

  // Add the layer now (map is already ready because Map renders children
  // only after mapReady is true).
  addLayer();
  ctx.onStyleLoad(handleStyleLoad);

  // Reactively update the GeoJSON data when the data prop changes
  $effect(() => {
    const map = ctx.getMap();
    if (!map) return;
    const currentData = data; // read reactive prop
    const source = map.getSource(id);
    if (source) {
      source.setData(currentData);
    }
  });

  // Track previous paint keys so we can unset removed properties
  let previousPaintKeys = Object.keys(paint);

  // Reactively update paint properties when paint prop changes
  $effect(() => {
    const map = ctx.getMap();
    if (!map || !map.getLayer(id)) return;
    const currentPaint = paint; // read reactive prop
    const currentKeys = Object.keys(currentPaint);

    // Unset any paint properties that were removed
    for (const key of previousPaintKeys) {
      if (!(key in currentPaint)) {
        map.setPaintProperty(id, key, undefined);
      }
    }

    // Apply current paint properties
    for (const [key, value] of Object.entries(currentPaint)) {
      map.setPaintProperty(id, key, value);
    }

    previousPaintKeys = currentKeys;
  });

  onDestroy(() => {
    ctx.offStyleLoad(handleStyleLoad);
    removeLayer();
  });
</script>
