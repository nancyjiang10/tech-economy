<!--
@component
PhotoSlide.svelte — A full-bleed photo slide with a gradient caption overlay.

Renders an image that fills the viewport with object-fit: cover. A gradient
overlay at the bottom displays the title, caption, and photo credit.

USAGE EXAMPLE:
<PhotoSlide photo={{
  filename: 'subway-platform.jpg',
  title: 'Waiting for the L',
  caption: 'Commuters line the platform at Bedford Avenue during morning rush.',
  credit: 'Photo by Jane Doe'
}} />
-->
<script>
  let {
    photo, // Object with filename, title, caption, and credit
  } = $props();
</script>

<div class="slide" data-slide data-photo>
  <img
    src="/photos/{photo.filename}"
    alt={photo.title}
  />
  <div class="caption">
    <h2>{photo.title}</h2>
    <p>{photo.caption}</p>
    <span class="credit">{photo.credit}</span>
  </div>
</div>

<style>
  .slide {
    height: 100%;
    flex: 0 0 100%;
    position: relative;
    background: black;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem 1.5rem 3.5rem;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.85) 0%,
      rgba(0, 0, 0, 0.4) 70%,
      transparent 100%
    );
    color: white;
  }

  .caption h2 {
    margin: 0 0 0.5rem;
    font-size: 1.25rem;
    line-height: 1.3;
    color: white;
  }

  .caption p {
    margin: 0 0 0.5rem;
    font-size: 0.9375rem;
    line-height: 1.5;
    opacity: 0.9;
  }

  .caption .credit {
    font-size: 0.75rem;
    opacity: 0.6;
  }
</style>
