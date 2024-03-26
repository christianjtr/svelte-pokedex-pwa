import { writable } from 'svelte/store';
import { getTypes } from '../services/apis/pokemon/pokemon';
import { PaginatedGroup } from '../adapters/pokemon.adapter';
import { generateKey, setItemWithExpirationTime, getItemWithExpirationTime } from '../services/localStorage/localStorage.services';

function createPokemonTypeFetchServiceStore() {
	
    const isLoading = writable(false);
    const hasError = writable(false);
    const types = writable([]);

    const fetchPokemonTypes = async () => {
        try {
            isLoading.set(true);

            let data = null;
            
            const key = generateKey("fetchPokemonTypes");
            data = getItemWithExpirationTime(key);

            if(data) {
                types.set(data);
                return;
            }

            data = await getTypes();
            const paginatedGroup = new PaginatedGroup(data);
            types.set(paginatedGroup.getGroupResources());
            setItemWithExpirationTime(key, paginatedGroup.getGroupResources());
                
        } catch {
            hasError.set(true);
        } finally {
            isLoading.set(false);
        }
    }

    return {
		isLoading,
        hasError,
        types,
        fetchPokemonTypes,
        reset: () => {
            isLoading.set(false);
            hasError.set(false);
            types.set(null);
        },
	};
}

export const pokemonTypeFetchServiceStore = createPokemonTypeFetchServiceStore();
