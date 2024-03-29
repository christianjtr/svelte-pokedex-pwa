<script>
  import Plotly from 'plotly.js-dist';

  export let source;
  export let markerColor;

  let myChartContainerElement;

  const setData = () => {
    return source.reduce(
      (acc, item) => {
        return {
          categories: [...acc.categories, item.key],
          values: [...acc.values, item.value]
        };
      },
      { categories: [], values: [] }
    );
  };

  $: ({ categories, values } = source && setData());
  $: trace = [
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
  $: layout = {
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

  const createChart = () => {
    Plotly.newPlot(myChartContainerElement, trace, layout, {
      displayModeBar: false,
      staticPlot: true,
      scrollZoom: false,
      responsive: false,
      responsive: true
    });
  };

  $: myChartContainerElement && source && createChart();
</script>

<div id="my-scatterpolar-chart" bind:this={myChartContainerElement}></div>
