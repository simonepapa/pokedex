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
        const pokemon = await fetchWithBQ(`pokemon/${_arg}`)
        const pokemonSpecies = await fetchWithBQ(`pokemon-species/${_arg}`)
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
