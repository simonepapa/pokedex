import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import {
  useGetPokemonByGenQuery,
} from "../features/api/apiSlice"
import Card from "../components/Card"

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
`

const Content = styled.main`
  max-width: 1200px;
  width: 95vw;
  margin: 8px auto 0 auto;
  background-color: #ababab;
  padding: 16px;
`

const Generations = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px auto 24px auto;
`

const Generation = styled.p`
  font-size: 18px;
  margin: 0 12px;
  padding: 8px;
  background-color: rgba(217, 217, 217, 0.5);
  transition: background-color 0.1s linear;

  &:hover:not(.active) {
    background-color: rgba(217, 217, 217, 0.8);
    cursor: pointer;
  }

  &.active {
    font-weight: 700;
  }
`

const Grid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

function Pokedex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const generations = [1, 2, 3, 4, 5, 6, 7, 8]

  const {
    data: list = [],
    isLoading,
    isSuccess,
    isError,
    isFetching,
    message,
    refetch,
  } = useGetPokemonByGenQuery(
    searchParams.get("gen") !== null ? searchParams.get("gen") : 1
  )

  const sortedPokemon = useMemo(() => {
    const sortedPokemon = list.slice()
    // Sort pokemon in ascending ID order
    sortedPokemon.sort(function(a, b){return a.id-b.id});
    return sortedPokemon
  }, [list])

  const refreshGen = (e) => {
    setSearchParams({ gen: e.target.childNodes[0].nodeValue })
    refetch()
  }

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )
  } else if (isError) {
    toast.error(message)
  } else if (isSuccess) {
    console.log(list)
  }

  return (
    <Content>
      <Generations>
        {generations.map((generation) => (
          <Generation
            onClick={(e) => refreshGen(e)}
            key={generation}
            className={
              (generation.toString() === searchParams.get("gen") ||
                (generation === 1 &&
                  searchParams.get("gen") === null)) &&
              "active"
            }
          >
            {generation}
          </Generation>
        ))}
      </Generations>
      <Grid>
        {!isFetching ? (
          <>
            {sortedPokemon.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </>
        ) : (
          <Spinner />
        )}
      </Grid>
    </Content>
  )
}

export default Pokedex
