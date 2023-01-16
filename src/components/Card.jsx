import { Link } from "react-router-dom"
import styled from "styled-components"
import Type from "./Type"

const Container = styled(Link)`
  text-decoration: none;
  color: #000;
  background: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  padding: 16px 8px;
  width: 234px;
  margin: 8px 8px;
`

const Number = styled.h3`
  margin: 0;
  font-size: 21px;
  font-weight: 700;
`

const Name = styled.p`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Sprite = styled.img`
  display: block;
  max-width: 100%;
  width: auto;
  height: 182px;
  margin: 8px auto;
`

function Card({ pokemon }) {
  return (
    <Container to={`${pokemon.id}`}>
      <Number>N° {pokemon.id.toString().padStart(3, "0")}</Number>
      <Sprite
        src={
          pokemon.sprites.other.dream_world.front_default !== null
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.other.home.front_default
        }
        alt={`Sprite of ${pokemon.name}`}
      />
      <Name>
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </Name>
      <Grid>
        {pokemon.types.map((type) => (
          <Type key={`${pokemon.id} + ${type.type.name}`} type={type.type} />
        ))}
      </Grid>
    </Container>
  )
}

export default Card
