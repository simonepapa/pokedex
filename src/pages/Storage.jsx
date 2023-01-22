import { useParams } from "react-router-dom"
import { useLocalStorage } from "../hooks/useLocalStorage"
import styled from "styled-components"
import Sortable, { Swap } from 'sortablejs';
import Team from "../components/Team"
import Box from "../components/Box"
import Release from "../components/Release";

Sortable.mount(new Swap());

const Content = styled.div`
  max-width: 1200px;
  width: 95vw;
  margin: 8px auto 0 auto;
  background-color: #ababab;
  padding: 16px;

  h2 {
    margin: 36px 0 24px 76px;
  }

  p {
    margin: 0 0 0 76px;
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
        {team && <Team team={team} number={params.number} box={box[params.number]} />}
      </Content>
      <Content>
        {box && <Box number={params.number} box={box[params.number]} team={team} />}
      </Content>
    </main>
  )
}

export default Storage
