<script>
  import { onDestroy, onMount } from 'svelte';
  import humanizeString from 'humanize-string';
  import { pokemonDescriptionStore } from '../stores/pokemonDescriptionStore';
  import { createSynthesisSpeech } from '../services/synthesisSpeech/synthesisSpeech';

  export let species;

  const { name, url } = species;

  let isSpeaking = false;

  const isSpeechSynthesisAvailable = 'speechSynthesis' in window;

  const {
    description,
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
        growthRate: humanizeString(rawData.growthRate),
        habitat: humanizeString(rawData.habitat),
        shape: humanizeString(rawData.shape),
        description: rawData.descriptions?.[0].text || 'N/A'
      };
    }

    return rawData;
  };

  $: data = setData($description);
  $: speech = createSynthesisSpeech(data?.description, {
    onstart: () => (isSpeaking = true),
    onend: () => (isSpeaking = false)
  });

  onMount(() => {
    fetchPokemonDescription(name, url);
  });

  onDestroy(() => {
    resetDescription();
  });
</script>

<div class="mb-5 pokemon-description">
  {#if data}
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
    <div class="is-flex is-justify-content-space-between">
      <p>
        <span class="is-size-6 has-text-weight-semibold has-text-link"
          >Habitat:</span
        >
        <span>{data.habitat}</span>
      </p>
      <p>
        <span class="is-size-6 has-text-weight-semibold has-text-link"
          >Shape:</span
        >
        <span>{data.shape}</span>
      </p>
      <p>
        <span class="is-size-6 has-text-weight-semibold has-text-link"
          >Growth rate:</span
        >
        <span>{data.growthRate}</span>
      </p>
    </div>
  {/if}
</div>

<style>
  .pokemon-description {
    & button.active {
      background: slateblue;
      color: white;
      transition: background 0.5s;
    }
  }
</style>
