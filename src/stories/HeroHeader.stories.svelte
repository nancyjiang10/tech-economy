<!--
  HeroHeader.stories.svelte

  Stories for the HeroHeader component.
  HeroHeader is a full-width hero banner with a headline, optional description,
  and a children slot for additional content. Supports light and dark themes.

  Props:
  - headline: Primary hero title
  - description: Supporting text below the headline
  - bgColor: Background color CSS value (default: var(--color-light-gray))
  - bgImage: Optional background image URL
  - dark: Boolean to toggle light/dark color scheme
  - children: Additional content rendered below the text
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HeroHeader from '$lib/components/HeroHeader.svelte';

  const { Story } = defineMeta({
    title: 'Components/HeroHeader',
    component: HeroHeader,
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
    argTypes: {
      headline: {
        control: 'text',
        description: 'Primary hero title',
      },
      description: {
        control: 'text',
        description: 'Supporting text below the headline',
      },
      bgColor: {
        control: 'color',
        description: 'Background color for the hero',
      },
      dark: {
        control: 'boolean',
        description: 'Use white text on a dark background',
      },
    },
  });
</script>

<!-- Default: light hero with headline and description -->
<Story
  name="Default"
  args={{
    headline: 'Search the Database',
    description: 'Explore records from across all five boroughs. Updated daily with the latest public data.',
    bgColor: 'var(--color-light-gray)',
  }}
/>

<!-- Dark: hero with dark background and white text -->
<Story
  name="Dark"
  args={{
    headline: 'Search the Database',
    description: 'Explore records from across all five boroughs. Updated daily with the latest public data.',
    bgColor: '#1a1a1a',
    dark: true,
  }}
/>

<!-- CUNY Blue: hero using the brand accent color -->
<Story
  name="CUNY Blue"
  args={{
    headline: 'NYC Public Records Lookup',
    description: 'A searchable database of public records, compiled and verified by the NYCity News Service.',
    bgColor: 'var(--color-accent)',
    dark: true,
  }}
/>

<!-- Headline Only: minimal hero with just a headline -->
<Story
  name="Headline Only"
  args={{
    headline: 'The New Colossus Project',
    bgColor: 'var(--color-light-gray)',
  }}
/>
