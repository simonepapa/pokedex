import { useParams } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"
import styled from "styled-components"
import Team from "../components/Team"
import Box from "../components/Box"

const Content = styled.div`
  max-width: 1200px;
  width: 95vw;
  margin: 8px auto 0 auto;
  background-color: #ababab;
  padding: 16px;

  h2 {
    margin: 36px 0 24px 76px;
  }
`

function Storage() {
  const params = useParams()

  const [team] = useLocalStorage("team")
  const [box] = useLocalStorage("boxes")

  return (
    <main>
      <Content>
        {team && <Team team={team} number={params.number - 1} box={box[params.number - 1]} />}
      </Content>
      <Content>
        {box && <Box number={params.number - 1} box={box[params.number - 1]} />}
      </Content>
    </main>
  )
}

export default Storage
