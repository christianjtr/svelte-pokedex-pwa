<script>
  import { onDestroy, onMount } from 'svelte';
  import humanizeString from 'humanize-string';
  import { pokemonDescriptionStore } from '../stores/pokemonDescriptionStore';

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
  $: speech = (() => {
    const speechToSay = new SpeechSynthesisUtterance(data?.description);
    speechToSay.volume = 1;
    speechToSay.rate = 0.95;
    speechToSay.pitch = 0.5;
    speechToSay.voice = speechSynthesis.getVoices()[51]; // Google US English voice...
    speechToSay.onstart = () => (isSpeaking = true);
    speechToSay.onend = () => (isSpeaking = false);
    return speechToSay;
  })();

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
    <p class="is-flex is-justify-content-space-between">
      <span>🏡 {data.habitat}</span>
      <span>🔲 {data.shape}</span>
      <span>📈 {data.growthRate} (Growth rate)</span>
    </p>
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
