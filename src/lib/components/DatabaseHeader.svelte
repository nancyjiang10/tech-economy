<!--
@component
DatabaseHeader.svelte — A full-width hero header with optional background color,
headline, description, and children slot for additional content.
-->
<script>
  let {
    headline = '',
    description = '',
    bgColor = 'var(--color-light-gray)',
    children,
  } = $props();
</script>

<header
  class="hero-header"
  style:background-color={bgColor}
>
  <div class="hero-inner">
    <div class="hero-content">
      {#if headline}
        <h1 class="hero-headline">{headline}</h1>
      {/if}
      {#if description}
        <p class="hero-description">{description}</p>
      {/if}
    </div>
    {#if children}
      <div class="hero-extra">
        {@render children()}
      </div>
    {/if}
  </div>
</header>

<style lang="scss">
  @use '../styles' as *;

  .hero-header {
    width: 100%;
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .hero-inner {
    max-width: var(--max-width-wide);
    margin: 0 auto;
  }

  .hero-content {
    max-width: var(--max-width);
  }

  .hero-headline {
    font-family: var(--font-serif);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--leading-tight);
    color: var(--color-dark);
    margin-bottom: var(--spacing-sm);
  }

  .hero-description {
    font-family: var(--font-sans);
    font-size: var(--font-size-lg);
    line-height: var(--leading-relaxed);
    color: var(--color-text);
    margin-bottom: 0;
  }

  .hero-extra {
    margin-top: var(--spacing-md);
  }

  @include tablet {
    .hero-header {
      padding: var(--spacing-xxl) var(--spacing-md);
    }

    .hero-headline {
      font-size: var(--font-size-6xl);
    }

    .hero-description {
      font-size: var(--font-size-xl);
    }
  }

  @include desktop {
    .hero-headline {
      font-size: var(--font-size-display);
    }
  }
</style>
