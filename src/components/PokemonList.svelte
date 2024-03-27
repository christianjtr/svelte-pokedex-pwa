<script>
  import PokemonListItem from './PokemonListItem/PokemonListItem.svelte';

  export let pokemons;
</script>

<div class="pokemon-list">
  <div class="grid is-col-min-12">
    {#each pokemons as pokemon}
      <div class="cell cell-item">
        <PokemonListItem {pokemon} on:choose-pokemon />
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
