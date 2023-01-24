import styled from "styled-components"

const Container = styled.div`
  background-color: #d75050;
  height: fit-content;
  padding: 8px 0 0 0;
  margin: 32px 0 0 0;

  p {
    font-size: 14px;
    margin: 0 0 8px 0;
  }
`

const Content = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

function Footer() {
  return (
    <Container>
      <Content>
        <p>Website by <a href="https://github.com/simonepapa">Simone Papa</a>, API from <a href="https://pokeapi.co/">Pokéapi</a>.</p>
        <p>All content is &copy; Nintendo, Game Freak and The Pokemon Company. Pokémon and Pokémon character names are trademarks of Nintendo.</p>
      </Content>
    </Container>
  )
}

export default Footer