import { writable, get } from 'svelte/store';
import { getPokemonResources, fetchDataGivenURL } from '../services/apis/pokemon/pokemon';
import { PaginatedGroup, Pokemon } from '../adapters/pokemon.adapter';
import { generateKey, setItemWithExpirationTime, getItemWithExpirationTime } from '../services/localStorage/localStorage.services';
import { getPaginatedQueryString } from '../utils/queryString';

function createPokemonListFetchServiceStore() {
	
    const isLoading = writable(false);
    const hasError = writable(false);
    const hasPokemons = writable(false);
    const pokemons = writable([]);
    const nextUrl = writable(null);
    
    const fetchPaginated = async (limit, offset) => {
        try {
            const data = await getPokemonResources(limit, offset);
            const paginatedGroup = new PaginatedGroup(data);
            return {
                resources: paginatedGroup.getGroupResources(),
                nextUrl: paginatedGroup.getNextUrl()
            };
        } catch {
            hasError.set(true);
        } 
    }

    const fetchPokemons = async (limit = 10, offset = 0) => {
        try {
            isLoading.set(true);

            let data = null;

            const qs = getPaginatedQueryString(get(nextUrl));
            
            const key = generateKey(`fetchPokemons_${qs || ''}`);
            data = getItemWithExpirationTime(key);

            if(data) {
                const { pokemonCollection, nextUrlSourceLink } = data;
                hasPokemons.set(pokemonCollection.length > 0);
                pokemons.set(pokemonCollection);
                nextUrl.set(nextUrlSourceLink);
                return;
            }

            const { resources, nextUrl: nextUrlSourceLink } = await fetchPaginated(limit, offset);
            
            const promises = resources.map(({ url }) => () => fetchDataGivenURL(url));
            const results = await Promise.all(promises.map((fn) => fn()));
            
            const pokemonCollection = results.map((item) => new Pokemon(item).get());
            hasPokemons.set(pokemonCollection.length > 0);
            
            
            pokemons.update(prevPokemons => [...prevPokemons, ...pokemonCollection]);
            nextUrl.set(nextUrlSourceLink);

            setItemWithExpirationTime(key, { pokemonCollection, nextUrlSourceLink });
        } catch(error) {
            hasError.set(true);
            throw(error);
        } finally{
            isLoading.set(false);
        }
    }

    return {
		isLoading,
        hasError,
        pokemons,
        hasPokemons,
        nextUrl,
        fetchPokemons,
        reset: () => {
            isLoading.set(false);
            hasError.set(false);
            pokemons.set([]);
            nextUrl.set(null);
        },
	};
}

export const pokemonListFetchServiceStore = createPokemonListFetchServiceStore();
