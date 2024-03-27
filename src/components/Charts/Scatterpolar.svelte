<script>
  import { onMount } from 'svelte';
  import Plotly from 'plotly.js-dist';

  export let source;

  const { categories, values } = source.reduce(
    (acc, item) => {
      return {
        categories: [...acc.categories, item.key],
        values: [...acc.values, item.value]
      };
    },
    { categories: [], values: [] }
  );

  const data = [
    {
      type: 'scatterpolar',
      r: [...values, ...values.slice(0, 1)],
      theta: [...categories, ...categories.slice(0, 1)],
      fill: 'toself'
    }
  ];

  const layout = {
    polar: {
      radialaxis: {
        visible: true,
        range: [0, Math.max(values)]
      }
    },
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { l: 100, r: 100, b: 0, t: 0 }
  };

  onMount(() => {
    Plotly.newPlot('my-scatterpolar-chart', data, layout, {
      displayModeBar: false,
      staticPlot: true,
      scrollZoom: false,
      responsive: false,
      responsive: true
    });
  });
</script>

<div id="my-scatterpolar-chart"></div>
