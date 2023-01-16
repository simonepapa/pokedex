import { useMemo } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { useGetPokemonByIdQuery } from "../features/api/apiSlice"
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

const Info = styled.div`
  display: flex;
  width: 95%;
  margin: 0 auto;
`
const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin-right: 8px;
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
`

const Right = styled.div`
  width: 60%;
  margin-left: 8px;
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  padding: 8px 24px;
`

const Sprite = styled.img`
  max-width: 100%;
  width: auto;
  height: 90%;
`

const Description = styled.p`
  font-size: 18px;
`

function Pokemon() {
  const params = useParams()

  const {
    data: pokemon = [],
    isLoading,
    isSuccess,
    isError,
    isFetching,
    message,
    refetch,
  } = useGetPokemonByIdQuery(params.pokemon)

  if (isError) {
    toast.error(message)
  } else if (isSuccess) {
    console.log(pokemon)
  }

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )
  }

  return (
    <Content>
      {!isLoading ? (
        <Info>
          <Left>
            <Sprite
              src={
                pokemon.pokemon.sprites.other.dream_world.front_default !== null
                  ? pokemon.pokemon.sprites.other.dream_world.front_default
                  : pokemon.pokemon.sprites.other.home.front_default
              }
              alt={`Sprite of ${pokemon.pokemon.name}`}
            />
          </Left>
          <Right>
            <Description>{pokemon.pokemonSpecies.flavor_text_entries[0].flavor_text}</Description>
          </Right>
        </Info>
      ) : (
        <Spinner />
      )}
    </Content>
  )
}

export default Pokemon
