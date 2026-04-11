<!--
@component
SlideGallery.svelte — A horizontal, tap-navigated gallery container for
Instagram Stories-style multimedia presentations.

Displays one slide at a time with tap-to-advance navigation (tap right
two-thirds to go forward, left third to go back) and dot indicators at
the bottom showing the current position.

USAGE EXAMPLE:
<SlideGallery>
  <TitleSlide headline="My Story" intro="A photo essay." byline="Jane Doe" />
  <PhotoSlide photo={{ filename: 'hero.jpg', title: 'The Scene', caption: '...', credit: 'Jane Doe' }} />
  <TextSlide slide={{ headline: 'Context', body: 'Some background...' }} />
  <CreditsSlide><h2>Credits</h2><p>Thanks to...</p></CreditsSlide>
</SlideGallery>
-->
<script>
  import { onMount } from 'svelte';

  let { children } = $props();

  let currentSlide = $state(0);
  let totalSlides = $state(0);
  let galleryEl;

  onMount(() => {
    totalSlides = galleryEl.querySelectorAll('[data-slide]').length;
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
</script>

<div class="gallery" bind:this={galleryEl}>
  <div class="slides-track" style="transform: translateX(-{currentSlide * 100}%)">
    {@render children()}
  </div>

  <button
    class="tap-zone tap-prev"
    onclick={goPrev}
    aria-label="Previous slide"
  ></button>
  <button
    class="tap-zone tap-next"
    onclick={goNext}
    aria-label="Next slide"
  ></button>

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

<style>
  .gallery {
    position: relative;
    height: 100dvh;
    overflow: hidden;
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
  }

  .tap-prev {
    left: 0;
    width: 33.333%;
  }

  .tap-next {
    right: 0;
    width: 66.667%;
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
