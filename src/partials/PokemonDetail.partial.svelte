<script>
  import { onMount, onDestroy } from 'svelte';
  import humanizeString from 'humanize-string';
  import Scatterpolar from '../components/Charts/Scatterpolar.svelte';
  import PokemonDescription from '../components/PokemonDescription.svelte';
  import EvolutionChain from '../components/PokemonEvolution.svelte';
  import { bgColors } from '../utils/pokemonColors';

  export let pokemon;
  export let onBackToList;

  let track;
  let controlBtn;
  let isPlayingAudio = false;

  const setIsPlaying = value => {
    isPlayingAudio = value;
  };

  const handlePlayPause = () => {
    if (track.paused) {
      isPlayingAudio = true;
      track.load();
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
    window.scrollTo(0, 0);
    controlBtn.addEventListener('click', handlePlayPause);
    track.addEventListener('ended', () => setIsPlaying(false));
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

  <div class="custom-grid mt-6">
    <div class="pokemon-container">
      <div
        class="pokemon-image is-flex is-justify-content-center"
        style={`--bg-color:${bgColors[data.types[0]]}`}
      >
        <img
          src={data.image || data.officialArt}
          alt={`Pokemon ${data.name} image`}
        />
      </div>
      <h1
        class="title is-size-4 is-capitalized has-text-centered mb-6 pokemon-name has-text-white"
      >
        {data.name}
      </h1>
      <PokemonDescription species={data.species} />
    </div>
    <div>
      <div
        class="px-5 is-flex is-justify-content-space-between is-flex-direction-row pokemon-stats-container"
      >
        <div class="playable-container mb-3">
          <span class="title is-size-5 m-0 is-block">Base Info.</span>
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
          <audio id="track" bind:this={track}>
            <source src={growlAudio} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
          <div class="is-flex is-align-items-center my-5">
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
        <div>
          <span class="title is-size-5 m-0 is-block">Abilities</span>
          <ul class="my-3">
            {#each abilities as ability}
              <li>{ability}</li>
            {/each}
          </ul>
          <span class="title is-size-5 m-0 is-block">Types</span>
          <p class="is-flex my-3">
            {#each data.types as type}
              <span
                class="tag is-rounded is-medium mx-1 pokemon-type"
                style={`--bg-color:${bgColors[type]}`}>{type}</span
              >
            {/each}
          </p>
        </div>
        <div>
          <span class="title is-size-5 m-0 is-block">Moves</span>
          <ul class="my-3">
            {#each moves.splice(0, 5) as move}
              <li>{move}</li>
            {/each}
          </ul>
        </div>
      </div>
      <div class="is-flex is-align-items-center">
        <img
          src={data.gif}
          alt={`Pokemon ${data.name} gif image`}
          class="gif-image mr-3"
        />
        <p>
          <span class="is-block title is-size-5 m-0">Stats</span>
          <span>Important characteristics that defines Pokémon's specie.</span>
        </p>
      </div>
      <Scatterpolar source={stats} markerColor={bgColors[data.types[0]]} />
      <EvolutionChain species={$pokemon.get().species} />
    </div>
  </div>
</div>

<style>
  .custom-grid {
    display: grid;
    grid-template-columns: 3fr 3fr;
    gap: 1.25rem;
  }

  .pokemon-detail {
    --btn-round-dimension-size: 2.5rem;

    width: 100%;
    position: relative;

    & .pokemon-stats-container {
      gap: 0.625rem;
    }

    & .pokemon-container {
      position: relative;

      & .pokemon-image {
        --bg-color: rgba(0, 0, 0, 0);
        margin-top: 3.125rem;
        margin-bottom: 3.125rem;
        position: relative;
      }

      & .pokemon-image:before {
        content: '';
        clip-path: circle(50%);
        position: absolute;
        width: 90%;
        height: 90%;
        background: color-mix(in srgb, var(--bg-color) 100%, white);
        filter: blur(25px);
        margin: 0 auto;
      }
    }

    & .pokemon-name {
      background-color: #5a6efe;
      border-radius: 0 0 3.125rem 3.125rem;
      padding: 0.3125rem;
    }

    & .pokemon-type {
      --bg-color: rgba(0, 0, 0, 0);

      background-color: color-mix(in srgb, var(--bg-color) 50%, white);
      border: 0.1875rem solid #dddddd;
    }

    & img.gif-image {
      width: auto;
      height: auto;
      max-width: 20%;
      max-height: 20%;
    }

    & img:not(.gif-image) {
      z-index: 1;
      width: 75%;
      height: 75%;
      margin: 0 auto;
    }
    & button:not(.btn-growl) {
      border-radius: 50%;
      height: var(--btn-round-dimension-size);
      width: var(--btn-round-dimension-size);
    }
  }

  @media screen and (max-width: 768px) {
    .custom-grid {
      grid-template-columns: 1fr;
    }

    .pokemon-detail .pokemon-stats-container {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 3.125rem !important;
      row-gap: 0 !important;
    }
  }

  @media screen and (max-width: 425px) {
    .pokemon-detail .pokemon-stats-container {
      grid-template-columns: 1fr !important;
    }
  }

  @media screen and (min-width: 375px) and (max-width: 425px) {
    .pokemon-detail .pokemon-stats-container {
      grid-template-columns: 1fr !important;
    }
  }

  @media screen and (min-width: 320px) and (max-width: 375px) {
    .pokemon-detail .pokemon-stats-container {
      grid-template-columns: 1fr !important;
    }
  }

  @media screen and (max-width: 320px) {
    .pokemon-detail .pokemon-stats-container {
      grid-template-columns: 1fr !important;
    }
  }
</style>
