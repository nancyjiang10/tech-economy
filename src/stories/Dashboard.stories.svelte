<!--
  Dashboard.stories.svelte

  Stories for the Dashboard component.
  Dashboard is a flex-row layout container designed to hold BigNumber stat cards
  side by side. It wraps on small screens so cards stack vertically on mobile.

  Props:
  - children: BigNumber (or other) components passed between opening/closing tags
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Dashboard from '$lib/components/Dashboard.svelte';
  import BigNumber from '$lib/components/BigNumber.svelte';

  const { Story } = defineMeta({
    title: 'Components/Dashboard',
    component: Dashboard,
    tags: ['autodocs'],
    parameters: {
      layout: 'padded',
    },
  });
</script>

<!-- Default: three BigNumber cards in a row -->
<Story name="Default">
  <Dashboard>
    <BigNumber number="305 ft" label="Height to Torch Tip" />
    <BigNumber number="4M" label="Annual Visitors" />
    <BigNumber number="225 tons" label="Weight of Copper & Steel" />
  </Dashboard>
</Story>

<!-- Two Stats: two-card layout -->
<Story name="Two Stats">
  <Dashboard>
    <BigNumber number="1886" label="Year Dedicated" />
    <BigNumber number="354" label="Steps to the Crown" footnote="From pedestal base to crown" />
  </Dashboard>
</Story>

<!-- Three Stats: three-card layout -->
<Story name="Three Stats">
  <Dashboard>
    <BigNumber number="151 ft" label="Statue Height" />
    <BigNumber number="25" label="Crown Windows" />
    <BigNumber number="7" label="Crown Rays" />
  </Dashboard>
</Story>

<!-- With Footnotes: stat cards with source attribution -->
<Story name="With Footnotes">
  <Dashboard>
    <BigNumber
      number="1883"
      label="Year Poem Written"
      footnote="Emma Lazarus, 'The New Colossus'"
    />
    <BigNumber
      number="1903"
      label="Year Plaque Mounted"
      footnote="On the pedestal's inner wall"
    />
    <BigNumber
      number="3/32 in"
      label="Copper Thickness"
      footnote="About two stacked pennies"
    />
  </Dashboard>
</Story>
