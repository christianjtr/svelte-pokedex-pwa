<script>
  import { createEventDispatcher } from 'svelte';
  import { bgColors } from '../../utils/pokemonColors';
  import './pokemonItemList.css';

  export let pokemon;

  const dispatch = createEventDispatcher();

  const handleOnClick = () => {
    dispatch('choose-pokemon', { pokemonName: pokemon.name });
  };

  $: [primaryType] = pokemon.types;

  const basicInfo = [
    { title: 'Exp.', value: `${pokemon.experience} pts` },
    { title: 'Weight', value: `${pokemon.weight / 10} Kg` },
    { title: 'Height', value: `${pokemon.height * 10} cm` }
  ];
</script>

<div
  class="pokemon-list-item"
  tabindex="0"
  role="button"
  on:keypress|preventDefault
  on:click={handleOnClick}
>
  <div class="box is-flex" style={`--bg-color:${bgColors[primaryType]}`}>
    <article class="media is-flex is-align-items-center">
      <div class="media-left mr-5">
        <figure class="image is-96x96">
          <img src={pokemon.image || pokemon.officialArt} alt="Pokemon logo" />
        </figure>
      </div>
      <div class="media-content">
        <div class="content is-flex is-align-items-center m-0 title-container">
          <span class="is-capitalized is-size-4 title has-text-white m-0 mr-2"
            >{pokemon.name}</span
          >
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
              <span
                class="tag is-rounded mx-1"
                style={`--bg-color:${bgColors[type]}`}>{type}</span
              >
            {/each}
          </div>
        </div>
      </div>
    </article>
  </div>
</div>
