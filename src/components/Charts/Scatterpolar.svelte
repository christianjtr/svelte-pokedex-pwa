<script>
  import { onMount } from 'svelte';
  import Plotly from 'plotly.js-dist';

  export let source;
  export let markerColor;

  const { categories, values } = source.reduce(
    (acc, item) => {
      return {
        categories: [...acc.categories, item.key],
        values: [...acc.values, item.value]
      };
    },
    { categories: [], values: [] }
  );

  const trace = [
    {
      type: 'scatterpolar',
      r: [...values, ...values.slice(0, 1)],
      theta: [...categories, ...categories.slice(0, 1)],
      mode: 'lines+markers+text',
      text: [...values, ...values.slice(0, 1)],
      textposition: 'top',
      fill: 'toself',
      marker: {
        size: 10,
        color: markerColor
      }
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
    margin: { l: 120, r: 120, b: 0, t: 0 }
  };

  onMount(() => {
    Plotly.newPlot('my-scatterpolar-chart', trace, layout, {
      displayModeBar: false,
      staticPlot: true,
      scrollZoom: false,
      responsive: false,
      responsive: true
    });
  });
</script>

<div id="my-scatterpolar-chart"></div>
