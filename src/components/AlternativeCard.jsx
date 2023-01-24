import styled from "styled-components"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import Type from "./Type"

const Container = styled.div`
  text-decoration: none;
  color: #000;
  background: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  padding: 16px 8px;
  width: 120px;
  margin: 8px 8px;

  @media (min-width: 1200px) {
    width: 234px;
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

function AlternativeCard({ pokemon }) {
  return (
    <Container>
      <Zoom>
        <Sprite
          src={
            pokemon.sprites.hasOwnProperty("other") && pokemon.sprites.other.home.front_default !== null
              ? pokemon.sprites.other.home.front_default
              : pokemon.sprites.hasOwnProperty("other") && pokemon.sprites.other.dream_world.front_default !== null
              ? pokemon.sprites.other.dream_world.front_default
              : pokemon.sprites.hasOwnProperty("other") && pokemon.sprites.other["official-artwork"].front_default !== null
              ? pokemon.sprites.other["official-artwork"].front_default
              : pokemon.sprites.front_default
          }
          alt={`Sprite of ${pokemon.name}`}
          title={`Sprite of ${pokemon.name
            .replace(/-/g, " ")
            .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}`}
        />
      </Zoom>
      <Name>
        {pokemon.name
          .replace(/-/g, " ")
          .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
      </Name>
      <Grid>
        {pokemon.types.map((type) => (
          <CustomType key={`${pokemon.id} + ${type.type.name}`} type={type.type} />
        ))}
      </Grid>
    </Container>
  )
}

export default AlternativeCard
