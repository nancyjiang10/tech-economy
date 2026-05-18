<!--
@component
ArticleHeader.svelte — NYCity News Service Style Article Header

Displays the headline and metadata line with icons in the NYCity style:
- Optional kicker (eyebrow label) above the headline
- Large serif headline (via Headline subcomponent)
- Bordered metadata box with date (via Pubdate) and authors (via Byline)

USAGE EXAMPLE:
<ArticleHeader
  headline="City Council Approves New Budget"
  kicker="City Hall"
  byline="Jane Smith, John Doe"
  pubDate="2024-01-15"
/>
-->
<script>
  import Kicker from './Kicker.svelte';
  import Headline from './Headline.svelte';
  import Byline from './Byline.svelte';
  import Pubdate from './Pubdate.svelte';

  let {
    headline, // Required: The main title of the article
    kicker = '', // Optional: Eyebrow label rendered above the headline
    byline = '', // Optional: The author's name(s)
    pubDate = '', // Optional: Publication date in YYYY-MM-DD format
  } = $props();
</script>

<header class="article-header">
  <Kicker text={kicker} />
  <Headline text={headline} />

  {#if byline || pubDate}
    <div class="meta">
      {#if byline}
        <div class="meta-item meta-byline">
          <Byline {byline} />
        </div>
      {/if}

      {#if pubDate}
        <div class="meta-item meta-date">
          <Pubdate date={pubDate} />
        </div>
      {/if}
    </div>
  {/if}
</header>

<style lang="scss">
  @use '../../styles' as *;

  .article-header {
    margin-bottom: var(--spacing-md);
  }

  .meta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-xxs);
    margin-top: var(--spacing-sm);
  }

  .meta-item {
    display: block;
  }

  .meta-byline {
    text-align: center;
  }

  .meta-date :global(.pubdate) {
    font-size: var(--font-size-sm);
    color: var(--color-dark);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    margin: 0;
    text-align: center;
  }

  /* Tablet and up: inline meta */
  @include tablet {
    .article-header {
      margin-bottom: var(--spacing-lg);
    }

    .meta {
      gap: var(--spacing-xxs);
    }
  }
</style>
