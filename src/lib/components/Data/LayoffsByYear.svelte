<!--
@component
LayoffsByYear.svelte — An interactive dropdown component showing tech layoff
data broken down by month for a selected year. Based on data from Layoffs.fyi.
-->
<script>
  import layoffsData from './layoffs.json';

  let selectedYear = $state('2024');

  const years = ['2024', '2025', '2026'];

  const monthOrder = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthlyData = $derived(
    layoffsData
      .filter((row) => row.Year === selectedYear)
      .sort((a, b) => monthOrder.indexOf(a.Month) - monthOrder.indexOf(b.Month))
  );

  const totalEmployees = $derived(
    monthlyData.reduce((sum, row) => sum + parseInt(row['Employees Laid Off'], 10), 0)
  );

  const totalCompanies = $derived(
    monthlyData.reduce((sum, row) => sum + parseInt(row['Companies with Layoffs'], 10), 0)
  );

  function formatNumber(num) {
    return num.toLocaleString();
  }
</script>

<section class="layoffs-section">
  <h2 class="layoffs-title">How many tech layoffs were there?</h2>

  <div class="controls">
    <label for="year-select" class="label">Choose a year</label>
    <select id="year-select" bind:value={selectedYear} class="dropdown">
      {#each years as year (year)}
        <option value={year}>{year}</option>
      {/each}
    </select>
  </div>

  {#if monthlyData.length > 0}
    <div class="data-summary">
      <div class="summary-item">
        <div class="summary-label">Total employees laid off</div>
        <div class="summary-value">{formatNumber(totalEmployees)}</div>
      </div>
      <div class="summary-item">
        <div class="summary-label">Companies affected</div>
        <div class="summary-value">{formatNumber(totalCompanies)}</div>
      </div>
    </div>

    <div class="table-wrapper">
      <table class="layoffs-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Employees Laid Off</th>
            <th>Companies</th>
          </tr>
        </thead>
        <tbody>
          {#each monthlyData as row (row.Month)}
            <tr>
              <td class="month">{row.Month}</td>
              <td class="number">{formatNumber(parseInt(row['Employees Laid Off'], 10))}</td>
              <td class="number">{formatNumber(parseInt(row['Companies with Layoffs'], 10))}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <p class="no-data">No data available for {selectedYear}</p>
  {/if}
</section>

<style lang="scss">
  @use '../../styles' as *;

  .layoffs-section {
    margin: var(--spacing-md) 0;
    padding: var(--spacing-lg) 0;
  }

  .layoffs-title {
    font-family: var(--font-serif);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-normal);
    color: var(--color-dark);
    margin-bottom: var(--spacing-md);
  }

  .controls {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-xl);
  }

  .label {
    font-family: var(--font-sans);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    color: var(--color-dark);
  }

  .dropdown {
    font-family: var(--font-sans);
    font-size: var(--font-size-base);
    padding: var(--spacing-xs) var(--spacing-sm);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background-color: white;
    color: var(--color-dark);
    cursor: pointer;
    min-width: 120px;

    &:hover {
      border-color: var(--color-accent);
    }

    &:focus {
      outline: none;
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px rgba(var(--color-accent-rgb), 0.1);
    }
  }

  .data-summary {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-md);
    background-color: var(--color-light-gray);
    border-radius: 4px;

    @include tablet {
      grid-template-columns: 1fr;
    }
  }

  .summary-item {
    display: flex;
    flex-direction: column;
  }

  .summary-label {
    font-family: var(--font-sans);
    font-size: var(--font-size-xs);
    font-weight: var(--font-weight-bold);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing-wider);
    color: var(--color-text);
    margin-bottom: var(--spacing-xs);
  }

  .summary-value {
    font-family: var(--font-sans);
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-accent);
  }

  .table-wrapper {
    overflow-x: auto;
  }

  .layoffs-table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-sans);

    thead {
      background-color: var(--color-light-gray);
    }

    th {
      padding: var(--spacing-sm);
      text-align: left;
      font-weight: var(--font-weight-bold);
      font-size: var(--font-size-sm);
      color: var(--color-dark);
      border-bottom: 2px solid var(--color-border);
      text-transform: uppercase;
      letter-spacing: var(--letter-spacing-wider);
    }

    td {
      padding: var(--spacing-sm);
      border-bottom: 1px solid var(--color-border);
      font-size: var(--font-size-base);
      color: var(--color-text);
    }

    tbody tr:hover {
      background-color: var(--color-light-gray);
    }

    .month {
      font-weight: var(--font-weight-bold);
    }

    .number {
      text-align: right;
    }
  }

  .no-data {
    padding: var(--spacing-md);
    color: var(--color-text);
    font-style: italic;
  }
</style>
