import { useEffect } from "react"
import styled from "styled-components"
import Sortable from "sortablejs"

const Container = styled.div`
  .grid {
    margin: 0 76px;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    padding: 16px;
  }
`

const BoxCell = styled.div`
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

function Box({ number, box }) {
  useEffect(() => {
    Sortable.create(document.getElementById("box"), {
      swap: true,
      group: "personalStorage",
      animation: 100,
      onSort: function updateSwap(event) {
        if (event.from.id === event.to.id) {
          const boxItems = Array.from(box)

          const temp = boxItems[event.oldIndex].sprite
          boxItems[event.oldIndex].sprite = boxItems[event.newIndex].sprite
          boxItems[event.newIndex].sprite = temp

          const actualBoxes = JSON.parse(localStorage.getItem("boxes"))
          actualBoxes[number] = boxItems
          localStorage.setItem("boxes", JSON.stringify(actualBoxes))
        }
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
                  <img src={box[key].sprite} />
                </BoxCell>
              )
            })}
        </div>
      </Container>
    </>
  )
}

export default Box
