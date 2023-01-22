import { useEffect } from "react"
import styled from "styled-components"
import Sortable from "sortablejs"
import { GrStar } from "react-icons/gr"
import { GiMale, GiFemale } from "react-icons/gi"

const Container = styled.div`
  .grid {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 150px);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    padding: 0 76px;
  }

  .highlighted {
    background-color: rgba(217, 217, 217, 1);
  }
`

const TeamCell = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  background-color: rgba(217, 217, 217, 0.5);
  padding: 8px;
  margin: 0 16px 16px 0;
  transition: background-color 0.1s linear;

  .cell {
    position: relative;
    width: 75px;
    height: 75px;
    background-color: rgba(217, 217, 217, 0.5);
    padding: 8px;
    margin: 0 16px 16px 0;
    transition: background-color 0.1s linear;
  }

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

function Team({ team, number, box }) {
  useEffect(() => {
    Sortable.create(document.getElementById("team"), {
      swap: true,
      swapClass: "highlighted",
      group: "personalStorage",
      animation: 100,
      onRemove: function updateDelete(event) {
        if (event.to.id === "release") {
          const teamItems = Array.from(team)
          teamItems[event.oldIndex] = {
            sprite: "",
            shiny: false,
            gender: "",
            name: "",
          }
        }
      },
      onSort: function updateSwap(event) {
        const boxItems = Array.from(box)
        const teamItems = Array.from(team)

        if (event.from.id === event.to.id) {
          const temp = teamItems[event.oldIndex]
          teamItems[event.oldIndex] = teamItems[event.newIndex]
          teamItems[event.newIndex] = temp
        } else if (event.to.id === "release") {
          teamItems[event.oldIndex] = {
            sprite: "",
            shiny: false,
            gender: "",
            name: "",
          }
        } else if (event.from.id === "box") {
          const temp = boxItems[event.oldIndex]
          boxItems[event.oldIndex] = teamItems[event.newIndex]
          teamItems[event.newIndex] = temp
        } else if (event.from.id === "team") {
          const temp = boxItems[event.newIndex]
          boxItems[event.newIndex] = teamItems[event.oldIndex]
          teamItems[event.oldIndex] = temp
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
      <h2>My team</h2>
      <Container>
        <div id="team" className="grid">
          {team &&
            Object.keys(team).map((key) => {
              return (
                <TeamCell key={key} className="cell">
                  {team[key].gender === "female" ? (
                    <FemaleIcon />
                  ) : team[key].gender === "male" ? (
                    <MaleIcon />
                  ) : null}
                  {team[key].sprite !== "" && <img src={team[key].sprite} />}
                  {team[key].shiny && <ShinyIndicator />}
                </TeamCell>
              )
            })}
        </div>
      </Container>
    </>
  )
}

export default Team
