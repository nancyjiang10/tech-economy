<!--
  MethodologyBox.stories.svelte

  Stories for the MethodologyBox component.
  MethodologyBox displays an explanatory aside at the bottom of a story
  describing the reporting methodology, data sources, or caveats behind
  the journalism.

  Props:
  - title: Heading text (default: "How We Reported This Story")
  - children: Rich HTML content describing the methodology
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import MethodologyBox from '$lib/components/MethodologyBox.svelte';

  const { Story } = defineMeta({
    title: 'Components/MethodologyBox',
    component: MethodologyBox,
    tags: ['autodocs'],
    argTypes: {
      title: {
        control: 'text',
        description: 'Heading text shown at the top of the box',
      },
    },
  });
</script>

<!-- Default: standard methodology disclosure -->
<Story name="Default">
  <div class="story-container">
    <MethodologyBox>
      <p>
        The data in this story was obtained through a Freedom of Information Law request
        to the New York City Department of Buildings. Records cover inspections conducted
        between January 2020 and December 2024. We excluded records flagged as duplicates
        by the agency and verified a random sample of 200 entries against court filings.
      </p>
      <p>
        Analysis was performed using Python and the pandas library. Our code and data are
        available on <a href="https://github.com">GitHub</a>.
      </p>
    </MethodologyBox>
  </div>
</Story>

<!-- Custom Title -->
<Story name="Custom Title">
  <div class="story-container">
    <MethodologyBox title="About the Data">
      <p>
        This database is built from public records published by the NYC Department of
        Education and updated weekly. School-level data is aggregated from individual
        incident reports filed by principals and verified by district superintendents.
      </p>
    </MethodologyBox>
  </div>
</Story>

<!-- With Links: methodology that references external sources -->
<Story name="With Links">
  <div class="story-container">
    <MethodologyBox title="Sources and Methodology">
      <p>
        Exposed discharge data comes from the
        <a href="https://data.cityofnewyork.us">NYC Open Data portal</a> and was
        cross-referenced with records from the
        <a href="https://www.dec.ny.gov">NYS Department of Environmental Conservation</a>.
        Population estimates are from the U.S. Census Bureau's
        <a href="https://www.census.gov/programs-surveys/acs">American Community Survey</a>
        (2020–2024 five-year estimates).
      </p>
      <p>
        If you find errors or have questions about this data, please contact us at
        <a href="mailto:data@nycitynewsservice.com">data@nycitynewsservice.com</a>.
      </p>
    </MethodologyBox>
  </div>
</Story>

<style>
  .story-container {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md);
  }
</style>
