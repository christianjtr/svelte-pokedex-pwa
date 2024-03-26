<script>
  // import { onDestroy, onMount } from 'svelte';
  import './pokemonItemList.css';

  export let pokemon;

  // let track;
  // let controlBtn;

  $: [primaryType] = pokemon.types;

  const basicInfo = [
    { title: 'Exp.', value: `${pokemon.experience} pts` },
    { title: 'Weight', value: `${pokemon.weight / 10} kg` },
    { title: 'Height', value: `${pokemon.height * 10} cm` }
  ];

  // const growlAudio = pokemon.cries.latest || pokemon.cries.legacy;

  // function toggleClass(element, classNames) {
  //   classNames.forEach(className => element.classList.toggle(className));
  // }

  // function handlePlayPause() {
  //   if (track.paused) {
  //     track.play();
  //     toggleClass(controlBtn, ['pause', 'play']);
  //   } else {
  //     track.pause();
  //     toggleClass(controlBtn, ['pause']);
  //   }
  // }

  // function setPlayClassToButton() {
  //   toggleClass(controlBtn, ['pause', 'play']);
  // }

  // onMount(() => {
  //   track = document.getElementById(`track-${pokemon.id}`);
  //   controlBtn = document.getElementById(`play-pause-${pokemon.id}`);

  //   controlBtn.addEventListener('click', handlePlayPause);
  //   track.addEventListener('ended', setPlayClassToButton);
  // });

  // onDestroy(() => {
  //   controlBtn.removeEventListener('click', handlePlayPause, true);
  //   track.removeEventListener('ended', setPlayClassToButton, true);
  // });
</script>

<div class="pokemon-list-item">
  <div class={`box ${primaryType} is-flex`}>
    <article class="media is-flex is-align-items-center">
      <div class="media-left mr-5">
        <figure class="image is-96x96">
          <img src={pokemon.image} alt="Pokemon logo" />
        </figure>
      </div>
      <div class="media-content">
        <div class="content is-flex is-align-items-center m-0 title-container">
          <span class="is-capitalized is-size-4 title has-text-white m-0 mr-2"
            >{pokemon.name}</span
          >
          <!-- <audio id={`track-${pokemon.id}`}>
            <source src={growlAudio} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
          <div id="player-container" class="is-flex">
            <button
              id={`play-pause-${pokemon.id}`}
              name={`play-pause-${pokemon.id}`}
              class="play play-pause-button"
              aria-label="Play button"
              on:click={handlePlayPause}
            >
              Play
            </button>
          </div> -->
        </div>
        <div
          class="pokemon-info is-flex is-flex-direction-column is-justify-content-space-between gap-1"
        >
          <div class="has-text-left mt-5">
            {#each basicInfo as { title, value }}
              <p class="is-flex is-justify-content-space-between">
                <span>{title || '-'}</span>
                <span>{value || '-'}</span>
              </p>
            {/each}
          </div>
          <div class="tag-container is-flex">
            {#each pokemon.types as type}
              <span class={`tag is-rounded mx-1 ${type}`}>{type}</span>
            {/each}
          </div>
        </div>
      </div>
    </article>
  </div>
</div>
