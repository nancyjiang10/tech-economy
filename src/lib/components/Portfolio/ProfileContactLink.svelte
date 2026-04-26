<!--
@component
ProfileContactLink.svelte — Reusable contact item for Profile.

Renders a single list item with a link, optional external behavior,
and an icon snippet.
-->
<script>
  let { href = '', label = '', external = false, icon = null } = $props();
</script>

<li class="contact-item">
  <a
    {href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener' : undefined}
  >
    {#if icon}
      {@const Icon = icon}
      <Icon />
    {/if}
    <span>{label}</span>
  </a>
</li>

<style lang="scss">
  .contact-item a {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    text-decoration: none;
    color: var(--color-text);
    font-size: var(--font-size-sm);
    border: var(--border-width-thin) solid var(--color-border);
    background: var(--color-white);
    padding: 0.35rem 0.55rem;
    transition: var(--transition-color);

    &:hover {
      color: var(--color-accent);
      border-color: var(--color-accent);
    }
  }

  .contact-item :global(svg) {
    width: 1.1rem;
    height: 1.1rem;
    flex-shrink: 0;
  }
</style>
