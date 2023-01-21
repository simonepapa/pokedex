import { useEffect } from "react"
import styled from "styled-components"
import Sortable from "sortablejs"

const Container = styled.div`
  .grid {
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 150px);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    padding: 0 76px;
  }
`

const TeamCell = styled.div`
  width: 75px;
  height: 75px;
  background-color: rgba(217, 217, 217, 0.5);
  padding: 8px;
  margin: 0 16px 16px 0;

  img {
    width: 75px;
    max-height: 75px;
  }
`

function Team({ team, number, box }) {
  useEffect(() => {
    Sortable.create(document.getElementById("team"), {
      swap: true,
      group: "personalStorage",
      animation: 100,
      onSort: function updateSwap(event) {
        const boxItems = Array.from(box)
        const teamItems = Array.from(team)

        if (event.from.id === event.to.id) {
          const temp = teamItems[event.oldIndex].sprite
          teamItems[event.oldIndex].sprite = teamItems[event.newIndex].sprite
          teamItems[event.newIndex].sprite = temp
          
        } else if (event.from.id === "box") {
          const temp = boxItems[event.oldIndex].sprite
          boxItems[event.oldIndex].sprite = teamItems[event.newIndex].sprite
          teamItems[event.newIndex].sprite = temp
        } else if (event.from.id === "team") {
          const temp = boxItems[event.newIndex].sprite
          boxItems[event.newIndex].sprite = teamItems[event.oldIndex].sprite
          teamItems[event.oldIndex].sprite = temp
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
                <TeamCell key={key}>
                  {team[key].sprite !== "" && (
                    <img src={team[key].sprite} />
                  )}
                </TeamCell>
              )
            })}
        </div>
      </Container>
    </>
  )
}

export default Team
