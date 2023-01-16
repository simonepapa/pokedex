import styled from "styled-components"

const Container = styled.div`
  width: fit-content;
  padding: 4px 8px;
  background-color: var(--${(props) => props.type});
  margin: 4px 4px 0 0;
  border-radius: 8px;
`

const Name = styled.p`
  margin: 0;
  text-transform: uppercase;
`

function Type({ type }) {
  return (
    <Container type={type.name}>
      <Name>{type.name}</Name>
    </Container>
  )
}

export default Type
