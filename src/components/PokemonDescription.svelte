<script>
  import { onDestroy, onMount } from 'svelte';
  import humanizeString from 'humanize-string';
  import Loading from '../components/Layout/Layout.svelte';
  import { pokemonDescriptionStore } from '../stores/pokemonDescriptionStore';
  import SpeechSynthesis from '../services/synthesisSpeech/synthesisSpeech';

  export let species;

  let speechToSay;
  let isSpeaking = false;

  const isSpeechSynthesisAvailable = 'speechSynthesis' in window;

  const {
    description,
    isLoading,
    reset: resetDescription,
    fetchPokemonDescription
  } = pokemonDescriptionStore;

  const toggleSpeak = () => {
    if (isSpeaking) return;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  const setData = descriptionInstance => {
    const rawData = descriptionInstance?.get();

    if (rawData) {
      return {
        baseHappiness: rawData.baseHappiness,
        growthRate: humanizeString(rawData.growthRate),
        habitat: humanizeString(rawData.habitat),
        shape: humanizeString(rawData.shape),
        description: rawData.descriptions?.[0].text || 'N/A'
      };
    }

    return rawData;
  };

  $: species && fetchPokemonDescription(species.name, species.url);
  $: data = setData($description);
  $: speech = speechToSay
    ?.setSpeechToSay(data?.description, {
      onstart: () => (isSpeaking = true),
      onend: () => (isSpeaking = false)
    })
    .get();

  onMount(() => {
    window.speechSynthesis.getVoices();
    speechToSay = new SpeechSynthesis();
  });

  onDestroy(() => {
    resetDescription();
  });
</script>

<div class="mb-5 pokemon-description">
  {#if $isLoading}
    <Loading />
  {:else if data}
    <p class="mb-4 is-size-4">
      {#if isSpeechSynthesisAvailable}
        <button
          id="btn-speak"
          name="btn-speak"
          on:click={toggleSpeak}
          class={`button ${isSpeaking && 'active'}`}
          aria-label="Speak button"
        >
          <i class={'fa fa-volume-up'}></i>
        </button>
      {/if}
      <span class="is-size-3 has-text-link has-text-weight-semibold">“</span
      >{data.description}
    </p>
    <div class="pokemon-characteristics">
      <p>
        <span class="is-size-6 has-text-weight-semibold has-text-link mb-3"
          >😄 Happiness</span
        >
        <span class="is-block"
          >The happiness when caught by a normal Pokéball.</span
        >
        <span class="is-block has-text-weight-semibold"
          >{data.baseHappiness} pts</span
        >
      </p>
      <p>
        <span class="is-size-6 has-text-weight-semibold has-text-link mb-3"
          >🏠 Habitat</span
        >
        <span class="is-block">Areas where can be found.</span>
        <span class="is-block has-text-weight-semibold">{data.habitat}</span>
      </p>
      <p>
        <span class="is-size-6 has-text-weight-semibold has-text-link mb-3"
          >🔲 Shape</span
        >
        <span class="is-block">
          Shapes used for sorting Pokémon in a Pokédex.
        </span>
        <span class="is-block has-text-weight-semibold">{data.shape}</span>
      </p>
      <p>
        <span class="is-size-6 has-text-weight-semibold has-text-link mb-3"
          >📈 Growth rate</span
        >
        <span class="is-block"
          >Speed with which Pokémon gain levels through experience.</span
        >
        <span class="is-block has-text-weight-semibold">{data.growthRate}</span>
      </p>
    </div>
  {/if}
</div>

<style>
  .pokemon-description {
    & button.active {
      background: #5a6efe;
      color: white;
      transition: background 0.5s;
    }
  }

  .pokemon-characteristics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
  }

  @media screen and (max-width: 768px) {
    .pokemon-characteristics {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 0.625rem;
      padding: 0 1.25rem;
    }
  }
</style>
