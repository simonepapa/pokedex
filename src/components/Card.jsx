import { Link } from "react-router-dom"
import styled from "styled-components"
import Type from "./Type"

const Container = styled(Link)`
  text-decoration: none;
  color: #000;
  background: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  padding: 16px 8px;
  width: 120px;
  margin: 8px 8px;
  transition: background 0.1s linear;

  @media (min-width: 1200px) {
    width: 234px;
  }

  &:hover {
    background: rgba(217, 217, 217, 0.75);
  }
`

const Number = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 700;

  @media (min-width: 1200px) {
    font-size: 21px;
  }
`

const Name = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 700;

  @media (min-width: 1200px) {
    font-size: 18px;
  }
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Sprite = styled.img`
  display: block;
  max-width: 100%;
  width: auto;
  height: 90px;
  margin: 8px auto;

  @media (min-width: 1200px) {
    height: 182px;
  }
`

const CustomType = styled(Type)`
  font-size: 10px;
  padding: 4px 4px;

  @media (min-width: 1200px) {
    font-size: 16px;
    padding: 4px 8px;
  }
`

function Card({ pokemon }) {
  return (
    <Container to={`${pokemon.id}`}>
      <Number>N° {pokemon.id.toString().padStart(3, "0")}</Number>
      <Sprite
        src={
          pokemon.sprites.other.home.front_default !== null
            ? pokemon.sprites.other.home.front_default
            : pokemon.sprites.other.dream_world.front_default !== null
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.other["official-artwork"].front_default !== null
            ? pokemon.sprites.other["official-artwork"]
            : pokemon.sprites.front_default
        }
        alt={`Sprite of ${pokemon.species.name}`}
        title={`Sprite of ${pokemon.species.name}`}
      />
      <Name>
        {pokemon.species.name.charAt(0).toUpperCase() + pokemon.species.name.slice(1)}
      </Name>
      <Grid>
        {pokemon.types.map((type) => (
          <CustomType key={`${pokemon.id} + ${type.type.name}`} type={type.type} />
        ))}
      </Grid>
    </Container>
  )
}

export default Card
