import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { useGetPokemonByGenQuery } from "../features/api/apiSlice"
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

const SimpleFilters = styled.div`
  display: flex;
  justify-content: space-between;
`

const Generations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 16px 0 24px 76px;

  div {
    display: flex;
  }
`

const Generation = styled.p`
  font-size: 18px;
  margin: 0 16px 0 0;
  padding: 8px;
  background-color: rgba(217, 217, 217, 0.5);
  transition: background-color 0.1s linear;
  border-radius: 8px;

  &:hover:not(.active) {
    background-color: rgba(217, 217, 217, 0.8);
    cursor: pointer;
  }

  &.active {
    font-weight: 700;
  }
`

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  margin: 16px 76px 0 0;

  select {
    background-color: rgba(217, 217, 217, 0.5);
    border: none;
    border-radius: 8px;
    width: 150px;
    padding: 8px;
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
  } = useGetPokemonByGenQuery(
    searchParams.get("gen") !== null ? searchParams.get("gen") : "1"
  )

  const sortedPokemon = useMemo(() => {
    const sortedPokemon = list.slice()
    if (
      searchParams.get("order") === "asc" ||
      searchParams.get("order") === null
    ) {
      // Sort pokemon in ascending ID order
      sortedPokemon.sort(function (a, b) {
        return a.id - b.id
      })
    } else if (searchParams.get("order") === "desc") {
      // Sort pokemon in ascending ID order
      sortedPokemon.sort(function (a, b) {
        return b.id - a.id
      })
    } else if (searchParams.get("order") === "az") {
      sortedPokemon.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
    } else if (searchParams.get("order") === "za") {
      sortedPokemon.sort((a, b) => {
        if (a.name < b.name) {
          return 1
        }
        if (a.name > b.name) {
          return -1
        }
        return 0
      })
    }

    return sortedPokemon
  }, [list, searchParams.get("order")])

  const refreshGen = (e) => {
    setSearchParams((searchParams) => {
      searchParams.set("gen", e.target.childNodes[0].nodeValue)
      return searchParams
    })
  }

  const handleSelect = (e) => {
    setSearchParams((searchParams) => {
      searchParams.set("order", e.target.value)
      return searchParams
    })
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
      <SimpleFilters>
        <Generations>
          <h2>Generation</h2>
          <div>
            {generations.map((generation) => (
              <Generation
                onClick={(e) => refreshGen(e)}
                key={generation}
                className={
                  (generation.toString() === searchParams.get("gen") ||
                    (generation === 1 && searchParams.get("gen") === null)) &&
                  "active"
                }
              >
                {generation}
              </Generation>
            ))}
          </div>
        </Generations>
        <OrderList>
          <h2>Order</h2>
          <select onChange={handleSelect} defaultValue={"asc"}>
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
          </select>
        </OrderList>
      </SimpleFilters>
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
