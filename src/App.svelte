<script>
  import { onMount } from 'svelte';
  import PokemonList from './components/PokemonList.svelte';
  import MiniGlassLedLight from './components/MiniGlassLedLight.svelte';
  import SearchForm from './components/SearchForm.svelte';
  import PokemonTypeFilter from './components/PokemonTypeFilter.svelte';
  import { pokemonListFetchServiceStore } from './stores/pokemonListStore';
  import { pokemonListFilterStore } from './stores/pokemonListFiltersStore';

  const { hasPokemons, pokemons, fetchPokemons } = pokemonListFetchServiceStore;
  const { reset } = pokemonListFilterStore;

  let clearFilterElements;

  const handleOnClearFilters = () => {
    reset();
    clearFilterElements();
  };

  onMount(() => {
    fetchPokemons();
  });
</script>

<main class="is-flex is-justify-content-center">
  <section
    class="hero is-fullheight is-default is-fullwidth pokedex"
    style="position:relative"
  >
    <div
      class="bg-upper-glass-container is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center"
    >
      <div
        class="button-glass-container is-flex is-justify-content-space-between"
      >
        <div class="glass-button">
          <div class="glass-button__reflect"></div>
        </div>
        <div>
          <MiniGlassLedLight theme="red" />
          <MiniGlassLedLight theme="yellow" />
          <MiniGlassLedLight theme="green" />
        </div>
      </div>
      <div class="mx-6">
        <SearchForm />
      </div>
    </div>
    <div class="hero-body pokedex__container">
      <div
        class="container is-flex is-flex-direction-column is-justify-content-space-between is-fullheight"
      >
        <div class="columns" on>
          <div class="column is-2">
            <PokemonTypeFilter bind:clearFilterElements />
          </div>
          <div class="column is-10">
            <div
              class="is-flex is-justify-content-space-between is-align-items-baseline mb-1"
            >
              <h1 class="title is-size-5">Pokémons</h1>
              <button
                id="btn-remove-filters"
                name="btn-remove-filters"
                on:click={handleOnClearFilters}
                class="button is-small is-rounded"
              >
                <i class="fa fa-filter mr-1"></i>
                Clear filters
              </button>
            </div>

            {#if $hasPokemons}
              <PokemonList pokemons={$pokemons} />
            {/if}
          </div>
        </div>
        <!-- <div class="grid"> -->
        <!-- <div class="cell"> -->
        <!-- <figure class="image is-square">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg"
                alt="Pokemon gif"
              />
            </figure> -->
        <!-- </div> -->
        <!-- <div class="cell"></div> -->
        <!-- </div> -->
      </div>
    </div>
  </section>
</main>
