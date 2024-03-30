<script>
  import { onMount } from 'svelte';
  import { pokemonEvolutionChainStore } from '../stores/pokemonEvolutionChain';

  export let species;

  const { pokemonEvolutions, fetchPokemonEvolutions } =
    pokemonEvolutionChainStore;

  const setEvolutionData = pokemonEvolutionsData => {
    return pokemonEvolutionsData?.map(pokemon => pokemon.get());
  };

  $: pokemons = setEvolutionData($pokemonEvolutions) || [];

  onMount(() => {
    fetchPokemonEvolutions(species.name, species.url);
  });
</script>

<div>
  <span class="is-block title is-size-5">Evolution chain</span>
  <div class="pokemon-evolution-container">
    {#if pokemons.length > 0}
      {#each pokemons as pokemon}
        <div
          class="is-flex is-flex-direction-column is-justify-content-center pokemon-evolution-card"
        >
          <figure class="image is-128x128">
            <img
              src={pokemon.image}
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
</style>
