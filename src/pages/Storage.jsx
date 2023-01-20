import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { DragDropContext } from "react-beautiful-dnd"
import styled from "styled-components"
import Box from "../components/Box"

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
`

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

const MyTeam = styled.div`
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 150px);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding: 0 76px;
`

const TeamCell = styled.div`
  width: 75px;
  height: 75px;
  background-color: rgba(217, 217, 217, 0.5);
  padding: 8px;
  border-radius: 100px / 80px;
  transform: rotate(-25deg);
  margin: 0 0 16px 0;

  img {
    width: 75px;
    max-height: 75px;
    transform: rotate(25deg);
  }
`

function Storage() {
  const params = useParams()

  const [team, setTeam] = useState(JSON.parse(localStorage.getItem("team")))
  const [box, setBox] = useState(
    JSON.parse(localStorage.getItem("boxes"))
  )

  useEffect(() => {
    if (localStorage.getItem("boxes") === null) {
      localStorage.setItem(
        "boxes",
        JSON.stringify({
          1: [
            {"item": 1},
            {"item": 2},
            {"item": 3},
            {"item": 4},
            {"item": 5},
            {"item": 6},
            {"item": 7},
            {"item": 8},
            {"item": 9},
            {"item": 10},
            {"item": 11},
            {"item": 12},
            {"item": 13},
            {"item": 14},
            {"item": 15},
            {"item": 16},
            {"item": 17},
            {"item": 18},
            {"item": 19},
            {"item": 20},
            {"item": 21},
            {"item": 22},
            {"item": 23},
            {"item": 24},
            {"item": 25},
            {"item": 26},
            {"item": 27},
            {"item": 28},
            {"item": 29},
            {"item": 30},
            {"item": 31},
            {"item": 32},
            {"item": 33},
            {"item": 34},
            {"item": 35},
            {"item": 36},
          ],
          2: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          3: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          4: [
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
        })
      )
    }
    if (localStorage.getItem("team") === null) {
      localStorage.setItem(
        "team",
        JSON.stringify({
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
        })
      )
    }
  })

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(
      box,
      result.source.index,
      result.destination.index
    )

    setBox(items)
    localStorage.setItem("boxes", JSON.stringify(items))
  }

  return (
    <main>
      <DragDropContext onDragEnd={onDragEnd}>
        <Content>
          <h2>My team</h2>
          <MyTeam>
            {Object.keys(team).map((key, i) => {
              return (
                <TeamCell>
                  {team[key].sprites !== undefined && (
                    <img src={team[key].sprites.front_default} />
                  )}
                </TeamCell>
              )
            })}
          </MyTeam>
        </Content>
        <Content>
          <Box number={params.number} box={box} />
        </Content>
      </DragDropContext>
    </main>
  )
}

export default Storage
