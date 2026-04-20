<!--
@component
Legend.svelte — Quantitative legend for maps and data displays

Renders one of three quantitative legend types:
- threshold: discrete bins with color swatches
- continuous: a continuous gradient with ticks
- diverging: threshold bins with a highlighted midpoint

The component is presentational and can be placed anywhere in page layout.

USAGE EXAMPLE:
<Legend
  title="Median Rent Change"
  mode="diverging"
  items={[
    { to: -10, color: '#b2182b' },
    { from: -10, to: 0, color: '#ef8a62' },
    { from: 0, to: 10, color: '#67a9cf' },
    { from: 10, color: '#2166ac' },
  ]}
  midpoint={0}
/>
-->
<script>
  const VALID_MODES = new Set(['threshold', 'continuous', 'diverging']);

  const numberFormatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  });

  function isFiniteNumber(value) {
    return typeof value === 'number' && Number.isFinite(value);
  }

  function formatValue(value, formatter) {
    if (typeof formatter === 'function') {
      return formatter(value);
    }

    return numberFormatter.format(value);
  }

  function sortThresholdItems(items) {
    return [...items].sort((left, right) => {
      const leftStart = left.from ?? Number.NEGATIVE_INFINITY;
      const rightStart = right.from ?? Number.NEGATIVE_INFINITY;
      return leftStart - rightStart;
    });
  }

  function normalizeThresholdItems(items, formatter) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(
        'Legend requires a non-empty "items" array for threshold and diverging modes.'
      );
    }

    const sortedItems = sortThresholdItems(items);
    let previousUpperBound = Number.NEGATIVE_INFINITY;

    return sortedItems.map((item, index) => {
      if (!item || typeof item !== 'object') {
        throw new Error(
          'Legend items must be objects with color and numeric bounds.'
        );
      }

      const { color, from = null, to = null, label = '' } = item;
      if (typeof color !== 'string' || color.trim() === '') {
        throw new Error(
          'Legend items require a non-empty string "color" value.'
        );
      }

      if (from === null && to === null) {
        throw new Error('Legend items must define at least one numeric bound.');
      }

      if (from !== null && !isFiniteNumber(from)) {
        throw new Error(
          'Legend item "from" values must be finite numbers when provided.'
        );
      }

      if (to !== null && !isFiniteNumber(to)) {
        throw new Error(
          'Legend item "to" values must be finite numbers when provided.'
        );
      }

      if (from !== null && to !== null && from >= to) {
        throw new Error(
          'Legend items must have "from" values lower than "to" values.'
        );
      }

      const lowerBound = from ?? Number.NEGATIVE_INFINITY;
      const upperBound = to ?? Number.POSITIVE_INFINITY;

      if (index > 0 && lowerBound < previousUpperBound) {
        throw new Error(
          'Legend items must be ordered without overlapping ranges.'
        );
      }

      previousUpperBound = upperBound;

      let generatedLabel = label;
      if (!generatedLabel) {
        if (from === null) {
          generatedLabel = `Under ${formatValue(to, formatter)}`;
        } else if (to === null) {
          generatedLabel = `${formatValue(from, formatter)}+`;
        } else {
          generatedLabel = `${formatValue(from, formatter)}–${formatValue(to, formatter)}`;
        }
      }

      return {
        color,
        from,
        to,
        label: generatedLabel,
        lowerBound,
        upperBound,
      };
    });
  }

  function normalizeStops(stops, formatter) {
    if (!Array.isArray(stops) || stops.length < 2) {
      throw new Error(
        'Legend requires at least two stops for continuous mode.'
      );
    }

    const normalizedStops = [...stops].map((stop) => {
      if (!stop || typeof stop !== 'object') {
        throw new Error(
          'Legend stops must be objects with value and color properties.'
        );
      }

      const { value, color, label = '' } = stop;
      if (!isFiniteNumber(value)) {
        throw new Error('Legend stop values must be finite numbers.');
      }

      if (typeof color !== 'string' || color.trim() === '') {
        throw new Error(
          'Legend stops require a non-empty string "color" value.'
        );
      }

      return {
        value,
        color,
        label: label || formatValue(value, formatter),
      };
    });

    for (let index = 1; index < normalizedStops.length; index += 1) {
      if (normalizedStops[index].value <= normalizedStops[index - 1].value) {
        throw new Error('Legend stops must be ordered by ascending value.');
      }
    }

    return normalizedStops;
  }

  function normalizeTicks(ticks, min, max, formatter) {
    if (!Array.isArray(ticks) || ticks.length === 0) {
      return [
        { value: min, label: formatValue(min, formatter), position: 0 },
        { value: max, label: formatValue(max, formatter), position: 100 },
      ];
    }

    const normalizedTicks = [...ticks].map((tick) => {
      if (!tick || typeof tick !== 'object') {
        throw new Error('Legend ticks must be objects with numeric values.');
      }

      const { value, label = '' } = tick;
      if (!isFiniteNumber(value)) {
        throw new Error('Legend tick values must be finite numbers.');
      }

      if (value < min || value > max) {
        throw new Error(
          'Legend tick values must fall within the continuous legend domain.'
        );
      }

      return {
        value,
        label: label || formatValue(value, formatter),
        position: ((value - min) / (max - min)) * 100,
      };
    });

    const sortedTicks = [...normalizedTicks].sort(
      (left, right) => left.value - right.value
    );
    for (let index = 1; index < sortedTicks.length; index += 1) {
      if (sortedTicks[index].value <= sortedTicks[index - 1].value) {
        throw new Error('Legend ticks must be ordered by ascending value.');
      }
    }

    return sortedTicks;
  }

  function buildGradient(stops, min, max) {
    const segments = stops.map((stop) => {
      const position = ((stop.value - min) / (max - min)) * 100;
      return `${stop.color} ${position}%`;
    });

    return `linear-gradient(90deg, ${segments.join(', ')})`;
  }

  function getDomainFromItems(items) {
    const finiteBounds = items
      .flatMap((item) => [item.from, item.to])
      .filter((value) => isFiniteNumber(value));

    return {
      min: Math.min(...finiteBounds),
      max: Math.max(...finiteBounds),
    };
  }

  function buildDivergingSegments(items, min, max) {
    const finiteSpan = max - min;

    return items.map((item) => {
      const lower = item.from ?? min;
      const upper = item.to ?? max;
      const span = upper - lower;
      const width =
        finiteSpan > 0 ? (span / finiteSpan) * 100 : 100 / items.length;

      return {
        ...item,
        width,
      };
    });
  }

  let {
    title = '',
    mode = 'threshold',
    items = [],
    stops = [],
    ticks = [],
    midpoint = null,
    midpointLabel = '',
    formatter = null,
  } = $props();

  const validatedMode = $derived.by(() => {
    if (!VALID_MODES.has(mode)) {
      throw new Error(
        'Legend mode must be one of "threshold", "continuous", or "diverging".'
      );
    }

    return mode;
  });

  const headingId = $derived(
    title
      ? `legend-${title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')}`
      : null
  );

  const normalizedItems = $derived(
    validatedMode === 'threshold' || validatedMode === 'diverging'
      ? normalizeThresholdItems(items, formatter)
      : []
  );

  const continuousStops = $derived(
    validatedMode === 'continuous' ? normalizeStops(stops, formatter) : []
  );

  const continuousDomain = $derived(
    validatedMode === 'continuous'
      ? {
          min: continuousStops[0].value,
          max: continuousStops[continuousStops.length - 1].value,
        }
      : null
  );

  const continuousTicks = $derived(
    validatedMode === 'continuous'
      ? normalizeTicks(
          ticks,
          continuousDomain.min,
          continuousDomain.max,
          formatter
        )
      : []
  );

  const continuousGradient = $derived(
    validatedMode === 'continuous'
      ? buildGradient(
          continuousStops,
          continuousDomain.min,
          continuousDomain.max
        )
      : ''
  );

  const divergingDomain = $derived(
    validatedMode === 'diverging' ? getDomainFromItems(normalizedItems) : null
  );

  const validatedMidpoint = $derived.by(() => {
    if (validatedMode !== 'diverging') {
      return null;
    }

    if (
      !isFiniteNumber(midpoint) ||
      midpoint < divergingDomain.min ||
      midpoint > divergingDomain.max
    ) {
      throw new Error(
        'Legend diverging mode requires a midpoint within the legend domain.'
      );
    }

    return midpoint;
  });

  const divergingMidpointLabel = $derived(
    validatedMode === 'diverging'
      ? midpointLabel || formatValue(validatedMidpoint, formatter)
      : ''
  );

  const divergingMidpointPosition = $derived(
    validatedMode === 'diverging'
      ? ((validatedMidpoint - divergingDomain.min) /
          (divergingDomain.max - divergingDomain.min || 1)) *
          100
      : 0
  );

  const divergingSegments = $derived(
    validatedMode === 'diverging'
      ? buildDivergingSegments(
          normalizedItems,
          divergingDomain.min,
          divergingDomain.max
        )
      : []
  );
