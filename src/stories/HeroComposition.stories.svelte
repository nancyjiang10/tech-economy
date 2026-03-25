<!--
  HeroComposition.stories.svelte

  Composition stories that combine the HeroHeader with a large Lottie graphic,
  search input, and dropdown — in the style of how ProPublica tops their
  database search applications.

  Layout: full-width hero with headline/byline/search on the left column
  and a large animated Lottie graphic on the right column.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SearchInput   from '$lib/components/SearchInput.svelte';
  import DropdownInput from '$lib/components/DropdownInput.svelte';
  import LottieGraphic from '$lib/components/LottieGraphic.svelte';
  import MethodologyBox from '$lib/components/MethodologyBox.svelte';
  import SiteHeader    from '$lib/components/SiteHeader.svelte';
  import SiteFooter    from '$lib/components/SiteFooter.svelte';

  // Inline Lottie animation: animated data-visualization motif
  // (pulsing chart bars and a rotating ring — a nod to "data at work")
  const DATA_ANIMATION = {
    v: '5.7.1',
    fr: 30,
    ip: 0,
    op: 90,
    w: 500,
    h: 500,
    assets: [],
    layers: [
      // Spinning outer ring
      {
        ty: 4, nm: 'Ring', sr: 1,
        ks: {
          o: { a: 0, k: 60 },
          r: { a: 1, k: [
            { t: 0, s: [0], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
            { t: 90, s: [360] },
          ]},
          p: { a: 0, k: [250, 250, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        shapes: [
          { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [350, 350] } },
          { ty: 'st', c: { a: 0, k: [0, 0.2, 0.63, 1] }, o: { a: 0, k: 40 }, w: { a: 0, k: 3 }, d: [{ n: 'd', v: { a: 0, k: 12 } }, { n: 'g', v: { a: 0, k: 8 } }] },
        ],
        ip: 0, op: 90,
      },
      // Bar 1
      {
        ty: 4, nm: 'Bar1', sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [140, 320, 0] },
          a: { a: 0, k: [0, 50, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        shapes: [
          { ty: 'rc', p: { a: 0, k: [0, 0] }, s: { a: 1, k: [
            { t: 0, s: [50, 100], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 30, s: [50, 200], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 60, s: [50, 140], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 90, s: [50, 100] },
          ]}, r: { a: 0, k: 6 } },
          { ty: 'fl', c: { a: 0, k: [0, 0.2, 0.63, 1] }, o: { a: 0, k: 100 } },
        ],
        ip: 0, op: 90,
      },
      // Bar 2
      {
        ty: 4, nm: 'Bar2', sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [210, 320, 0] },
          a: { a: 0, k: [0, 50, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        shapes: [
          { ty: 'rc', p: { a: 0, k: [0, 0] }, s: { a: 1, k: [
            { t: 0, s: [50, 160], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 30, s: [50, 80], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 60, s: [50, 220], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 90, s: [50, 160] },
          ]}, r: { a: 0, k: 6 } },
          { ty: 'fl', c: { a: 0, k: [0, 0.4, 0.8, 1] }, o: { a: 0, k: 100 } },
        ],
        ip: 0, op: 90,
      },
      // Bar 3
      {
        ty: 4, nm: 'Bar3', sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [280, 320, 0] },
          a: { a: 0, k: [0, 50, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        shapes: [
          { ty: 'rc', p: { a: 0, k: [0, 0] }, s: { a: 1, k: [
            { t: 0, s: [50, 120], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 30, s: [50, 260], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 60, s: [50, 100], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 90, s: [50, 120] },
          ]}, r: { a: 0, k: 6 } },
          { ty: 'fl', c: { a: 0, k: [0, 0.13, 0.4, 1] }, o: { a: 0, k: 100 } },
        ],
        ip: 0, op: 90,
      },
      // Bar 4
      {
        ty: 4, nm: 'Bar4', sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: { a: 0, k: 0 },
          p: { a: 0, k: [350, 320, 0] },
          a: { a: 0, k: [0, 50, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        shapes: [
          { ty: 'rc', p: { a: 0, k: [0, 0] }, s: { a: 1, k: [
            { t: 0, s: [50, 180], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 30, s: [50, 120], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 60, s: [50, 180], i: { x: [0.4, 0.4], y: [1, 1] }, o: { x: [0.6, 0.6], y: [0, 0] } },
            { t: 90, s: [50, 180] },
          ]}, r: { a: 0, k: 6 } },
          { ty: 'fl', c: { a: 0, k: [0, 0.27, 0.72, 1] }, o: { a: 0, k: 100 } },
        ],
        ip: 0, op: 90,
      },
      // Pulsing center circle
      {
        ty: 4, nm: 'Pulse', sr: 1,
        ks: {
          o: { a: 1, k: [
            { t: 0, s: [40], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
            { t: 45, s: [80], i: { x: [0.4], y: [1] }, o: { x: [0.6], y: [0] } },
            { t: 90, s: [40] },
          ]},
          r: { a: 0, k: 0 },
          p: { a: 0, k: [250, 200, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 1, k: [
            { t: 0, s: [80, 80, 100], i: { x: [0.4, 0.4, 0.4], y: [1, 1, 1] }, o: { x: [0.6, 0.6, 0.6], y: [0, 0, 0] } },
            { t: 45, s: [110, 110, 100], i: { x: [0.4, 0.4, 0.4], y: [1, 1, 1] }, o: { x: [0.6, 0.6, 0.6], y: [0, 0, 0] } },
            { t: 90, s: [80, 80, 100] },
          ]},
        },
        shapes: [
          { ty: 'el', p: { a: 0, k: [0, 0] }, s: { a: 0, k: [80, 80] } },
          { ty: 'fl', c: { a: 0, k: [0, 0.2, 0.63, 1] }, o: { a: 0, k: 100 } },
        ],
        ip: 0, op: 90,
      },
    ],
  };

  const { Story } = defineMeta({
    title: 'Compositions/Hero with Database Search',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
    },
  });
</script>

<!--
  Default: ProPublica-style hero with headline + byline on the left
  and a large animated Lottie data graphic on the right.
-->
<Story name="Default">
  <SiteHeader
    navLinks={[
      { href: '/data',   label: 'Data' },
      { href: '/about',  label: 'About' },
      { href: '/guides', label: 'Guides' },
    ]}
  />

  <section class="hero" style:background-color="var(--color-light-gray)">
    <div class="hero-grid">
      <!-- Left column: headline, byline, description, search controls -->
      <div class="hero-text">
        <h1 class="hero-headline">NYC Public Records Database</h1>
        <p class="hero-byline">
          By <strong>The NYCity News Service Data Team</strong>
        </p>
        <p class="hero-date">Updated March 2026</p>
        <p class="hero-description">
          Search millions of public records spanning all five boroughs. Our
          reporters have compiled, cleaned, and verified data from dozens of
          city agencies so you can look up the information that matters to you.
        </p>

        <div class="hero-controls">
          <SearchInput
            label="Search Records"
            placeholder="Search by name, address, or keyword…"
          />
          <DropdownInput
            label="Borough"
            placeholder="All boroughs…"
            options={[
              { value: 'manhattan',     label: 'Manhattan' },
              { value: 'brooklyn',      label: 'Brooklyn' },
              { value: 'queens',        label: 'Queens' },
              { value: 'bronx',         label: 'The Bronx' },
              { value: 'staten-island', label: 'Staten Island' },
            ]}
          />
        </div>
      </div>

      <!-- Right column: large Lottie data visualization graphic -->
      <div class="hero-graphic">
        <LottieGraphic
          animationData={DATA_ANIMATION}
          ariaLabel="Animated data visualization with bar chart and pulsing elements"
        />
      </div>
    </div>
  </section>

  <div class="methodology-container">
    <MethodologyBox title="About This Database">
      <p>
        This database was compiled by the NYCity News Service Data Team from public records
        obtained through Freedom of Information Law requests to more than 30 city agencies.
        Records were cleaned, deduplicated, and standardized using Python. The database is
        updated weekly as new records become available.
      </p>
      <p>
        Have a tip or found an error? Contact us at
        <a href="mailto:data@nycitynewsservice.com">data@nycitynewsservice.com</a>.
      </p>
    </MethodologyBox>
  </div>

  <SiteFooter />
</Story>

<style lang="scss">
  @use '$lib/styles' as *;

  /* ---- Hero section ---- */
  .hero {
    width: 100%;
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .hero-grid {
    max-width: var(--max-width-wide);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }

  /* ---- Left column: text + controls ---- */
  .hero-text {
    flex: 1;
  }

  .hero-headline {
    font-family: var(--font-serif);
    font-size: var(--font-size-5xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--leading-tight);
    color: var(--color-dark);
    margin-bottom: var(--spacing-xs);
  }

  .hero-byline {
    font-family: var(--font-sans);
    font-size: var(--font-size-base);
    color: var(--color-medium-gray);
    margin-bottom: var(--spacing-xxs);
  }

  .hero-date {
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    color: var(--color-medium-gray);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    margin-bottom: var(--spacing-sm);
  }

  .hero-description {
    font-family: var(--font-sans);
    font-size: var(--font-size-lg);
    line-height: var(--leading-relaxed);
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
  }

  .hero-controls {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  /* ---- Methodology box container ---- */
  .methodology-container {
    max-width: var(--max-width-wide);
    margin: 0 auto;
    padding: 0 var(--spacing-md);
  }

  /* ---- Right column: Lottie graphic ---- */
  .hero-graphic {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
  }

  /* ---- Responsive: side-by-side on tablet+ ---- */
  @include tablet {
    .hero {
      padding: var(--spacing-xxl) var(--spacing-md);
    }

    .hero-grid {
      flex-direction: row;
      align-items: center;
    }

    .hero-headline {
      font-size: var(--font-size-6xl);
    }

    .hero-graphic {
      max-width: none;
    }

    .hero-controls {
      flex-direction: row;
    }
  }

  @include desktop {
    .hero-headline {
      font-size: var(--font-size-display);
    }

    .hero-description {
      font-size: var(--font-size-xl);
    }
  }
</style>
