<script>
  import { onMount, onDestroy } from 'svelte';
  import humanizeString from 'humanize-string';
  import Scatterpolar from '../components/Charts/Scatterpolar.svelte';
  import PokemonDescription from '../components/PokemonDescription.svelte';

  export let pokemon;
  export let onBackToList;

  let track;
  let controlBtn;
  let isPlayingAudio = false;

  const bgColors = {
    grass: '#49d0b0',
    bug: '#8ad049',
    normal: '#be69c7',
    fairy: '#db749f',
    fire: '#f05267',
    water: '#44bce0',
    electric: 'rgb(223, 235, 67)',
    poison: 'rgb(130, 175, 189)',
    ground: 'rgb(136, 130, 94)',
    fighting: 'rgb(218, 153, 70)',
    psychic: 'rgb(112, 62, 62)',
    rock: 'rgb(161, 161, 161)',
    ghost: 'rgb(71, 134, 120)',
    ice: 'rgb(187, 243, 231)',
    dragon: 'rgb(236, 133, 48)'
  };

  const setIsPlaying = value => {
    isPlayingAudio = value;
  };

  const handlePlayPause = () => {
    if (track.paused) {
      isPlayingAudio = true;
      track.play();
      return;
    }
    track.pause();
  };

  const getData = pokemonInstance => {
    return {
      data: pokemonInstance.get(),
      stats: pokemonInstance.getStats().map(stat => ({
        ...stat,
        key: humanizeString(stat.key)
      })),
      abilities: pokemonInstance
        .getAbilities()
        .map(ability => humanizeString(ability)),
      moves: pokemonInstance.getMoves().map(move => humanizeString(move))
    };
  };

  $: ({ data, stats, abilities, moves } = getData($pokemon));
  $: growlAudio = data.cries.latest || data.cries.legacy;

  onMount(() => {
    controlBtn.addEventListener('click', handlePlayPause);
    track.addEventListener('ended', () => setIsPlaying(false));

    // handlePlayPause();
  });

  onDestroy(() => {
    controlBtn.removeEventListener('click', handlePlayPause, true);
    track.removeEventListener('ended', () => setIsPlaying(false), true);
  });
</script>

<div class="pokemon-detail">
  <div class="is-flex is-align-items-center">
    <button
      id="btn-back"
      name="btn-back"
      on:click={onBackToList}
      class="button mr-2"
      aria-label="Back to pokémons button"
    >
      <i class="fa fa-arrow-left"></i>
    </button>
    <span class="has-text-weight-semibold">Back to pokémons</span>
  </div>
  <div class="fixed-grid has-6-cols mt-5">
    <div class="grid">
      <div
        class="cell px-5 is-flex is-flex-direction-column is-justify-content-center"
      >
        <div class="playable-container mb-3">
          <audio id="track" bind:this={track}>
            <source src={growlAudio} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
          <div class="is-flex is-align-items-center">
            <button
              id="btn-growl"
              name="btn-growl"
              class="button btn-growl is-rounded is-small"
              aria-label="Button growl"
              bind:this={controlBtn}
              on:click={handlePlayPause}
            >
              <i class={`fa mr-2 ${isPlayingAudio ? 'fa-pause' : 'fa-play'}`}
              ></i>
              Make it growl!
            </button>
          </div>
        </div>
        <span class="title is-size-5 m-0">Basics</span>
        <ul class="my-3">
          <li class="is-flex is-justify-content-space-between">
            <span>Exp.</span>
            <span>{data.experience} pts</span>
          </li>
          <li class="is-flex is-justify-content-space-between">
            <span>Weight</span>
            <span>{data.weight / 10} Kg</span>
          </li>
          <li class="is-flex is-justify-content-space-between">
            <span>Height</span>
            <span>{data.height * 10} cm</span>
          </li>
        </ul>
        <span class="title is-size-5 m-0">Moves</span>
        <ul class="my-3">
          {#each moves.splice(0, 5) as move}
            <li>{move}</li>
          {/each}
        </ul>
        <span class="title is-size-5 m-0">Abilities</span>
        <ul class="my-3">
          {#each abilities as ability}
            <li>{ability}</li>
          {/each}
        </ul>
      </div>
      <div class="cell pokemon-container is-col-span-2">
        <div
          class="pokemon-image is-flex is-justify-content-center"
          style={`--bg-color:${bgColors[data.types[0]]}`}
        >
          <img src={data.image} alt={`Pokemon ${data.name} image`} />
        </div>
        <h1 class="title is-size-4 is-capitalized has-text-centered my-5">
          {data.name}
        </h1>
      </div>
      <div class="cell is-col-span-3 px-3">
        <PokemonDescription species={data.species} />
        <span class="title is-size-5 m-0">Stats</span>
        <Scatterpolar source={stats} markerColor={bgColors[data.types[0]]} />
      </div>
      <div class="cell has-background-primary is-col-span-6">...</div>
    </div>
  </div>
</div>

<style>
  .pokemon-detail {
    --btn-round-dimension-size: 2.5rem;

    width: 100%;
    position: relative;

    & .pokemon-container {
      position: relative;

      & .pokemon-image {
        --bg-color: rgba(0, 0, 0, 0);
        margin-top: 1.875rem;
        position: relative;
      }

      & .pokemon-image:before {
        content: '';
        clip-path: circle(50%);
        position: absolute;
        top: 0;
        left: 0;
        width: 90%;
        height: 90%;
        background: var(--bg-color);
        filter: blur(30px);
      }
    }
    & img {
      z-index: 1;
      width: 100%;
      height: 100%;
    }
    & button:not(.btn-growl) {
      border-radius: 50%;
      height: var(--btn-round-dimension-size);
      width: var(--btn-round-dimension-size);
    }
  }
</style>
