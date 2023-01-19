import { NavLink } from "react-router-dom"
import styled from "styled-components"

const Navbar = styled.div`
  background-color: #d75050;
  height: 60px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  width: 95vw;
  height: 60px;
  margin: 0 auto;
`

const Logo = styled.p`
  font-size: 24px;
  margin-left: 0;
`

const Links = styled.div``

const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  font-size: 18px;
  margin: 0 16px;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: 700;
  }
`

function Navigation() {
  return (
    <Navbar>
      <Container>
        <Logo className="font-pokemon">Poké Navigator</Logo>
        <Links>
          <CustomNavLink to="/pokedex">Pokédex</CustomNavLink>
          <CustomNavLink to="/storage">Storage</CustomNavLink>
        </Links>
      </Container>
    </Navbar>
  )
}

export default Navigation
