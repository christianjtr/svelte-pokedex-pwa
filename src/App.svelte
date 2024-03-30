<script>
  import { onDestroy, onMount } from 'svelte';
  import PokemonListTable from './partials/PokemonListTable.partial.svelte';
  import PokemonDetail from './partials/PokemonDetail.partial.svelte';
  import SearchForm from './components/Forms/SearchForm.svelte';
  import MiniGlassLedLight from './components/Layout/MiniGlassLedLight.svelte';
  import { pokemonFetchServiceStore } from './stores/pokemonStore';
  import { initVoices } from './services/synthesisSpeech/synthesisSpeech';

  const {
    pokemon,
    reset: resetPokemon,
    fetchPokemonByName
  } = pokemonFetchServiceStore;

  const ledLights = ['red', 'yellow', 'green'];

  let scrollUpBtn;

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

  const detectScroll = (scrollDownUntil = 500) => {
    const validation =
      document.body.scrollTop > scrollDownUntil ||
      document.documentElement.scrollTop > scrollDownUntil;

    if (validation) {
      scrollUpBtn.classList.remove('is-hidden');
      return;
    }
    scrollUpBtn.classList.add('is-hidden');
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  onMount(() => {
    initVoices();
    scrollUpBtn.addEventListener('click', scrollToTop);
    window.onscroll = () => detectScroll();
  });

  onDestroy(() => {
    scrollUpBtn.removeEventListener('click', scrollToTop);
  });
</script>

<main class="is-flex is-justify-content-center">
  <section class="hero is-fullheight is-default is-fullwidth pokedex">
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
    <button
      id="btn-scrollup"
      name="btn-scrollup"
      bind:this={scrollUpBtn}
      class="button is-rounded is-medium is-hidden btn-scroll-up"
      ><i class="fa fa-arrow-circle-up"></i></button
    >
  </section>
</main>
