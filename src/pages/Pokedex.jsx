import styled from "styled-components"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import {
  useGetPokemonByGenQuery,
  useGetPokemonByNameQuery,
} from "../features/api/apiSlice"
import Card from "../components/Card"

const Content = styled.main`
  max-width: 1200px;
  width: 95vw;
  margin: 8px auto 0 auto;
  background-color: #ababab;
  padding: 16px;
`

const Grid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

function Pokedex() {
  const {
    data: list,
    isLoading: isLoadingList,
    isSuccess: isSuccessList,
    isError: isErrorList,
    message: messageList,
  } = useGetPokemonByGenQuery("1")

  if (isLoadingList) {
    return <Spinner />
  } else if (isErrorList) {
    toast.error(messageList)
  } else if (isSuccessList) {
    console.log(list)
  }

  return (
    <Content>
      <Grid>
        {list.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </Grid>
    </Content>
  )
}

export default Pokedex
