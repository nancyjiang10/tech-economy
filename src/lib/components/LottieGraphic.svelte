<!--
@component
LottieGraphic.svelte — Renders a Lottie animation using @lottiefiles/dotlottie-web.
Uses a canvas-based renderer for reliable, high-performance playback.
-->
<script>
  import { onMount } from 'svelte';

  let {
    src = '',
    animationData = null,
    loop = true,
    autoplay = true,
    ariaLabel = 'Animated graphic',
  } = $props();

  let canvas;
  let player;

  onMount(() => {
    import('@lottiefiles/dotlottie-web').then(({ DotLottie }) => {
      const options = {
        canvas,
        autoplay,
        loop,
        renderConfig: {
          autoResize: true,
        },
      };

      if (animationData) {
        options.data = JSON.stringify(animationData);
      } else if (src) {
        options.src = src;
      }

      player = new DotLottie(options);
    });

    return () => {
      if (player) {
        player.destroy();
      }
    };
  });
</script>

<div
  class="lottie-graphic"
  role="img"
  aria-label={ariaLabel}
>
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .lottie-graphic {
    width: 100%;
  }

  canvas {
    width: 100%;
    height: auto;
    display: block;
  }
</style>
