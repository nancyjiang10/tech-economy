<!--
@component
LottieGraphic.svelte — Renders a Lottie animation from a JSON URL or object.
Uses the lottie-web library for high-quality vector animations.
-->
<script>
  import { onMount, onDestroy } from 'svelte';

  let {
    src = '',
    animationData = null,
    loop = true,
    autoplay = true,
    ariaLabel = 'Animated graphic',
  } = $props();

  let containerEl;
  let animationInstance;

  onMount(async () => {
    const lottie = (await import('lottie-web')).default;

    const options = {
      container: containerEl,
      renderer: 'svg',
      loop,
      autoplay,
    };

    if (animationData) {
      options.animationData = animationData;
    } else if (src) {
      options.path = src;
    }

    animationInstance = lottie.loadAnimation(options);
  });

  onDestroy(() => {
    if (animationInstance) {
      animationInstance.destroy();
    }
  });
</script>

<div
  class="lottie-graphic"
  bind:this={containerEl}
  role="img"
  aria-label={ariaLabel}
></div>

<style>
  .lottie-graphic {
    width: 100%;
    height: auto;
  }

  .lottie-graphic :global(svg) {
    display: block;
    width: 100%;
    height: auto;
  }
</style>
