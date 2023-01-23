import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import styled from "styled-components"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navigation from "./components/Navigation"
import Pokedex from "./pages/Pokedex"
import Storage from "./pages/Storage"
import Pokemon from "./pages/Pokemon"
import Footer from "./components/Footer"

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`

function App() {
  return (
    <div>
      <Router>
        <Navigation />
        <Container>
          <Routes>
            <Route path="/" element={<Navigate replace to="/pokedex" />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokedex/:pokemon" element={<Pokemon />} />
            <Route path="/storage/:number" element={<Storage />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App
