<!--
@component
This is your page!
-->
<script>
  // Import all the news furniture components
  import { asset } from '$app/paths';
  import ArticleHeader from '$lib/components/Article/ArticleHeader.svelte';
  import ArticleBody from '$lib/components/Article/ArticleBody.svelte';
  import LayoffsByYear from '$lib/components/Data/LayoffsByYear.svelte';
  import MethodologyBox from '$lib/components/Article/MethodologyBox.svelte';
  import RelatedLinks from '$lib/components/Article/RelatedLinks.svelte';

  // Article metadata
  let headline = 'The Tech Job Market Is Hard Now, Especially For Recent Grads';
  let byline = 'By: Nancy Jiang';
  let pubDate = '2026-05-18';
  const softwareImage = asset('/software.png');

  // Related stories
  const relatedStories = [
    {
      headline:
        "Mayor Adams Pushes ‘After-School for All’ Plan, but Providers Cite Budget Shortfalls",
      href: 'https://www.nycitynewsservice.com/2025/11/25/mayor-adams-pushes-after-school-for-all-plan-but-providers-cite-budget-shortfalls/',
    },
    {
      headline:
        'Vineyards Are Closing, But Not Everyone Is Losing',
      href: 'https://issuenumberone.journalism.cuny.edu/2026/04/06/vineyards-are-closing-but-not-everyone-is-losing/',
    },
    {
      headline: 'US Goods Deficit Increased, Trade Deficit Little Changed Despite Trump Tariffs',
      href: 'https://issuenumberone.journalism.cuny.edu/2026/02/23/us-goods-deficit-increased-trade-deficit-little-changed-despite-trump-tariffs/',
    },
  ];
</script>

<!-- This sets the page title in the browser tab -->
<svelte:head>
  <title>{headline} | NYCity News Service</title>
  <script src="https://public.flourish.studio/resources/embed.js"></script>
  <meta
    name="description"
    content="At the Craig Newmark Graduate School of Journalism at the City University of New York, change is in our DNA. That comes of being born in 2006, as the digital revolution was transforming our profession in ways none of us could have imagined."
  />
</svelte:head>

<!-- Your page content goes here -->
<div class="container">
  <!-- Article Header: Headline, byline, and publication date -->
  <ArticleHeader kicker="Economy" {headline} {byline} {pubDate} />

  <!-- Lead Image: Full-bleed hero crop -->
  <figure class="lead-image">
    <img
      src={softwareImage}
      alt="The Craig Newmark Graduate School of Journalism is at 219 West 40th Street in Midtown Manhattan."
    />
  </figure>

  <!-- Article Body: The main story text with proper typography -->
  <div class="container">
    <ArticleBody>
      <p class="dropcap">
        Evelyn Snider would never have stepped into tech if she didn’t think it was a sure bet.
      </p>

      <p>
        When she was deciding what to pursue in college, her dad and a cousin working in software
        development pushed her to go all in, declaring computer science her major at the University
        of Kansas and moving into expensive dorms well beyond what she could afford.
      </p>

      <p>
        “They’re like, ‘You like computer stuff, right? Don’t you?’ You’re going to go to college,
        you’re going to get a job in computer science, you’ll be making six figures, that was the
        dream. I was sold on that,” she said.
      </p>

      <p>
        So far, however, that dream isn’t playing out the way Snider envisioned, as artificial intelligence reshapes the industry and employers shed roles. By December, she
        will have racked up $115,000 in student loan debt, and instead of the lucrative job offers
        she was promised, she’ll be walking across the graduation stage with nothing lined up.
      </p>

      <p>
       Snider isn’t the only one. Unemployment among new college graduates jumped to 5.4% in April, up 1.1% from the previous year, according to Federal Reserve data. Computer science grads are <a href="https://www.newyorkfed.org/research/college-labor-market#--:explore:outcomes-by-major">faring among the worst</a> in recent years, with a 7.8% unemployment rate based on data from 2024, worse than art history at 6.7% and journalism at 2.3%, while the national unemployment rate currently sits at 4.3%.
      </p>

      <div class="chart-wrap">
        <img
          src="Unemployment chart.png"
          alt="A graph showing unemployment rates for recent college graduates in various fields, with recent grads overtaking the national rate."
        />
      </div>

      <p>
        It’s a sharp about-face from tech’s 2021 gold rush, which saw employers rapidly expanding
        their development teams. According to Indeed data, job postings in the software development
        sector more than doubled in 2021, with the number of available roles up by 233.9% from
        February 2020.
      </p>

      <p>
        Tech companies like Microsoft, Amazon, and Meta began rapidly laying off workers in 2022
        and have continued to jettison jobs since then, according to Layoffs.fyi, a tech layoff
        tracker.
      </p>

      <LayoffsByYear />
      <p>
        In the current “low-hire, low-fire” economy, unemployment and layoffs but also hiring are low overall. Employers are slow to invest in budding talent, and competition for entry-level tech positions is fierce, especially as job postings dwindle compared to what they used to be.
      </p>
      <iframe title="Job openings look very different across sectors" aria-label="Line chart" id="datawrapper-chart-WldqN" src="https://datawrapper.dwcdn.net/WldqN/2/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="517" data-external="1"></iframe><script type="text/javascript">(function(){function e(){window.addEventListener(`message`,function(e){if(e.data[`datawrapper-height`]!==void 0){var t=document.querySelectorAll(`iframe`);for(var n in e.data[`datawrapper-height`])for(var r=0,i;i=t[r];r++)if(i.contentWindow===e.source){var a=e.data[`datawrapper-height`][n]+`px`;i.style.height=a}}})}e()})();</script>
