import { writable, get } from 'svelte/store';

function createPokemonListFilterStore() {
	
    const filters = writable({
        types: []
    });

    const toggleTypeFilter = (type) => {
        
        if(get(filters).types.includes(type)) {
            filters.update((prevFilters) => ({
                ...prevFilters,
                types: prevFilters.types.filter((typeFilter) => typeFilter !== type)
            }));

            return;
        }
        
        filters.update((prevFilters) => ({
            ...prevFilters,
            types: [...prevFilters.types, type]
        }));
    }

    return {
		filters,
        toggleTypeFilter,
        reset: () => {
            filters.set({
                types: []
            });
        },
	};
}

export const pokemonListFilterStore = createPokemonListFilterStore();
