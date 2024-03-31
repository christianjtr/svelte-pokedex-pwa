<script>
  import { onMount, onDestroy } from 'svelte';
  import PokemonList from '../components/PokemonList.svelte';
  import PokemonTypeFilter from '../components/PokemonTypeFilter.svelte';
  import Loading from '../components/Layout/Layout.svelte';
  import { pokemonListFetchServiceStore } from '../stores/pokemonListStore';
  import { pokemonListFilterStore } from '../stores/pokemonListFiltersStore';
  import { getQueryParams } from '../utils/queryString';

  const {
    pokemons,
    nextUrl,
    isLoading,
    reset: resetPokemonList,
    fetchPokemons
  } = pokemonListFetchServiceStore;

  const { filters } = pokemonListFilterStore;

  let clearFilterElements;

  const handleOnLoadMore = () => {
    const queryParams = getQueryParams($nextUrl);
    fetchPokemons(queryParams.limit, queryParams.offset);
  };

  const generatePokemonList = (filtersToApply, list) => {
    const filtered = list.filter(item => {
      return item.types.some(type => filtersToApply.types.includes(type));
    });

    return filtered.length > 0 ? filtered : list;
  };

  $: pokemonList = generatePokemonList($filters, $pokemons);
  $: hasPokemons = pokemonList.length > 0;

  const handleOnClearFilters = () => {
    clearFilterElements();
  };

  onMount(() => {
    fetchPokemons();
  });

  onDestroy(() => {
    resetPokemonList();
  });
</script>

<div
  class="container is-flex is-flex-direction-column is-justify-content-space-between is-fullheight"
>
  <div class="columns">
    <div class="column is-2">
      <PokemonTypeFilter bind:clearFilterElements />
    </div>
    <div class="column is-10">
      <div
        class="is-flex is-justify-content-space-between is-align-items-baseline mb-1 filter-container"
      >
        <h1 class="title is-size-5">Pokémons</h1>
        <button
          id="btn-remove-filters"
          name="btn-remove-filters"
          on:click={handleOnClearFilters}
          class="button is-rounded"
        >
          <i class="fa fa-filter mr-1"></i>
          Clear filters
        </button>
      </div>
      {#if $isLoading}
        <Loading />
      {/if}
      {#if hasPokemons}
        <PokemonList pokemons={pokemonList} on:choose-pokemon />
        <button
          id="btn-load-more"
          name="btn-load-more"
          class="button my-3 is-flex is-fullwidth is-rounded"
          aria-label="Button load more entries"
          on:click={handleOnLoadMore}
        >
          <i class="fa fa-plus-circle mr-1"></i>Load more</button
        >
      {/if}
    </div>
  </div>
</div>

<style>
  @media screen and (min-width: 320px) and (max-width: 375px) {
    .filter-container {
      display: flex !important;
      flex-direction: column;
      margin-bottom: 20px !important;
    }

    .filter-container *:not(i) {
      width: 100%;
      text-align: center;
    }
  }

  @media screen and (max-width: 320px) {
    .filter-container {
      display: flex !important;
      flex-direction: column;
      margin-bottom: 20px !important;
    }

    .filter-container *:not(i) {
      width: 100%;
      text-align: center;
    }
  }
</style>
