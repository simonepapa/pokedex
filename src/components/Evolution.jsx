import styled from "styled-components"
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
  max-height: 100px;
  height: 100%;
`

const Name = styled.h3`
  margin: 0;
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`

function Evolution({ pokemon, currentLanguage }) {
  return (
    <Container>
      <SpriteContainer>
        <Sprite
          src={
            pokemon.sprites.other.dream_world.front_default !== null
              ? pokemon.sprites.other.dream_world.front_default
              : pokemon.sprites.other.home.front_default
          }
          title={`Sprite of ${
            pokemon.names.find((e) => e.language.name === currentLanguage).name
          }`}
          alt={`Sprite of ${
            pokemon.names.find((e) => e.language.name === currentLanguage).name
          }`}
        />
      </SpriteContainer>
      <Name>
        {pokemon.names.find((e) => e.language.name === currentLanguage).name}
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