<iframe title="Indeed job postings also look different across sectors" aria-label="Line chart" id="datawrapper-chart-1qU6z" src="https://datawrapper.dwcdn.net/1qU6z/1/" scrolling="no" frameborder="0" style="width: 0; min-width: 100% !important; border: none;" height="469" data-external="1"></iframe><script type="text/javascript">(function(){function e(){window.addEventListener(`message`,function(e){if(e.data[`datawrapper-height`]!==void 0){var t=document.querySelectorAll(`iframe`);for(var n in e.data[`datawrapper-height`])for(var r=0,i;i=t[r];r++)if(i.contentWindow===e.source){var a=e.data[`datawrapper-height`][n]+`px`;i.style.height=a}}})}e()})();</script>


      <p>
        “There’s too much supply and not enough demand for tech labor,” said Gad Levanon, an economist at the Burning Glass Institute, a labor market research firm.
      </p>

      <p>
        
Levanon believes that low hiring in tech is partly the result of advancements in artificial intelligence, which have amped up software development productivity and replaced human workers across lower-skill tech sectors, including customer service and data analysis.

      </p>

      <p>
       Others argue that it is too soon to say that AI’s coding prowess is why hiring in tech has stagnated. Economists like Indeed Hiring Lab’s Felix Aidala Brody believe companies simply overhired and course-corrected with massive sloughs. 

      </p>

      <p>
       “During the pandemic, tech firms moved to hoard workers and hired a lot. What we’ve seen over the past few years has been the unwinding of that,” said Brody.

      </p>

<h2>How Tech Jobs Are Changing</h2>

      <p>
        Experts say there is little evidence that AI will cause mass elimination of software jobs as company executives shed employees; rather, artificial intelligence has increased job opportunities within the field.
      </p>
      <p>As AI ability expands, so too has the software development job market, which grew to 2.5 million jobs in February, a 19% increase since ChatGPT’s launch, according to a <a href="https://sites.bu.edu/tpri/files/2026/04/TPRI_Report_SW_developers.pdf">report</a> by Boston University economist and tech researcher James Bessen, which compared developments in AI to advancements during the Industrial Revolution. 
</p>

<p>

Rather than a decline, Bessen found that the number of software developers in the US has grown by over 400,000 since ChatGPT was introduced in 2022. Mass unemployment of software developers is unlikely, at least for now, as preliminary evidence finds that AI improves developer productivity and the demand for software continues to climb.

</p>

<p>
  AI-related jobs are also helping to hold up a low-hire economy. Indeed Hiring Lab data found AI jobs are steadily climbing, with 5.4% of all job listings across the platform in April containing keywords associated specifically with AI.

</p>

<p>
  “What’s been happening for decades now is the output per software developer has been going up, the productivity at a pretty good clip, but employment has also been going up because output has gone up even more,” Bessen said.

</p>

<p>

“Most people focus on automation as a threat to the number of jobs, and historically, that’s just not what happens. What happens is it changes the nature of jobs.”

</p>

