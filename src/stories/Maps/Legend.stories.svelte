<!--
  Legend.stories.svelte

  Stories for the Legend component.
  Legend renders threshold, continuous, and diverging quantitative legends.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Legend from '$lib/components/Maps/Legend.svelte';

  const { Story } = defineMeta({
    title: 'Maps/Legend',
    component: Legend,
    tags: ['autodocs'],
    argTypes: {
      title: {
        control: 'text',
        description: 'Optional legend heading displayed above the scale.',
      },
      mode: {
        control: { type: 'select' },
        options: ['threshold', 'continuous', 'diverging'],
        description: 'Legend rendering mode.',
      },
      items: {
        control: 'object',
        description:
          'Threshold bins with numeric bounds and colors, used by threshold and diverging modes.',
      },
      stops: {
        control: 'object',
        description: 'Ordered continuous color stops with numeric values.',
      },
      ticks: {
        control: 'object',
        description: 'Optional tick values and labels for continuous mode.',
      },
      midpoint: {
        control: 'number',
        description: 'Explicit midpoint value for diverging mode.',
      },
      midpointLabel: {
        control: 'text',
        description: 'Optional label displayed at the diverging midpoint.',
      },
    },
  });
</script>

<script>
  import Map from '$lib/components/Maps/Map.svelte';

  const thresholdItems = [
    { to: 10, color: '#f4d35e' },
    { from: 10, to: 25, color: '#ee964b' },
    { from: 25, to: 50, color: '#f95738' },
    { from: 50, color: '#9c1c13' },
  ];

  const continuousStops = [
    { value: 0, color: '#edf8fb' },
    { value: 50, color: '#66c2a4' },
    { value: 100, color: '#238b45' },
  ];

  const continuousTicks = [
    { value: 0, label: '0%' },
    { value: 25, label: '25%' },
    { value: 50, label: '50%' },
    { value: 75, label: '75%' },
    { value: 100, label: '100%' },
  ];

  const divergingItems = [
    { to: -15, color: '#b2182b' },
    { from: -15, to: 0, color: '#ef8a62' },
    { from: 0, to: 15, color: '#67a9cf' },
    { from: 15, color: '#2166ac' },
  ];
</script>

<Story
  name="Threshold"
  args={{
    title: 'Rent Burden (%)',
    mode: 'threshold',
    items: thresholdItems,
  }}
/>

<Story
  name="Continuous Gradient"
  args={{
    title: 'Graduation Rate',
    mode: 'continuous',
    stops: continuousStops,
    ticks: continuousTicks,
  }}
/>

<Story
  name="Diverging Midpoint"
  args={{
    title: 'Change Since 2020',
    mode: 'diverging',
    items: divergingItems,
    midpoint: 0,
    midpointLabel: 'No change',
  }}
/>

<Story name="Map Layout" asChild>
  <div class="map-layout-story">
    <div class="map-layout-main">
      <Map
        longitude={-74.006}
        latitude={40.7128}
        zoom={10}
        caption="Example map with a legend placed alongside the viewport."
      />
    </div>

    <Legend
      title="Change Since 2020"
      mode="diverging"
      items={divergingItems}
      midpoint={0}
      midpointLabel="No change"
    />
  </div>
</Story>

<style lang="scss">
  @use '$lib/styles' as *;

  .map-layout-story {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 18rem;
    gap: var(--spacing-md);
    align-items: start;
  }

  @include mobile {
    .map-layout-story {
      grid-template-columns: 1fr;
    }
  }
</style>
