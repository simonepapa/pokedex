import { useEffect } from "react"
import styled from "styled-components"
import Sortable from "sortablejs"
import { GrStar } from "react-icons/gr"
import { GiMale, GiFemale } from "react-icons/gi"

const Container = styled.div`
  .grid {
    margin: 0 76px;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
  }

  .highlighted {
    background-color: rgba(217, 217, 217, 1);
  }
`

const BoxCell = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  background-color: rgba(217, 217, 217, 0.5);
  padding: 8px;
  margin: 0 16px 16px 0;
  transition: background-color 0.1s linear;

  img {
    width: 75px;
    max-height: 75px;
  }
`

const ShinyIndicator = styled(GrStar)`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 12px;
  height: 12px;
  fill: #da2928;
`

const MaleIcon = styled(GiMale)`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 12px;
  height: auto;
  fill: #02a3fe;
`

const FemaleIcon = styled(GiFemale)`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 12px;
  height: auto;
  fill: #ec49a6;
`

function Box({ number, box, team }) {
  useEffect(() => {
    Sortable.create(document.getElementById("box"), {
      swap: true,
      swapClass: "highlighted",
      group: "personalStorage",
      animation: 100,
      onSort: function updateSwap(event) {
        const boxItems = Array.from(box)
        const teamItems = Array.from(team)

        if (event.from.id === event.to.id) {
          const temp = boxItems[event.oldIndex]
          boxItems[event.oldIndex] = boxItems[event.newIndex]
          boxItems[event.newIndex] = temp
        } else if (event.to.id === "release") {
          boxItems[event.oldIndex] = {
            sprite: "",
            shiny: false,
            gender: "",
            name: "",
          }
        } else if (event.from.id === "team") {
          const temp = boxItems[event.newIndex]
          boxItems[event.newIndex] = teamItems[event.oldIndex]
          teamItems[event.oldIndex] = temp
        } else if (event.from.id === "box") {
          const temp = boxItems[event.oldIndex]
          boxItems[event.oldIndex] = teamItems[event.newIndex]
          teamItems[event.newIndex] = temp
        }

        const actualBoxes = JSON.parse(localStorage.getItem("boxes"))
        actualBoxes[number] = boxItems
        localStorage.setItem("boxes", JSON.stringify(actualBoxes))
        localStorage.setItem("team", JSON.stringify(teamItems))
      },
    })
  }, [])

  return (
    <>
      <h2>Box {number}</h2>
      <Container>
        <div id="box" className="grid">
          {box &&
            Object.keys(box).map((key) => {
              return (
                <BoxCell key={key}>
                  {box[key].gender === "female" ? (
                    <FemaleIcon />
                  ) : box[key].gender === "male" ? (
                    <MaleIcon />
                  ) : null}
                  {box[key].sprite !== "" && <img src={box[key].sprite} />}
                  {box[key].shiny && <ShinyIndicator />}
                </BoxCell>
              )
            })}
        </div>
      </Container>
    </>
  )
}

export default Box
