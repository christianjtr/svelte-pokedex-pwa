<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function submitForm(data) {
    dispatch('submit-form', data);
  }

  const handleOnSubmit = event => {
    const formData = new FormData(event.target);
    const query = formData.get('pokemon');
    submitForm({ query });
  };
</script>

<form
  id="search-form"
  name="search-form"
  on:submit|preventDefault={handleOnSubmit}
  class="search-form"
>
  <div
    class="field is-grouped is-flex is-justify-content-space-between is-align-items-center"
  >
    <p class="control is-expanded has-icons-left has-icons-right">
      <input
        id="pokemon"
        name="pokemon"
        type="text"
        autocomplete="off"
        placeholder="Ex: Pikachu, Bulbasaur, ..."
        class="input is-rounded"
        aria-label="Search input for pokemons"
      />
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </p>
  </div>
</form>
