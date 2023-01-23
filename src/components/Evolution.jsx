import { Link } from "react-router-dom"
import styled from "styled-components"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import Type from "./Type"

const Container = styled.div`
  margin: 0 32px 32px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SpriteContainer = styled.div`
  border-radius: 50%;
  width: fit-content;
`
const Sprite = styled.img`
  width: 100%;
  max-height: 80px;
  height: 100%;

  @media (min-width: 1200px) {
    max-height: 100px;
  }
`

const Name = styled.h3`
  margin: 0;
  font-size: 16px;

  @media (min-width: 1200px) {
    font-size: 18px;
  }
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`

function Evolution({ pokemon, currentLanguage }) {
  return (
    <Container>
      <SpriteContainer>
        <Zoom>
          <Sprite
            src={
              pokemon.sprites.other.home.front_default !== null
                ? pokemon.sprites.other.home.front_default
                : pokemon.sprites.other.dream_world.front_default !== null
                ? pokemon.sprites.other.dream_world.front_default
                : pokemon.sprites.other["official-artwork"].front_default !==
                  null
                ? pokemon.sprites.other["official-artwork"]
                : pokemon.sprites.front_default
            }
            title={`Sprite of ${
              pokemon.names.find((e) => e.language.name === "en").name
            }`}
            alt={`Sprite of ${
              pokemon.names.find((e) => e.language.name === "en").name
            }`}
          />
        </Zoom>
      </SpriteContainer>
      <Name>
        {`#${pokemon.number.toString().padStart(3, "0")} ${
          pokemon.names.find((e) => e.language.name === currentLanguage) !==
          undefined
            ? pokemon.names.find((e) => e.language.name === currentLanguage)
                .name
            : pokemon.names.find((e) => e.language.name === "en").name
        }`}
      </Name>
      <Grid>
        {pokemon.types.map((type) => (
          <Type key={`${pokemon.id} + ${type.type.name}`} type={type.type} />
        ))}
      </Grid>
    </Container>
  )
}

export default Evolution
