<script>
  const handleOnMouseDown = event => {
    event.prevenDefault();
  };

  const handleOnSubmit = event => {};
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
        placeholder="Ex: Pikachu, Bulbasaur, ..."
        class="input is-rounded"
        aria-label="Search input for pokemons"
      />
      <span class="icon is-small is-left">
        <i class="fas fa-search"></i>
      </span>
    </p>
    <p class="control">
      <button
        id="btn-microphone"
        name="btn-microphone"
        aria-label="Microphone button"
        class="button btn-microphone"
        on:mousedown={handleOnMouseDown}
      >
        <i class="fas fa-microphone"></i>
      </button>
    </p>
  </div>
</form>

<style>
  .search-form {
    --btn-round-dimension-size: 2.5rem;

    & .btn-microphone {
      border-radius: 50%;
      height: var(--btn-round-dimension-size);
      width: var(--btn-round-dimension-size);
    }
  }
</style>
