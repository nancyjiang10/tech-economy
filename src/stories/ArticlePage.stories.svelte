<!--
  ArticlePage.stories.svelte

  Full-page composition stories that combine multiple components to demonstrate
  how an article page looks when fully assembled. These stories are great for
  checking overall layout, typography hierarchy, and component interactions.

  This file does NOT map to a single component — it showcases how the
  building blocks fit together in a realistic editorial context.
-->
<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import SiteHeader   from '$lib/components/SiteHeader.svelte';
  import ArticleHeader from '$lib/components/ArticleHeader.svelte';
  import ArticleBody  from '$lib/components/ArticleBody.svelte';
  import Image        from '$lib/components/Image.svelte';
  import Dashboard    from '$lib/components/Dashboard.svelte';
  import BigNumber    from '$lib/components/BigNumber.svelte';
  import RelatedLinks   from '$lib/components/RelatedLinks.svelte';
  import MethodologyBox from '$lib/components/MethodologyBox.svelte';
  import SiteFooter     from '$lib/components/SiteFooter.svelte';

  // Freely-licensed Statue of Liberty image from Wikimedia Commons
  const LEAD_IMAGE =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/1200px-Statue_of_Liberty_7.jpg';

  const { Story } = defineMeta({
    title: 'Compositions/Article Page',
    tags: ['autodocs'],
    parameters: {
      // Use fullscreen so the header and footer span the full canvas width
      layout: 'fullscreen',
    },
  });
</script>

<!--
  Default: a complete article page with all components assembled.
  Resize the canvas (or use the Viewport toolbar) to see how the
  layout responds across mobile, tablet, and desktop breakpoints.
-->
<Story name="Default">
  <SiteHeader
    navLinks={[
      { href: '/the-poem',       label: 'The Poem' },
      { href: '/the-statue',     label: 'The Statue' },
      { href: '/emma-lazarus',   label: 'Emma Lazarus' },
      { href: '/immigration',    label: 'Immigration' },
    ]}
  />

  <div class="container">
    <ArticleHeader
      headline="How Emma Lazarus Gave Voice to the Statue of Liberty"
      byline="Sarah Chen and Michael Rivera"
      pubDate="1883-11-02"
    />

    <Image
      src={LEAD_IMAGE}
      alt="The Statue of Liberty on Liberty Island in New York Harbor"
      caption="The Statue of Liberty, a gift from France dedicated in 1886, stands as a symbol of freedom and welcome in New York Harbor."
      credit="Wikimedia Commons / Public Domain"
    />

    <ArticleBody>
      <p>
        In 1883, a young poet named Emma Lazarus wrote a sonnet to help raise funds for the
        construction of the pedestal that would hold the Statue of Liberty. That poem, "The New
        Colossus," would go on to become one of the most recognized works in American literature —
        and the defining statement of the nation's identity as a haven for immigrants.
      </p>
      <p>
        Lazarus, born in 1849 to a wealthy Sephardic Jewish family in New York City, was already an
        accomplished writer by the time she was asked to contribute to the fundraising effort. But it
        was her encounters with Jewish refugees fleeing pogroms in Eastern Europe that gave the poem
        its emotional urgency.
      </p>
      <blockquote>
        <p>
          "Give me your tired, your poor, / Your huddled masses yearning to breathe free, / The
          wretched refuse of your teeming shore."
        </p>
      </blockquote>
      <p>
        Lazarus died in 1887, just a year after the statue's dedication, and her sonnet was largely
        forgotten. In 1903, a friend named Georgina Schuyler successfully campaigned to have the
        poem mounted on a bronze plaque inside the pedestal, ensuring its words would endure.
      </p>

      <h2>By the Numbers</h2>
    </ArticleBody>

    <Dashboard>
      <BigNumber number="305 ft"  label="Height to Torch Tip" />
      <BigNumber number="354"     label="Steps to the Crown"  footnote="From pedestal base to crown" />
      <BigNumber number="4M"      label="Annual Visitors" />
      <BigNumber number="1886"    label="Year Dedicated"      footnote="October 28, 1886" />
    </Dashboard>

    <ArticleBody>
      <p>
        The statue was designated a UNESCO World Heritage Site in 1984 and continues to serve as a
        global symbol of freedom and democracy. The copper exterior — just 3/32 of an inch thick —
        was assembled on an iron skeleton engineered by Alexandre Gustave Eiffel.
      </p>
    </ArticleBody>

    <MethodologyBox>
      <p>
        Historical records referenced in this article were obtained from the National Park
        Service archives and the Statue of Liberty–Ellis Island Foundation. Date and visitor
        data were verified against annual reports published by the U.S. Department of the Interior.
      </p>
      <p>
        If you find an error, please contact us at
        <a href="mailto:data@nycitynewsservice.com">data@nycitynewsservice.com</a>.
      </p>
    </MethodologyBox>

    <RelatedLinks
      title="RELATED STORIES"
      links={[
        { headline: 'The Forgotten Poet: How Emma Lazarus Shaped America\'s Immigration Identity', href: '/emma-lazarus-biography' },
        { headline: 'Inside the Statue of Liberty\'s 354-Step Climb to the Crown', href: '/statue-crown-tour' },
        { headline: 'From France to New York Harbor: The Epic Journey of Lady Liberty', href: '/statue-history' },
      ]}
    />
  </div>

  <SiteFooter />
