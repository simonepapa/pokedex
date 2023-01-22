import { useEffect } from "react"
import styled from "styled-components"
import Sortable from "sortablejs"

const Container = styled.div`
  display: flex;
  align-items: center;

  #release {
    position: relative;
    width: fit-content;
    box-sizing: border-box;
    height: 91px;
    background-color: rgba(217, 217, 217, 0.5);
    margin: 0 0 0 76px;
    padding: 0;
  }

  .highlighted {
    background-color: rgba(217, 217, 217, 1);
  }

  .cell {
    position: absolute;
    width: 75px;
    height: 75px;
    background-color: rgba(217, 217, 217, 0.5);
    padding: 8px;
    margin: 0 16px 16px 0;
    transition: background-color 0.1s linear;
  }

  #released {
    margin-left: 116px;
  }
`

const Border = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 87px;
  height: 87px;
  border: 2px dashed rgba(0, 0, 0, 0.5);
  margin: 0 0 0 76px;

  p {
    text-align: center;
    margin: 0 !important;
    font-size: 12px;
  }
`

function Release({number}) {
  useEffect(() => {
    Sortable.create(document.getElementById("release"), {
      swap: true,
      group: {
        name: "personalStorage",
        pull: false,
      },
      animation: 100,
      onAdd: function releasePokemon(event) {
        console.log(event)
        var el = event.item
        el.parentNode.removeChild(el)
        const div = document.createElement("div")
        div.classList.add("cell")
        document.getElementById(event.to.id).appendChild(div)
        if (event.from.id === "team") {
          const text = document.getElementById("released")
          const shiny = JSON.parse(localStorage.getItem("team"))[event.oldIndex].shiny
          const name = JSON.parse(localStorage.getItem("team"))[event.oldIndex].name
          text.innerHTML = `Released <b>${shiny ? "Shiny " : ""}${name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}</b>`
        } else if (event.from.id === "box") {
          const text = document.getElementById("released")
          const shiny = JSON.parse(localStorage.getItem("boxes"))[number][event.oldIndex].shiny
          const name = JSON.parse(localStorage.getItem("boxes"))[number][event.oldIndex].name
          text.innerHTML = `Released <b>${shiny ? "Shiny " : ""}${name.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}</b>`
        }
      },
    })
  }, [])

  return (
    <>
      <Container>
        <Border>
          <p>Drag here to release</p>
        </Border>
        <div id="release">
          <div className="cell"></div>
        </div>
        <p id="released"></p>
      </Container>
    </>
  )
}

export default Release
