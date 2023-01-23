import styled from "styled-components"

const Container = styled.div``

const Name = styled.p`
  width: fit-content;
  padding: 4px 8px;
  font-size: 14px;
  background-color: var(--${(props) => props.type});
  margin: 4px 4px 0 0;
  border-radius: 8px;
  text-transform: uppercase;

  @media (min-width: 1200px) {
    font-size: 16px;
  }
`

function Type({ type, className, onClick }) {
  return (
    <Name
      onClick={onClick}
      type={type.name ? type.name : type}
      className={className}
    >
      {type.name ? type.name : type}
    </Name>
  )
}

export default Type
