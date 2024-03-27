<script>
  import { onDestroy, onMount } from 'svelte';
  import { pokemonTypeFetchServiceStore } from '../stores/pokemonTypesStore';
  import { pokemonListFilterStore } from '../stores/pokemonListFiltersStore';

  export const clearFilterElements = () => {
    resetFilters();
    typeFiltersElements.forEach(element => element.classList.remove('clicked'));
  };

  const { isLoading, types, fetchPokemonTypes } = pokemonTypeFetchServiceStore;
  const { reset: resetFilters, toggleTypeFilter } = pokemonListFilterStore;

  let typeFiltersElements = [];

  const handleOnClick = (index, type) => {
    typeFiltersElements[index].classList.toggle('clicked');
    toggleTypeFilter(type);
  };

  onMount(() => {
    fetchPokemonTypes();
  });

  onDestroy(() => {
    resetFilters();
  });
</script>

<div class="filter-type-container">
  <h1 class="title is-size-5">Types</h1>
  <p class="mb-4">Shorten the list by selecting types.</p>
  <div>
    {#if !$isLoading}
      {#each $types as type, index}
        <button
          class={`tag is-rounded m-1 p-3`}
          name={`type_${type.name}`}
          id={`type_${type.name}`}
          bind:this={typeFiltersElements[index]}
          on:click|preventDefault={handleOnClick(index, type.name)}
          aria-label={`Filter button for type ${type.name}`}
          >{type.name}
        </button>
      {/each}
    {/if}
  </div>
</div>

<style>
  .filter-type-container {
    position: sticky;
    top: 1.875rem;

    & button {
      border: 0.0938rem solid #cccccc;
    }

    & button.clicked {
      background: slateblue;
      color: white;
      transition: background 0.5s;
    }
  }
</style>
