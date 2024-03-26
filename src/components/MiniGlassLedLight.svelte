<script>
  export let theme;

  const themes = {
    red: {
      '--background-color': '#fb7b7b',
      '--background-color-50': '#fb0505'
    },
    yellow: {
      '--background-color': '#fbfb9b',
      '--background-color-50': '#fbfb05'
    },
    green: {
      '--background-color': '#b0fb7b',
      '--background-color-50': '#50fb05'
    }
  };

  const styles = Object.entries(themes[theme])
    .map(([key, value], index, collection) => {
      return `${key}:${value}${index === collection.length - 1 ? ';' : ''}`;
    })
    .join(';');
</script>

<div class="mini-glass-led-light" style={styles}></div>

<style>
  .mini-glass-led-light {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    float: left;

    background-color: var(--background-color);
    border-radius: 20px;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    -o-border-radius: 20px;

    /* animation: blinking 1.5s infinite; */
  }

  @keyframes blinking {
    from {
      background-color: var(--background-color);
    }
    50% {
      background-color: var(--background-color-50);
    }
    to {
      background-color: var(--background-color);
    }
  }
</style>
