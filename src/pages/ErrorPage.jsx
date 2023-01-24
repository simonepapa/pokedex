import { Link } from "react-router-dom"
import styled from "styled-components"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { useGetPokemonByNameQuery } from "../features/api/apiSlice"

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
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  border-radius: 8px;
  margin: 32px auto 32px auto;
  background-color: #ababab;
  padding: 8px;

  h1 {
    font-size: 24px;
    text-align: center;
    line-height: 32px;
  }
`

const Sprite = styled.img`
  height: 250px;
  width: auto;
  margin: 24px 0;
`

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 32px;

  a {
    margin: 0 12px;
    font-size: 16px;
    color: #000;

    &:hover {
      text-decoration: none;
    }
  }
`

function ErrorPage() {
  const {
    data: pokemon = [],
    isLoading,
    isError,
    message,
  } = useGetPokemonByNameQuery("meloetta-aria")

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )
  } else if (isError) {
    toast.error(message)
  }

  return (
    <Content>
      <h1 className="font-pokemon">Error 404<br/> Resource not found</h1>
      <Sprite
        src={pokemon.sprites.other.home.front_default}
        alt="Home sprite of Meloetta"
        title="Home sprite of Meloetta"
      />
      <Links>
        <Link to="/pokedex">Go to Pokédex</Link>
        <Link to="/storage/1">Go to Storage System</Link>
      </Links>
    </Content>
  )
}

export default ErrorPage
