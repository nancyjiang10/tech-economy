<!--
@component
HeroHeader.svelte — A full-width hero header with optional background color/image,
headline, description, and children slot for additional content.
-->
<script>
  let {
    headline = '',
    description = '',
    bgColor = 'var(--color-light-gray)',
    bgImage = '',
    dark = false,
    children,
  } = $props();
</script>

<header
  class="hero-header"
  class:hero-dark={dark}
  style:background-color={bgColor}
  style:background-image={bgImage ? `url(${bgImage})` : 'none'}
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
    background-size: cover;
    background-position: center;
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

  /* Dark theme variant */
  .hero-dark .hero-headline {
    color: var(--color-white);
  }

  .hero-dark .hero-description {
    color: rgba(255, 255, 255, 0.85);
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
