class PaginatedGroup {
    constructor(paginatedGroup) {
        this.paginatedGroup = paginatedGroup;
    }

    getGroupResources() {
        if(!this.paginatedGroup.results) return [];
        
        const groupResources = this.paginatedGroup.results.map(({ name, url }) => ({
            name, url
        }));

        return groupResources;
    }
}

class Pokemon {
    constructor(pokemon) {
        this.pokemon = pokemon;
    }

    get() {
        const pokemon = {
            id: this.pokemon.id,
            name: this.pokemon.name,
            types: this.pokemon.types.map(({ type }) => type.name),
            cries: this.pokemon.cries,
            image: this.pokemon.sprites.other.dream_world.front_default,
            officialArt: this.pokemon.sprites.other["official-artwork"].front_default,
            experience: this.pokemon.base_experience,
            weight: this.pokemon.weight,
            height: this.pokemon.height
        }

        return pokemon;
    }
}

export {
    PaginatedGroup,
    Pokemon
}
