<script>
  import { onDestroy, onMount } from 'svelte';
  import humanizeString from 'humanize-string';
  import { pokemonDescriptionStore } from '../stores/pokemonDescriptionStore';

  export let species;

  const { name, url } = species;

  const {
    description,
    reset: resetDescription,
    fetchPokemonDescription
  } = pokemonDescriptionStore;

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

  onMount(() => {
    fetchPokemonDescription(name, url);
  });

  onDestroy(() => {
    resetDescription();
  });
</script>

<div class="mb-5">
  {#if data}
    <p class="mb-4 is-size-4">
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
