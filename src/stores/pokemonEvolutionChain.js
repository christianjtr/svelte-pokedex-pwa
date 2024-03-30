import { writable } from 'svelte/store';
import { fetchDataGivenURL, getPokemonByName } from '../services/apis/pokemon/pokemon';
import { Pokemon } from '../adapters/pokemon.adapter';
import { generateKey, setItemWithExpirationTime, getItemWithExpirationTime } from '../services/localStorage/localStorage.services';

function createPokemonEvolutionChainStore() {
	
    const isLoading = writable(false);
    const hasError = writable(false);
    const pokemonEvolutions = writable(null);

    const getEvolutions = (data, evolutions = []) => {
        if(data.evolves_to.length === 0) {
            return evolutions;
        }

        const baseSpecies = data.species;
        if(!evolutions.map(({ name }) => name).includes(baseSpecies.name)) {
            evolutions.push({...baseSpecies});    
        }

        const [evolution] = data.evolves_to;
        const { species } = evolution;
        
        evolutions.push({ ...species });
        
        getEvolutions(evolution, evolutions);
      
        return evolutions;
    }
      
    const fetchPokemonEvolutions = async (name, speciesURL) => {
        try {
            isLoading.set(true);

            let data = null;
            
            const key = generateKey(`fetchPokemonEvolutions_${name}`);
            data = getItemWithExpirationTime(key);

            if(data) {
                pokemonEvolutions.set(data.map((pokemon) => new Pokemon(pokemon)));
                return;
            }

            const speciesResponse = await fetchDataGivenURL(speciesURL);
            const { evolution_chain: { url: evolutionChangeURL }} = speciesResponse;
            
            const evolutionChainResponse = await fetchDataGivenURL(evolutionChangeURL);
            const { chain: evolutionChain } = evolutionChainResponse;

            const evolutions = getEvolutions(evolutionChain);

            const promises = evolutions.map(({ name }) => () => getPokemonByName(name));
            data = await Promise.all(promises.map((fn) => fn()));

            pokemonEvolutions.set(data.map((pokemon) => new Pokemon(pokemon)));
            setItemWithExpirationTime(key, data);
                
        } catch(error) {
            hasError.set(true);
        } finally {
            isLoading.set(false);
        }
    }

    return {
		isLoading,
        hasError,
        pokemonEvolutions,
        fetchPokemonEvolutions,
        reset: () => {
            isLoading.set(false);
            hasError.set(false);
            evolutionChain.set(null);
        },
	};
}

export const pokemonEvolutionChainStore = createPokemonEvolutionChainStore();