<p>
  New <a href="https://futuretech.mit.edu/publication/crashing-waves-vs-rising-tides-preliminary-findings-on-ai-automation-from-thousands-of-worker-evaluations-of-labor-market-tasks">research</a> from MIT’s Computer Science and Artificial Intelligence Laboratory, a research lab, found that AI capabilities are improving in “rising tides,” rather than “crashing waves,” as LLMs continue to struggle with hallucinations and accuracy, meaning that AI capabilities are improving gradually, allowing time for integration and adaptation instead of dramatic surges in capabilities. </p> 
  
  <p> The study suggests that current market conditions for grads are a temporary bottleneck and predicts that at its current pace, LLMs may have an average success rate of 80% to 95% by 2029 at a “minimally sufficient” quality level. </p>



<p>
  “It means we get to spend more of our time on the really valuable things we do— that tends to actually raise wages, not lower them,” said Neil Thompson, a research scientist at MIT CSAIL.

</p>

<p>“Conversely, if the thing that gets automated is the most expert part of your job, that tends to bring your wages down.”
</p>

<p>Schools, including Georgia Tech and MIT, are adapting their curricula in order to stay relevant in an A.I. era, teaching students new skills to stay competitive in the market, including code review. 
</p>

<p>Ahmed Said Mohamed Tawfik Issa, an assistant professor at Georgia Tech, teaches classes on computer networks and data center systems, helping developers understand digital infrastructures and the components of design. His exams have changed in recent years from code-writing assessments to test students to understand the nuances and inaccuracies in seemingly factual code statements. 
</p>

<p>
  “In order to edit, you need to have been taught how to write well. To review legal documents, you need to understand all the laws,” said Issa. 

</p>

<p>His students have not struggled to find jobs and internships, though he noted a decline in the number of offers they’ve received compared to past years.
</p>

<p>Divya Ramaswamy, a Georgia Tech master’s student, received three internship offers after applying for around 100 positions her junior year from Amazon, defense company Lockheed Martin, and healthtech company WellStar. She took the highest payout from Amazon, which led to a full-time offer. She deferred the role to finish up her degree.
</p>

<p>Despite Amazon laying off as many as 30,000 employees last year, Ramaswamy is swallowing her worries and looking ahead.
</p>

<p>“I just have to trust my education, background, and whatnot have put me at the top of my field, and that I’ll be fine, because there’ll always be jobs for the top 10 percent,” she said.
</p>

<p>
Snider, the University of Kansas student, is still holding out hope, putting all her energy into networking and career fairs to get a job in tech.
</p>

<p>“In retrospect, I would have been happier if I had just gone out of college, worked a $20 an hour job at Walmart, and gotten an apartment with friends, but that’s not an option for me at this point,” she said.
</p>

<p>“With the amount of debt I’m in, I need to get into tech if I want to live any sort of semi-normal life.”

</p>

    </ArticleBody>
  </div>

  <!-- Methodology Box: Explanation of reporting process -->
  <MethodologyBox>
    <p>

      I used Python to analyze jobs data from Indeed and the Bureau of Labor Statistics starting in 2020. I used the JOLTS (Job Openings and Labor Turnover Survey) across retail, healthcare, and information, which includes tech. </p> 
      <p>To make the datasets comparable, each variable was converted into a zero-index measure using 2020 as the baseline. Percentage change from 2020 shows how the job market changed across sectors over time through March 2026. I did the same using jobs postings data from Indeed, which tracks the number of job listings across the platform, but which starts from February 2020 and ends on May 8, 2026. </p> 
      <p>This story was edited by The New York Times' chief economics correspondent, Ben Casselman.</p>
  </MethodologyBox>

  <!-- Related Stories: Links to other articles -->
  <RelatedLinks title="Related Stories" links={relatedStories} />
</div>

<style lang="scss">
  .lead-image {
    width: 100vw;
    height: 100vh;
    margin: var(--spacing-sm) calc(50% - 50vw);
    overflow: hidden;
    background: var(--color-light-gray);
  }

  .lead-image img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: center;
    filter: contrast(1.1) brightness(1.05);
  }

  .chart-wrap {
    margin: var(--spacing-xl) 0;
  }

  .chart-wrap img {
    width: 100%;
    display: block;
  }

  .flourish-wrap {
    margin: var(--spacing-lg) 0;
  }
</style>
