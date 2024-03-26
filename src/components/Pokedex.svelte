<script>
  import { pokemonFetchServiceStore } from '../stores/pokemonStore';

  const { pokemon, fetchPokemonByName } = pokemonFetchServiceStore;

  const handleOnSubmit = async event => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get('pokemon');
    await fetchPokemonByName(query);
  };
</script>

<div>
  <h1>Pokedex</h1>
  <form name="pokemon-form" id="pokemon-form" on:submit={handleOnSubmit}>
    <input
      type="text"
      name="pokemon"
      id="pokemon"
      data-testid="pokemon"
      autocomplete="off"
      placeholder="Hey!"
    />
  </form>
</div>
