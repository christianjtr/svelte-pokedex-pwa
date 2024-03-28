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
            height: this.pokemon.height,
            species: this.pokemon.species,
        }

        return pokemon;
    }

    getAbilities() {
        const abilities = this.pokemon.abilities.map((item) => item.ability.name);
        return abilities;
    }
    
    getStats() {
        const stats = this.pokemon.stats.map((item) => ({
            value: item.base_stat,
            key: item.stat.name
        }));

        return stats;
    }

    getMoves() {
        const uniqueMoves = new Set(this.pokemon.moves.map((item) => item.move.name));
        return Array.from(uniqueMoves);
    }
}

class PokemonDescription {
    constructor(description) {
        this.description = description;
    }

    get(language = "en") {
        const description = {
            baseHappiness: this.description.base_happiness,
            growthRate: this.description.growth_rate.name,
            habitat: this.description.habitat.name,
            shape: this.description.shape.name,
            descriptions: this.description.flavor_text_entries
            .filter((description) => description.language.name === language)
            .map(({flavor_text, version}) => ({text: flavor_text, version: version.name}))
        }

        return description;

    }
}

export {
    PaginatedGroup,
    Pokemon,
    PokemonDescription
}
