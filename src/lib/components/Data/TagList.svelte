<!--
@component
TagList.svelte — A labeled group of Tag pills.

USAGE EXAMPLE:
<TagList
  label="Skills"
  tags={[
    { text: "Investigative reporting" },
    { text: "Court records analysis" },
    { text: "marxists.org", href: "https://marxists.org" },
  ]}
/>
-->
<script>
  import Tag from './Tag.svelte';

  let { label = '', tags = [] } = $props();
</script>

<div class="tag-list">
  {#if label}
    <h3 class="tag-list-label">{label}</h3>
  {/if}
  <div class="tag-list-items">
    {#each tags as tag (tag.text)}
      <Tag text={tag.text} href={tag.href ?? ''} />
    {/each}
  </div>
</div>

<style lang="scss">
  .tag-list {
    margin: var(--spacing-sm) 0;
  }

  .tag-list-label {
    margin: 0 0 var(--spacing-xs) 0;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .tag-list-items {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }
</style>
