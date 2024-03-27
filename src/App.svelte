<script>
  import PokemonListTable from './partials/PokemonListTable.partial.svelte';
  import PokemonDetail from './partials/PokemonDetail.partial.svelte';
  import SearchForm from './components/SearchForm.svelte';
  import MiniGlassLedLight from './components/MiniGlassLedLight.svelte';
  import { pokemonFetchServiceStore } from './stores/pokemonStore';

  const {
    pokemon,
    reset: resetPokemon,
    fetchPokemonByName
  } = pokemonFetchServiceStore;

  const ledLights = ['red', 'yellow', 'green'];

  const handleOnChoosePokemon = event => {
    const { pokemonName } = event.detail;
    fetchPokemonByName(pokemonName);
  };

  const handleOnClearPokemon = () => {
    resetPokemon();
  };

  const handleOnSubmitSearchForm = event => {
    const { query } = event.detail;
    fetchPokemonByName(query);
  };
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
          {#each ledLights as ledLight}
            <MiniGlassLedLight theme={ledLight} />
          {/each}
        </div>
      </div>
      <div class="mx-6">
        <SearchForm on:submit-form={handleOnSubmitSearchForm} />
      </div>
    </div>
    <div class="hero-body pokedex__container">
      {#if $pokemon}
        <PokemonDetail {pokemon} onBackToList={handleOnClearPokemon} />
      {:else}
        <PokemonListTable on:choose-pokemon={handleOnChoosePokemon} />
      {/if}
    </div>
  </section>
</main>
