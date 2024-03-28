import { writable } from 'svelte/store';
import { fetchDataGivenURL } from '../services/apis/pokemon/pokemon';
import { generateKey, setItemWithExpirationTime, getItemWithExpirationTime } from '../services/localStorage/localStorage.services';
import { PokemonDescription } from '../adapters/pokemon.adapter';

function createPokemonDescriptionStore() {
	
    const isLoading = writable(false);
    const hasError = writable(false);
    const description = writable(null);

    const fetchPokemonDescription = async (name, url) => {
        try {
            isLoading.set(true);

            let data = null;
            
            const key = generateKey(`fetchPokemonDescription_${name}`);
            data = getItemWithExpirationTime(key);

            if(data) {
                description.set(new PokemonDescription(data));
                return;
            }

            const response = await fetchDataGivenURL(url);
            description.set(new PokemonDescription(response));
            setItemWithExpirationTime(key, response);
        } catch {
            hasError.set(true);
        } finally{
            isLoading.set(false);
        }
    }

    return {
		description,
        fetchPokemonDescription,
        reset: () => {
            isLoading.set(false),
            hasError.set(false),
            description.set(null)
        },
	};
}

export const pokemonDescriptionStore = createPokemonDescriptionStore();
