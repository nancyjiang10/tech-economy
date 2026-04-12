<!--
@component
SlideGallery.svelte — A horizontal, tap-navigated gallery container for
Instagram Stories-style multimedia presentations.

Displays one slide at a time with tap-to-advance navigation (tap right
two-thirds to go forward, left third to go back) and dot indicators at
the bottom showing the current position.

On desktop viewports (768px+), the gallery is constrained to a phone-like
aspect ratio (9:16) and centered on a dark background, similar to how
Instagram displays Stories on the web.

USAGE EXAMPLE:
<SlideGallery>
  <TitleSlide headline="My Story" intro="A photo essay." byline="Jane Doe" />
  <PhotoSlide photo={{ filename: 'hero.jpg', title: 'The Scene', caption: '...', credit: 'Jane Doe' }} />
  <TextSlide slide={{ headline: 'Context', body: 'Some background...' }} />
  <CreditsSlide><h2>Credits</h2><p>Thanks to...</p></CreditsSlide>
</SlideGallery>
-->
<script>
  import { onMount, onDestroy } from 'svelte';

  let { children } = $props();

  let currentSlide = $state(0);
  let totalSlides = $state(0);
  let galleryEl;

  onMount(() => {
    totalSlides = galleryEl.querySelectorAll('[data-slide]').length;
    window.addEventListener('keydown', handleKeydown);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', handleKeydown);
    }
  });

  function goNext() {
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
    }
  }

  function goPrev() {
    if (currentSlide > 0) {
      currentSlide--;
    }
  }

  function handleKeydown(event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      goNext();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      goPrev();
    }
  }
</script>

<div class="gallery-wrapper">
  <div class="gallery" bind:this={galleryEl}>
    <div class="slides-track" style="transform: translateX(-{currentSlide * 100}%)">
      {@render children()}
    </div>

    <button
      class="tap-zone tap-prev"
      onclick={goPrev}
      aria-label="Previous slide"
    >
      <span class="arrow-hint">‹</span>
    </button>
    <button
      class="tap-zone tap-next"
      onclick={goNext}
      aria-label="Next slide"
    >
      <span class="arrow-hint">›</span>
    </button>

    {#if totalSlides > 1}
      <div class="dots" role="tablist" aria-label="Slide navigation">
        {#each Array(totalSlides) as _, i}
          <span
            class="dot"
            class:active={i === currentSlide}
            role="tab"
            aria-selected={i === currentSlide}
            aria-label="Slide {i + 1}"
          ></span>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '../../styles' as *;

  .gallery-wrapper {
    height: 100dvh;
    background: black;

    @include tablet {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #111;
    }
  }

  .gallery {
    position: relative;
    height: 100%;
    overflow: hidden;

    @include tablet {
      max-width: 420px;
      width: 100%;
      aspect-ratio: 9 / 16;
      height: auto;
      max-height: 100dvh;
      border-radius: var(--border-radius-sm);
      box-shadow: 0 0 60px rgba(0, 0, 0, 0.5);
    }

    @include desktop {
      max-width: 480px;
    }
  }

  .slides-track {
    display: flex;
    height: 100%;
    transition: transform 0.3s ease;
  }

  .tap-zone {
    position: absolute;
    top: 0;
    bottom: 0;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 5;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    align-items: center;
  }

  .tap-prev {
    left: 0;
    width: 33.333%;
    justify-content: flex-start;
    padding-left: 0.5rem;
  }

  .tap-next {
    right: 0;
    width: 66.667%;
    justify-content: flex-end;
    padding-right: 0.5rem;
  }

  .arrow-hint {
    display: none;
    font-size: 2rem;
    color: white;
    opacity: 0;
    transition: opacity 0.2s ease;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
    pointer-events: none;
    user-select: none;

    @include tablet {
      display: block;
    }
  }

  .tap-zone:hover .arrow-hint {
    opacity: 0.7;
  }

  .dots {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    z-index: 5;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
    opacity: 0.4;
    transition: opacity 0.2s ease;
  }

  .dot.active {
    opacity: 1;
    background: var(--color-accent);
  }
</style>
