import queryString from 'query-string';
import { API_CONFIG } from './api.config';

const getPokemonResources = async (limit = 10) => {
    try {
        const query = queryString.stringify({ limit });

        const response = await fetch(`${API_CONFIG.BASE_URL}/pokemon/?${query}`);
        const pokemons = await response.json();
        return pokemons;
    } catch(error) {
        throw new Error(error);
    }

}

const getPokemonByName = async (name) => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/pokemon/${name}`);
        const pokemon = await response.json();
        return pokemon;
    } catch(error) {
        throw new Error(error);
    }
}

const getTypes = async () => {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/type`);
        const types = await response.json();
        return types;
    } catch(error) {
        throw new Error(error);
    }
}

const fetchDataGivenURL = async (url) => {
    try {
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch(error) {
        throw new Error(error);
    }
}

export {
    getPokemonResources,
    getPokemonByName,
    getTypes,
    fetchDataGivenURL,
}
