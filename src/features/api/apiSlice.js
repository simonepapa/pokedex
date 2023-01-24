import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getGen: builder.query({
      query: (generation) => `generation/${generation}`,
    }),
    getPokemonByGen: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        let results = []
        const list = await fetchWithBQ(`generation/${_arg}`)
        if (list.error)
          return {
            error: list.error,
          }
        for await (const pokemon of list.data.pokemon_species) {
          const result = await fetchWithBQ(`pokemon/${pokemon.url.slice(42)}`)
          results = [
            ...results,
            {
              id: result.data.id,
              sprites: result.data.sprites,
              species: result.data.species,
              types: result.data.types,
            },
          ]
        }
        return { data: results }
      },
    }),
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonById: builder.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        let evolutions = []
        let forms = []
        const pokemon = await fetchWithBQ(`pokemon/${_arg}`)
        const pokemonSpecies = await fetchWithBQ(`pokemon-species/${_arg}`)
        const evolutionChain = await fetchWithBQ(
          `evolution-chain/${pokemonSpecies.data.evolution_chain.url.slice(42)}`
        )
        const firstStagePokemon = await fetchWithBQ(
          `pokemon/${evolutionChain.data.chain.species.url.slice(42)}`
        )
        const firstStagePokemonSpecies = await fetchWithBQ(
          `pokemon-species/${evolutionChain.data.chain.species.url.slice(42)}`
        )

        // Get evolution chain
        for await (const evolution of evolutionChain.data.chain.evolves_to) {
          // Get second stage
          const secondStagePokemon = await fetchWithBQ(
            `pokemon/${evolution.species.url.slice(42)}`
          )
          const secondStagePokemonSpecies = await fetchWithBQ(
            `pokemon-species/${evolution.species.url.slice(42)}`
          )
          for (let i = 0; i < evolution.evolution_details.length; i++) {
            if (evolution.evolution_details[i].held_item !== null) {
              const item = await fetchWithBQ(
                `item/${evolution.evolution_details[i].held_item.url.slice(31)}`
              )
              evolution.evolution_details[i].held_item = {
                ...evolution.evolution_details[i].held_item,
                ...item.data,
              }
            }
            if (evolution.evolution_details[i].item !== null) {
              const item = await fetchWithBQ(
                `item/${evolution.evolution_details[i].item.url.slice(31)}`
              )
              evolution.evolution_details[i].item = {
                ...evolution.evolution_details[i].item,
                ...item.data,
              }
            }
          }
          const secondStage = {
            number: secondStagePokemon.data.id,
            names: secondStagePokemonSpecies.data.names,
            sprites: secondStagePokemon.data.sprites,
            types: secondStagePokemon.data.types,
            evolution_details: { details: evolution.evolution_details },
          }

          // Get third stage
          let thirdStage = {}
          for (let i = 0; i < evolution.evolves_to.length; i++) {
            const pokemon = await fetchWithBQ(
              `pokemon/${evolution.evolves_to[i].species.url.slice(42)}`
            )
            const pokemonSpecies = await fetchWithBQ(
              `pokemon-species/${evolution.evolves_to[i].species.url.slice(42)}`
            )
            if (
              evolution.evolves_to[i].evolution_details[0].held_item !== null
            ) {
              const thirdStageItem = await fetchWithBQ(
                `item/${evolution.evolves_to[
                  i
                ].evolution_details[0].held_item.url.slice(31)}`
              )
              evolution.evolves_to[i].evolution_details[0].held_item = {
                ...evolution.evolves_to[i].evolution_details[0].held_item,
                ...thirdStageItem.data,
              }
            }
            if (evolution.evolves_to[i].evolution_details[0].item !== null) {
              const thirdStageItem = await fetchWithBQ(
                `item/${evolution.evolves_to[
                  i
                ].evolution_details[0].item.url.slice(31)}`
              )
              evolution.evolves_to[i].evolution_details[0].item = {
                ...evolution.evolves_to[i].evolution_details[0].item,
                ...thirdStageItem.data,
              }
            }
            thirdStage = {
              number: pokemon.data.id,
              names: pokemonSpecies.data.names,
              sprites: pokemon.data.sprites,
              types: pokemon.data.types,
              evolution_details: {
                details: evolution.evolves_to[i].evolution_details,
              },
            }

            evolutions = [
              ...evolutions,
              {
                number: firstStagePokemon.data.id,
                names: firstStagePokemonSpecies.data.names,
                sprites: firstStagePokemon.data.sprites,
                types: firstStagePokemon.data.types,
                secondStage: secondStage,
                thirdStage: thirdStage,
              },
            ]
          }
          if (evolution.evolves_to.length === 0) {
            evolutions = [
              ...evolutions,
              {
                number: firstStagePokemon.data.id,
                names: firstStagePokemonSpecies.data.names,
                sprites: firstStagePokemon.data.sprites,
                types: firstStagePokemon.data.types,
                secondStage: secondStage,
                thirdStage: thirdStage,
              },
            ]
          }
        }

        // Get different forms
        for await (const form of pokemonSpecies.data.varieties) {
          if (!form.is_default) {
            const alternative = await fetchWithBQ(
              `pokemon/${form.pokemon.url.slice(34)}`
            )
            forms = [
              ...forms,
              {
                id: alternative.data.id,
                sprites: alternative.data.sprites,
                name: alternative.data.name,
                types: alternative.data.types,
              },
            ]
          }
        }
        if (pokemon.data.forms > 1) {
          for await (const form of pokemon.data.forms) {
            const alternative = await fetchWithBQ(
              `pokemon-form/${form.url.slice(39)}`
            )
            forms = [
              ...forms,
              {
                id: alternative.data.id,
                sprites: alternative.data.sprites,
                name: alternative.data.name,
                types: alternative.data.types,
              },
            ]
          }
        }

        if (pokemon.error)
          return {
            error: pokemon.error,
          }
        if (pokemonSpecies.error)
          return {
            error: pokemonSpecies.error,
          }
        return {
          data: {
            pokemon: {
              id: pokemon.data.id,
              sprites: pokemon.data.sprites,
              name: pokemon.data.name,
              height: pokemon.data.height,
              weight: pokemon.data.weight,
              abilities: pokemon.data.abilities,
              types: pokemon.data.types,
              stats: pokemon.data.stats,
            },
            pokemonSpecies: {
              gender_rate: pokemonSpecies.data.gender_rate,
              names: pokemonSpecies.data.names,
              has_gender_differences: pokemonSpecies.data.has_gender_differences,
              generation: pokemonSpecies.data.generation,
              flavor_text_entries: pokemonSpecies.data.flavor_text_entries,
              genera: pokemonSpecies.data.genera,
              shape: pokemonSpecies.data.shape,
              habitat: pokemonSpecies.data.habitat,
              is_baby: pokemonSpecies.data.is_baby,
              is_legendary: pokemonSpecies.data.is_legendary,
              is_mythical: pokemonSpecies.data.is_mythical,
            },
            evolutionChain: evolutions,
            forms: forms,
          },
        }
      },
    }),
  }),
})

export const {
  useGetGenQuery,
  useGetPokemonByGenQuery,
  useGetPokemonByNameQuery,
  useGetPokemonByIdQuery,
} = apiSlice
