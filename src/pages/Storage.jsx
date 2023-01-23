import { useParams } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"
import styled from "styled-components"
import Sortable, { Swap } from "sortablejs"
import Team from "../components/Team"
import Box from "../components/Box"
import Release from "../components/Release"

Sortable.mount(new Swap())

const Content = styled.div`
  width: 90vw;
  margin: 8px auto 0 auto;
  background-color: #ababab;
  padding: 8px;

  h2 {
    font-size: 18px;
    margin: 8px 0 8px 8px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
    width: 95vw;
    padding: 16px;

    h2 {
      font-size: 24px;
      margin: 36px 0 24px 76px;
    }
  }
`

function Storage() {
  const params = useParams()

  const [team] = useLocalStorage("team")
  const [box] = useLocalStorage("boxes")

  return (
    <main>
      <Content>
        <Release number={params.number} />
      </Content>
      <Content>
        {team && (
          <Team team={team} number={params.number} box={box[params.number]} />
        )}
      </Content>
      <Content>
        {box && (
          <Box number={params.number} box={box[params.number]} team={team} />
        )}
      </Content>
    </main>
  )
}

export default Storage
