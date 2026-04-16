<!--
@component
SiteFooter.svelte — Site Footer Component (NYCity News Service Style)

A professional news-organization-style footer with multi-column layout,
CUNY branding, navigation links, and copyright notice.

USAGE EXAMPLE:
<SiteFooter />
-->
<script>
  import { asset } from '$app/paths';

  const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="footer-main">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="footer-brand">
          <a
            href="https://www.journalism.cuny.edu/"
            class="footer-logo-link"
            aria-label="Visit Craig Newmark Graduate School of Journalism at CUNY website"
          >
            <img
              src={asset('/cuny-footer-logo.svg')}
              alt="Craig Newmark Graduate School of Journalism at CUNY"
              class="cuny-logo"
            />
          </a>
          <p class="footer-tagline">
            Covering New York City from the five boroughs and beyond.
          </p>
        </div>

        <!-- Navigation Column -->
        <div class="footer-col">
          <h3 class="footer-heading">ABOUT</h3>
          <nav aria-label="Footer navigation">
            <ul class="footer-list">
              <li>
                <a
                  href="https://www.nycitynewsservice.com/about/"
                  class="footer-link">ABOUT US</a
                >
              </li>
              <li>
                <a
                  href="https://www.nycitynewsservice.com/contact/"
                  class="footer-link">CONTACT US</a
                >
              </li>
              <li>
                <a
                  href="https://www.journalism.cuny.edu/"
                  class="footer-link">CUNY JOURNALISM</a
                >
              </li>
            </ul>
          </nav>
        </div>

        <!-- Topics Column -->
        <div class="footer-col">
          <h3 class="footer-heading">TOPICS</h3>
          <nav aria-label="Footer topics">
            <ul class="footer-list">
              <li>
                <a
                  href="https://www.nycitynewsservice.com/nycns_topics/politics/"
                  class="footer-link">POLITICS</a
                >
              </li>
              <li>
                <a
                  href="https://www.nycitynewsservice.com/nycns_topics/education/"
                  class="footer-link">EDUCATION</a
                >
              </li>
              <li>
                <a
                  href="https://www.nycitynewsservice.com/nycns_topics/health/"
                  class="footer-link">HEALTH</a
                >
              </li>
              <li>
                <a
                  href="https://www.nycitynewsservice.com/nycns_topics/housing/"
                  class="footer-link">HOUSING</a
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>

  <!-- Bottom bar with copyright -->
  <div class="footer-bottom">
    <div class="footer-container">
      <p class="footer-copyright">
        &copy; {currentYear} NYCity News Service &middot; Craig Newmark
        Graduate School of Journalism at CUNY
      </p>
    </div>
  </div>
</footer>

<style lang="scss">
  @use '../../styles' as *;

  .site-footer {
    margin-top: var(--spacing-xxl);
  }

  .footer-main {
    background-color: var(--color-dark);
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .footer-container {
    max-width: var(--max-width-wide);
    margin: 0 auto;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  /* Brand column */
  .footer-brand {
    text-align: center;
  }

  .footer-logo-link {
    display: inline-block;
    text-decoration: none;
  }

  .cuny-logo {
    max-width: var(--max-width-footer-logo);
    height: auto;
    margin: 0 auto;
    filter: brightness(0) invert(1);
    transition: var(--transition-opacity);
  }

  .footer-logo-link:hover .cuny-logo {
    opacity: var(--opacity-hover);
  }

  /* Ensure logo visibility in Windows High Contrast Mode */
  @media (forced-colors: active) {
    .cuny-logo {
      filter: none;
    }
  }

  .footer-tagline {
    color: var(--color-border);
    font-family: var(--font-serif);
    font-size: var(--font-size-sm);
    line-height: var(--leading-normal);
    margin-top: var(--spacing-sm);
    margin-bottom: 0;
  }

  /* Column headings */
  .footer-heading {
    color: var(--color-white);
    font-family: var(--font-sans);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-wider);
    text-transform: uppercase;
    margin-bottom: var(--spacing-sm);
    padding-bottom: var(--spacing-xs);
    border-bottom: var(--border-width-thin) solid var(--color-medium-gray);
  }

  /* Link lists */
  .footer-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .footer-list li {
    margin-bottom: var(--spacing-xs);
  }

  .footer-link {
    color: var(--color-border);
    text-decoration: none;
    font-family: var(--font-sans);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-normal);
    letter-spacing: var(--letter-spacing-wider);
    transition: var(--transition-color);
  }

  .footer-link:hover {
    color: var(--color-white);
  }

  /* Bottom copyright bar */
  .footer-bottom {
    background-color: var(--color-cuny-blue-dark);
    padding: var(--spacing-sm) var(--spacing-md);
    text-align: center;
  }

  .footer-copyright {
    color: var(--color-border);
    font-family: var(--font-sans);
    font-size: var(--font-size-xs);
    letter-spacing: var(--letter-spacing-wide);
    margin: 0;
  }

  /* Tablet and up: multi-column layout */
  @include tablet {
    .footer-grid {
      grid-template-columns: 2fr 1fr 1fr;
      gap: var(--spacing-xl);
    }

    .footer-brand {
      text-align: left;
    }

    .cuny-logo {
      margin: 0;
    }
  }
</style>
