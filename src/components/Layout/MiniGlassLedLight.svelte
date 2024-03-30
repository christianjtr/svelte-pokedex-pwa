<script>
  export let theme;

  const themes = {
    red: {
      bgColor: '#fb7b7b'
    },
    yellow: {
      bgColor: '#fbfb9b'
    },
    green: {
      bgColor: '#b0fb7b'
    }
  };
</script>

<div
  class="mini-glass-led-light"
  style={`--background-color: ${themes[theme].bgColor};`}
></div>

<style>
  .mini-glass-led-light {
    --background-color: rbga(0, 0, 0, 0);
    width: 20px;
    height: 20px;
    margin-right: 10px;
    float: left;
    box-shadow:
      inset rgba(0, 0, 0, 0.6) 0 -1px 1px,
      #f52e37 0 2px 12px;
    background-color: color-mix(in srgb, var(--background-color) 100%, black);
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -o-border-radius: 20px;
  }
</style>