</Story>

<!-- Text-Only: headline, body, and related links — no images or data -->
<Story name="Text Only">
  <SiteHeader navLinks={[]} />

  <div class="container">
    <ArticleHeader
      headline='"The New Colossus" Turns 140: The Poem That Defined a Nation'
      byline="The NYCity News Service History Desk"
      pubDate="2023-11-02"
    />

    <ArticleBody>
      <p>
        One hundred and forty years ago, Emma Lazarus penned a sonnet that would eventually be
        inscribed at the base of the Statue of Liberty. The poem's most famous lines — "Give me
        your tired, your poor, your huddled masses yearning to breathe free" — have since become
        among the most quoted words in American history.
      </p>
      <h2>A Poem Ahead of Its Time</h2>
      <p>
        Written at a time of rising anti-immigrant sentiment, "The New Colossus" offered a
        radically different vision of what America could be: not a monument to military conquest,
        but a beacon of welcome for the world's displaced.
      </p>
      <h3>Rediscovery</h3>
      <p>
        After Lazarus died in 1887, her poem slipped into obscurity. It was not until 1903, when
        Georgina Schuyler campaigned to have a bronze plaque engraved with the full text installed
        inside the pedestal, that the sonnet found its permanent home.
      </p>
    </ArticleBody>

    <RelatedLinks
      title="RELATED STORIES"
      links={[
        { headline: 'Full Text: "The New Colossus" by Emma Lazarus (1883)', href: '/new-colossus-text' },
        { headline: 'Ellis Island and the Immigrant Experience in New York', href: '/ellis-island' },
      ]}
    />
  </div>

  <SiteFooter />
</Story>

<!-- Data-Driven: lede image followed immediately by a stat dashboard -->
<Story name="Data Driven">
  <SiteHeader
    navLinks={[
      { href: '/data', label: 'Data' },
      { href: '/maps', label: 'Maps' },
    ]}
  />

  <div class="container">
    <ArticleHeader
      headline="Statue of Liberty by the Numbers: Everything You Need to Know"
      byline="The NYCity Data Desk"
      pubDate="2024-07-04"
    />

    <Dashboard>
      <BigNumber number="305 ft"  label="Total Height"         footnote="Ground to torch tip" />
      <BigNumber number="151 ft"  label="Statue Height"        footnote="Heel to top of head" />
      <BigNumber number="354"     label="Steps"                footnote="Base to crown" />
      <BigNumber number="25"      label="Crown Windows" />
      <BigNumber number="7"       label="Crown Rays"           footnote="One per continent/ocean" />
      <BigNumber number="1984"    label="UNESCO Status"        footnote="World Heritage Site" />
    </Dashboard>

    <ArticleBody>
      <p>
        The Statue of Liberty is one of the most meticulously documented landmarks in the world.
        From the precise thickness of her copper skin to the exact number of steps in her spiral
        staircase, every element has been measured and catalogued.
      </p>
    </ArticleBody>

    <MethodologyBox title="About the Data">
      <p>
        All measurements were sourced from the National Park Service's official Statue of Liberty
        fact sheet, last updated in 2023. Visitor counts reflect annual averages reported by the
        Statue of Liberty–Ellis Island Foundation.
      </p>
    </MethodologyBox>
  </div>

  <SiteFooter />
</Story>

<style>
  /* Mirror the .container class from app.scss so the page preview looks right */
  .container {
    width: 100%;
    max-width: var(--max-width);
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-md);
  }
</style>
