import { writable } from 'svelte/store';
import { getPokemonByName } from '../services/apis/pokemon/pokemon';
import { generateKey, setItemWithExpirationTime, getItemWithExpirationTime } from '../services/localStorage/localStorage.services';
import { Pokemon } from '../adapters/pokemon.adapter';

function createPokemonFetchServiceStore() {
	
    const isLoading = writable(false);
    const hasError = writable(false);
    const pokemon = writable(null);

    const fetchPokemonByName = async (name) => {
        try {
            isLoading.set(true);

            let data = null;

            const lowerCasedName = String(name).toLowerCase();
            
            const key = generateKey(`fetchPokemonByName_${lowerCasedName}`);
            data = getItemWithExpirationTime(key);

            if(data) {
                pokemon.set(new Pokemon(data));
                return;
            }

            data = await getPokemonByName(lowerCasedName);
            pokemon.set(new Pokemon(data));
            setItemWithExpirationTime(key, data);
        } catch {
            hasError.set(true);
        } finally {
            isLoading.set(false);
        }
    }

    return {
		isLoading,
        hasError,
        pokemon,
        fetchPokemonByName,
        reset: () => {
            isLoading.set(false);
            hasError.set(false);
            pokemon.set(null);
        },
	};
}

export const pokemonFetchServiceStore = createPokemonFetchServiceStore();
