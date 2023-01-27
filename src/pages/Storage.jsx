import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { AnimatePresence, motion } from "framer-motion"
import Sortable, { Swap } from "sortablejs"
import Team from "../components/Team"
import Box from "../components/Box"
import Release from "../components/Release"
import { getTeam, getBoxes } from "../utils"

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
  const navigate = useNavigate()

  const [team, setTeam] = useState(getTeam())
  const [box, setBox] = useState(getBoxes())

  useEffect(() => {
    if (params.number > 8) {
      navigate("/storage/8")
    }
    setTeam(getTeam())
    setBox(getBoxes())
  }, [params.number, navigate])

  console.log(box)

  return (
    <main>
      <Content>
        <Release number={params.number} />
      </Content>
      <Content>
        <Team number={params.number} />
      </Content>
      <Content>
        <AnimatePresence mode="wait">
          <motion.div
            key={params.number}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Box number={params.number} />
          </motion.div>
        </AnimatePresence>
      </Content>
    </main>
  )
}

export default Storage
