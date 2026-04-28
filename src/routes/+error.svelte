<!--
@component
Custom error page with animated "404" and a friendly message.
Shown when SvelteKit encounters a page that doesn't exist.
-->
<script>
  import { page } from '$app/state';
  import { base } from '$app/paths';
</script>

<svelte:head>
  <title>{page.status} | Page not found</title>
</svelte:head>

<div class="error-page">
  <div class="error-content">
    <!-- Accessible status announcement for screen readers -->
    <span class="sr-only">Error {page.status}:</span>

    <!-- Animated glitch-style status code (decorative duplicate) -->
    <p class="error-code" aria-hidden="true" data-text={page.status}>
      {page.status}
    </p>

    <h1 class="error-headline">
      {#if page.status === 404}
        This page got lost in the newsroom.
      {:else}
        Something went wrong.
      {/if}
    </h1>

    <p class="error-message">
      {#if page.error?.message}
        {page.error.message}
      {:else}
        The page you're looking for doesn't exist or has been moved.
      {/if}
    </p>

    <a href="{base}/" class="error-link">← Back to the homepage</a>
  </div>
</div>

<style lang="scss">
  @use '$lib/styles' as *;

  .error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    padding: var(--spacing-xl) var(--spacing-md);
    text-align: center;
  }

  .error-content {
    max-width: 600px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Large animated status code with pseudo-element glitch layers */
  .error-code {
    font-family: var(--font-sans);
    font-size: 8rem;
    font-weight: var(--font-weight-extrabold);
    line-height: 1;
    margin-bottom: var(--spacing-md);
    position: relative;
    display: inline-block;

    /* Animated gradient text */
    background: linear-gradient(
      90deg,
      var(--color-cuny-blue-dark),
      var(--color-accent),
      var(--color-cuny-blue-light)
    );
    background-size: 200% 100%;
    animation: gradient-text 4s ease-in-out infinite;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    /* Glitch offset layers via pseudo-elements */
    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: inherit;
      background-size: inherit;
      animation: inherit;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.6;
    }

    &::before {
      animation:
        gradient-text 4s ease-in-out infinite,
        glitch-left 3s ease-in-out infinite;
      clip-path: inset(20% 0 40% 0);
    }

    &::after {
      animation:
        gradient-text 4s ease-in-out infinite,
        glitch-right 3s ease-in-out infinite;
      clip-path: inset(60% 0 10% 0);
    }
  }

  @keyframes gradient-text {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes glitch-left {
    0%,
    100% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-3px);
    }
    40% {
      transform: translateX(3px);
    }
    60% {
      transform: translateX(-2px);
    }
    80% {
      transform: translateX(1px);
    }
  }

  @keyframes glitch-right {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(4px);
    }
    50% {
      transform: translateX(-2px);
    }
    75% {
      transform: translateX(3px);
    }
  }

  .error-headline {
    font-family: var(--font-serif);
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-normal);
    color: var(--color-dark);
    margin-bottom: var(--spacing-sm);
  }

  .error-message {
    font-family: var(--font-sans);
    font-size: var(--font-size-lg);
    color: var(--color-medium-gray);
    margin-bottom: var(--spacing-lg);
    line-height: var(--leading-relaxed);
  }

  .error-link {
    display: inline-block;
    font-family: var(--font-sans);
    font-size: var(--font-size-base);
    font-weight: var(--font-weight-semibold);
    color: var(--color-white);
    background-color: var(--color-accent);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--border-radius-sm);
    text-decoration: none;
    transition:
      background-color 0.2s ease,
      transform 0.2s ease;

    &:hover {
      background-color: var(--color-cuny-blue-dark);
      color: var(--color-white);
      transform: translateY(-1px);
    }
  }

  @include mobile {
    .error-code {
      font-size: 5rem;
    }

    .error-headline {
      font-size: var(--font-size-xl);
    }
  }
</style>
