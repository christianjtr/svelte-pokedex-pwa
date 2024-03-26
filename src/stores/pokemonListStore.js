import { writable } from 'svelte/store';
import { getPokemonResources, fetchDataGivenURL } from '../services/apis/pokemon/pokemon';
import { PaginatedGroup, Pokemon } from '../adapters/pokemon.adapter';
import { generateKey, setItemWithExpirationTime, getItemWithExpirationTime } from '../services/localStorage/localStorage.services';

function createPokemonListFetchServiceStore() {
	
    const isLoading = writable(false);
    const hasError = writable(false);
    const hasPokemons = writable(false);
    const pokemons = writable([]);
    
    const fetchPaginated = async (limit) => {
        try {
            const data = await getPokemonResources(limit);
            const paginatedGroup = new PaginatedGroup(data);
            return paginatedGroup.getGroupResources();
        } catch {
            hasError.set(true);
        } 
    }

    const fetchPokemons = async (limit = 10) => {
        try {
            isLoading.set(true);

            let data = null;
            
            const key = generateKey("fetchPokemons");
            data = getItemWithExpirationTime(key);

            if(data) {
                hasPokemons.set(data.length > 0);
                pokemons.set(data);
                return;
            }

            const resources = await fetchPaginated(limit);
            const promises = resources.map(({ url }) => () => fetchDataGivenURL(url));
            const results = await Promise.all(promises.map((fn) => fn()));
            const pokemonCollection = results.map((item) => new Pokemon(item).get());
            hasPokemons.set(pokemonCollection.length > 0);
            pokemons.set(pokemonCollection);
            setItemWithExpirationTime(key, pokemonCollection);
        } catch {
            hasError.set(true);
        } finally{
            isLoading.set(false);
        }
    }

    return {
		isLoading,
        hasError,
        pokemons,
        hasPokemons,
        fetchPokemons,
        reset: () => {
            isLoading.set(false);
            hasError.set(false);
            pokemons.set([]);
        },
	};
}

export const pokemonListFetchServiceStore = createPokemonListFetchServiceStore();
