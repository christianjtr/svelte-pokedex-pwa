<script>
  import { onMount } from 'svelte';
  import Loading from '../components/Layout/Layout.svelte';
  import { pokemonFetchServiceStore } from '../stores/pokemonStore';
  import { pokemonEvolutionChainStore } from '../stores/pokemonEvolutionChain';

  export let species;

  const { pokemonEvolutions, isLoading, fetchPokemonEvolutions } =
    pokemonEvolutionChainStore;

  const { fetchPokemonByName } = pokemonFetchServiceStore;

  const handleOnClick = (_, pokemonName) => {
    fetchPokemonByName(pokemonName);
  };

  const handleOnKeyPress = (event, pokemonName) => {
    if (event.key === 'Enter') {
      fetchPokemonByName(pokemonName);
    }
  };

  const setEvolutionData = pokemonEvolutionsData => {
    return pokemonEvolutionsData?.map(pokemon => pokemon.get());
  };

  $: species && fetchPokemonEvolutions(species.name, species.url);
  $: pokemons = setEvolutionData($pokemonEvolutions) || [];

  onMount(() => {
    fetchPokemonEvolutions(species.name, species.url);
  });
</script>

<div>
  <span class="is-block title is-size-5">Evolutions</span>
  {#if $isLoading}
    <Loading />
  {:else}
    <div class="pokemon-evolution-container">
      {#if pokemons.length > 0}
        {#each pokemons as pokemon}
          <div
            tabindex="0"
            class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center pokemon-evolution-card"
            role="button"
            on:keypress={event => handleOnKeyPress(event, pokemon.name)}
            on:click={event => handleOnClick(event, pokemon.name)}
          >
            <figure class="image is-128x128">
              <img
                src={pokemon.image || pokemon.officialArt}
                alt={`Pokemon ${pokemon.name} gif image`}
                class="m-0"
              />
            </figure>
            <span
              class="tag is-medium is-capitalized has-text-centered is-rounded has-text-white pokemon-title has-text-weight-semibold"
              >{pokemon.name}</span
            >
          </div>
        {/each}
      {/if}
    </div>
    {#if pokemons.length === 0}
      <div class="notification is-flex is-warning is-align-items-center">
        <i class="fa fa-info-circle mr-2"></i>
        No evolutions.
      </div>
    {/if}
  {/if}
</div>

<style>
  .pokemon-evolution-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.25rem;
  }

  .pokemon-evolution-card {
    background: white;
    padding: 1.25rem;
    border-radius: 1.25rem;
    border: 0.0313rem solid #dddddd;
  }

  .pokemon-evolution-card:hover {
    cursor: pointer;
    background: color-mix(in srgb, #5a6efe 20%, white);
  }

  .pokemon-evolution-card img {
    width: 100% !important;
  }

  .pokemon-title {
    background: #5a6efe;
  }

  @media screen and (max-width: 768px) {
    .pokemon-evolution-container {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (min-width: 320px) and (max-width: 375px) {
    .pokemon-evolution-container {
      grid-template-columns: 1fr;
    }
  }
  @media screen and (max-width: 320px) {
    .pokemon-evolution-container {
      grid-template-columns: 1fr;
    }
  }
</style>
