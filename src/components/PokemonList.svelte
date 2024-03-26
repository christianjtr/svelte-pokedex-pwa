<script>
  import PokemonListItem from './PokemonListItem/PokemonListItem.svelte';
  import { pokemonListFilterStore } from '../stores/pokemonListFiltersStore';

  export let pokemons;
  const { filters } = pokemonListFilterStore;

  const filterPokemons = filtersToApply => {
    return pokemons.filter(pokemon => {
      return pokemon.types.some(type => filtersToApply.types.includes(type));
    });
  };

  $: filteredPokemons = filterPokemons($filters);
  $: pokemonList = filteredPokemons.length > 0 ? filteredPokemons : pokemons;
</script>

<div class="pokemon-list">
  <div class="grid is-col-min-12">
    {#each pokemonList as pokemon}
      <div class="cell cell-item">
        <PokemonListItem {pokemon} />
      </div>
    {/each}
  </div>
</div>

<style>
  .cell-item {
    cursor: pointer;
    & :hover {
      filter: brightness(107%);
      -webkit-filter: brightness(107%);
      transition: filter 0.5s;
    }
  }
</style>
