<!--
  PortfolioPage.stories.svelte

  A personal portfolio page combining the Profile hero component with a responsive card grid of work samples.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Profile from '$lib/components/Portfolio/Profile.svelte';
  import Card from '$lib/components/Data/Card.svelte';

  const BYLINE = 'Max Eastman';

  const BIO =
    "I am the editor of The Masses, a monthly socialist magazine based in New York City. My writing covers politics, art, the labor movement and the fight for civil liberties.\n\nI am completing a translation of Leon Trotsky's writings for American readers and reporting on the prosecution of anti-war journalists like myself under the Espionage Act.";

  const CLIPS = [
    {
      title: 'The Trial of The Masses',
      description:
        "A first-hand account of the federal government's attempt to silence New York's most radical publication.",
      category: 'Investigative',
      href: 'https://www.marxists.org/archive/eastman/',
      image: '/photos/max-eastman-masses-trial.jpg',
    },
    {
      title: 'The Suffragettes of Washington Square',
      description:
        "Reporting on the organizers who turned Greenwich Village into the center of New York's suffrage movement.",
      category: 'News',
      href: 'https://www.marxists.org/archive/eastman/',
      image: '/photos/suffragettes-nyt-1921.jpg',
    },
    {
      title: 'Since Lenin Died',
      description:
        'Reflections on the failure of the Russian Revolution and the rise of Stalinism',
      category: 'Feature',
      href: 'https://www.marxists.org/archive/eastman/',
      image: '/photos/stalin-1920-1.jpg',
    },
  ];

  const { Story } = defineMeta({
    title: 'Compositions/Portfolio Page',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
  });
</script>

<script>
</script>

<Story name="Default" asChild>
  <div>
    <div class="container">
      <Profile
        name={BYLINE}
        tagline="Editor · Poet · Reformed revolutionary"
        photo="/photos/max-eastman.jpg"
        photoAlt="Max Eastman, circa 1913. Bain News Service, Library of Congress."
        email="max.eastman@themasses.org"
        github="maxeastman"
        linkedin="maxeastman"
        nowNext={BIO}
      />

      <div class="clips-header">
        <h2>Selected Work</h2>
      </div>

      <div class="card-grid">
        {#each CLIPS as clip (clip.title)}
          <Card href={clip.href} image={clip.image} imageAlt={clip.title}>
            <h3>{clip.title}</h3>
            <p>{clip.description}</p>
          </Card>
        {/each}
      </div>
    </div>
  </div>
</Story>

<style lang="scss">
  @use '$lib/styles' as *;

  .container {
    width: 100%;
    max-width: calc(var(--max-width-wide) + 160px);
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md);
  }

  .clips-header {
    margin-bottom: var(--spacing-md);

    h2 {
      margin: 0;
    }
  }

  .card-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);

    // Match all thumbnails to the suffragettes image proportion.
    :global(.card-image img) {
      width: 100%;
      aspect-ratio: 749 / 566;
      object-fit: cover;
      object-position: top;
    }

    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }

    @include desktop {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
