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
          results = [...results, result.data]
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
        const pokemon = await fetchWithBQ(`pokemon/${_arg}`)
        const pokemonSpecies = await fetchWithBQ(`pokemon-species/${_arg}`)
        const evolutionChain = await fetchWithBQ(`evolution-chain/${pokemonSpecies.data.evolution_chain.url.slice(42)}`)
        const firstStagePokemon = await fetchWithBQ(`pokemon/${evolutionChain.data.chain.species.url.slice(42)}`)    
        const firstStagePokemonSpecies = await fetchWithBQ(`pokemon-species/${evolutionChain.data.chain.species.url.slice(42)}`)     
        console.log(evolutionChain.data)
        for await (const evolution of evolutionChain.data.chain.evolves_to) {
          let thirdStage = {}
          for (let i = 0; i < evolution.evolves_to.length; i++) {
            const pokemon = await fetchWithBQ(`pokemon/${evolution.evolves_to[i].species.url.slice(42)}`)    
            const pokemonSpecies = await fetchWithBQ(`pokemon-species/${evolution.evolves_to[i].species.url.slice(42)}`)   
            thirdStage = {names: pokemonSpecies.data.names, sprites: pokemon.data.sprites, types: pokemon.data.types}
          }
          const secondStagePokemon = await fetchWithBQ(`pokemon/${evolution.species.url.slice(42)}`)    
          const secondStagePokemonSpecies = await fetchWithBQ(`pokemon-species/${evolution.species.url.slice(42)}`)     
          const secondStage = {names: secondStagePokemonSpecies.data.names, sprites: secondStagePokemon.data.sprites, types: secondStagePokemon.data.types}
          evolutions = [...evolutions, {names: firstStagePokemonSpecies.data.names, sprites: firstStagePokemon.data.sprites, types: firstStagePokemon.data.types, secondStage: secondStage, thirdStage: thirdStage }]
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
            pokemon: pokemon.data,
            pokemonSpecies: pokemonSpecies.data,
            evolutionChain: evolutions,
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
