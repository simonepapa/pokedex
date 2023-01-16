import styled from "styled-components"
import Type from "./Type"

const Container = styled.div`
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
  width: auto;
  height: 182px;
  margin: 8px auto;
`

function Card({ pokemon }) {
  return (
    <Container>
      <Number>N° {pokemon.id.toString().padStart(3, '0')}</Number>
      <Sprite src={pokemon.sprites.other.dream_world.front_default} alt={`Dream World sprite of ${pokemon.name}`} />
      <Name>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</Name>
      <Grid>
        {pokemon.types.map((type) => (
          <Type type={type.type} />
        ))}
      </Grid>
    </Container>
  )
}

export default Card
