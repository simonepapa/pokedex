import styled from "styled-components"
import Type from "./Type"

const Container = styled.div`
  text-decoration: none;
  color: #000;
  background: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  padding: 16px 8px;
  width: 234px;
  margin: 8px 8px;
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

function AlternativeCard({ pokemon }) {
  return (
    <Container to={`${pokemon.id}`}>
      <Sprite
        src={
          pokemon.sprites.hasOwnProperty('other') && pokemon.sprites.other.dream_world.front_default !== null
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.hasOwnProperty('other') && pokemon.sprites.other.home.front_default !== null
            ? pokemon.sprites.other.home.front_default
            : pokemon.sprites.hasOwnProperty('other') && pokemon.sprites.other["official-artwork"].front_default !== null 
            ? pokemon.sprites.other["official-artwork"].front_default
            : pokemon.sprites.front_default
        }
        alt={`Sprite of ${pokemon.name}`}
        title={`Sprite of ${pokemon.name.replace(/-/g, " ").replace(/(^\w|\s\w)/g, m => m.toUpperCase())}`}
      />
      <Name>
        {pokemon.name.replace(/-/g, " ").replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
      </Name>
      <Grid>
        {pokemon.types.map((type) => (
          <Type key={`${pokemon.id} + ${type.type.name}`} type={type.type} />
        ))}
      </Grid>
    </Container>
  )
}

export default AlternativeCard
