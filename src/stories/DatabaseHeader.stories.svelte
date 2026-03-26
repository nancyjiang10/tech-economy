<!--
  DatabaseHeader.stories.svelte

  Stories for the DatabaseHeader component.
  DatabaseHeader is a full-width hero banner with a headline, optional description,
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
  import DatabaseHeader from '$lib/components/DatabaseHeader.svelte';

  const { Story } = defineMeta({
    title: 'Components/DatabaseHeader',
    component: DatabaseHeader,
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
    headline: 'Search Our Programs',
    description: 'Explore degree programs, workshops, and fellowship opportunities at the Craig Newmark Graduate School of Journalism.',
    bgColor: 'var(--color-light-gray)',
  }}
/>

<!-- Dark: hero with dark background and white text -->
<Story
  name="Dark"
  args={{
    headline: 'Search Our Programs',
    description: 'Explore degree programs, workshops, and fellowship opportunities at the Craig Newmark Graduate School of Journalism.',
    bgColor: '#1a1a1a',
    dark: true,
  }}
/>

<!-- CUNY Blue: hero using the brand accent color -->
<Story
  name="CUNY Blue"
  args={{
    headline: 'Find Your Path at CUNY Journalism',
    description: 'Master\'s degrees, professional education, and media center resources — all at an affordable price.',
    bgColor: 'var(--color-accent)',
    dark: true,
  }}
/>

<!-- Headline Only: minimal hero with just a headline -->
<Story
  name="Headline Only"
  args={{
    headline: 'Craig Newmark Graduate School of Journalism',
    bgColor: 'var(--color-light-gray)',
  }}
/>
