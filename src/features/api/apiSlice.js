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
        const list = await fetchWithBQ("generation/1")
        if (list.error)
          return {
            error: list.error,
          }
        let results = []
        for await (const pokemon of list.data.pokemon_species) {
          const result = await fetchWithBQ(`pokemon/${pokemon.name}`)
          results = [...results, result.data];
        }
        //list.data.pokemon_species.map(async (e) => {
        //  const pokemon = await fetchWithBQ(`pokemon/${e.name}`)
        //  result = [...result, pokemon.data];
        //})
        //console.log(result)
        return { data: results }
      },
    }),
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

export const {
  useGetGenQuery,
  useGetPokemonByGenQuery,
  useGetPokemonByNameQuery,
} = apiSlice