</script>

<section
  class="legend"
  class:is-threshold={validatedMode === 'threshold'}
  class:is-continuous={validatedMode === 'continuous'}
  class:is-diverging={validatedMode === 'diverging'}
  aria-labelledby={headingId}
>
  {#if title}
    <h3 class="legend-title" id={headingId}>{title}</h3>
  {/if}

  {#if validatedMode === 'threshold'}
    <ul class="legend-list" aria-label={title || 'Threshold legend'}>
      {#each normalizedItems as item (`${item.color}-${item.label}`)}
        <li class="legend-item">
          <span
            class="legend-swatch"
            style:background-color={item.color}
            aria-hidden="true"
          ></span>
          <span class="legend-label">{item.label}</span>
        </li>
      {/each}
    </ul>
  {/if}

  {#if validatedMode === 'continuous'}
    <div class="continuous-legend" aria-label={title || 'Continuous legend'}>
      <div
        class="continuous-bar"
        style:background-image={continuousGradient}
        aria-hidden="true"
      ></div>
      <div class="legend-axis" aria-hidden="true">
        {#each continuousTicks as tick (tick.value)}
          <span class="legend-tick" style:left={`${tick.position}%`}></span>
        {/each}
      </div>
      <div class="legend-tick-labels">
        {#each continuousTicks as tick (tick.value)}
          <span class="legend-tick-label" style:left={`${tick.position}%`}
            >{tick.label}</span
          >
        {/each}
      </div>
    </div>
  {/if}

  {#if validatedMode === 'diverging'}
    <div class="diverging-legend" aria-label={title || 'Diverging legend'}>
      <div class="diverging-bar" aria-hidden="true">
        {#each divergingSegments as segment (`${segment.color}-${segment.label}`)}
          <span
            class="diverging-segment"
            style:width={`${segment.width}%`}
            style:background-color={segment.color}
          ></span>
        {/each}
        <span
          class="diverging-midpoint"
          style:left={`${divergingMidpointPosition}%`}
        ></span>
      </div>
      <div class="diverging-axis-labels">
        <span class="axis-label axis-label-start"
          >{formatValue(divergingDomain.min, formatter)}</span
        >
        <span class="axis-label axis-label-midpoint"
          >{divergingMidpointLabel}</span
        >
        <span class="axis-label axis-label-end"
          >{formatValue(divergingDomain.max, formatter)}</span
        >
      </div>
      <ul class="legend-list">
        {#each normalizedItems as item (`${item.color}-${item.label}`)}
          <li class="legend-item">
            <span
              class="legend-swatch"
              style:background-color={item.color}
              aria-hidden="true"
            ></span>
            <span class="legend-label">{item.label}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</section>

<style lang="scss">
  @use '../../styles' as *;

  .legend {
    width: 100%;
    max-width: 30rem;
    border: var(--border-width-thin) solid var(--color-border);
    border-radius: var(--border-radius-sm);
    background: var(--color-white);
    padding: var(--spacing-sm);
    box-shadow: 0 2px 8px var(--color-shadow);
  }

  .legend-title {
    margin-bottom: var(--spacing-sm);
    font-family: var(--font-sans);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-wider);
    line-height: var(--leading-tight);
    text-transform: uppercase;
  }

  .legend-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    font-size: var(--font-size-sm);
    line-height: var(--leading-caption);
  }

  .legend-swatch {
    flex: 0 0 1rem;
    width: 1rem;
    height: 1rem;
    border-radius: 2px;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  .legend-label {
    color: var(--color-text);
  }

  .continuous-legend,
  .diverging-legend {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  .continuous-bar,
  .diverging-bar {
    position: relative;
    width: 100%;
    height: 1rem;
    border-radius: 999px;
    overflow: hidden;
  }

  .continuous-bar {
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  .diverging-bar {
    display: flex;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  .diverging-segment {
    display: block;
    height: 100%;
  }

  .diverging-midpoint {
    position: absolute;
    top: -0.2rem;
    bottom: -0.2rem;
    width: 2px;
    background: var(--color-dark);
    transform: translateX(-50%);
  }

  .legend-axis {
    position: relative;
    height: 0.5rem;
  }

  .legend-tick {
    position: absolute;
    top: 0;
    width: 1px;
    height: 0.5rem;
    background: var(--color-medium-gray);
    transform: translateX(-50%);
  }

  .legend-tick-labels,
  .diverging-axis-labels {
    position: relative;
    min-height: 1.25rem;
    font-size: var(--font-size-xs);
    color: var(--color-medium-gray);
  }

  .legend-tick-label {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .axis-label {
    position: absolute;
    white-space: nowrap;
  }

  .axis-label-start {
    left: 0;
  }

  .axis-label-midpoint {
    left: 50%;
    transform: translateX(-50%);
    font-weight: var(--font-weight-bold);
    color: var(--color-text);
  }

  .axis-label-end {
    right: 0;
  }

  .is-diverging .legend-list {
    margin-top: var(--spacing-xs);
  }

  @include mobile {
    .legend {
      max-width: none;
    }

    .legend-tick-labels,
    .diverging-axis-labels {
      min-height: 1.5rem;
    }
  }
</style>
