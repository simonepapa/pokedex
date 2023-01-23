import { useEffect } from "react"
import styled from "styled-components"
import Sortable from "sortablejs"

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  #release {
    position: relative;
    width: fit-content;
    box-sizing: border-box;
    height: 68px;
    background-color: rgba(217, 217, 217, 0.5);
    margin: 0 0 0 8px;
    padding: 0;
  }

  .highlighted {
    background-color: rgba(217, 217, 217, 1);
  }

  .cell {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgba(217, 217, 217, 0.5);
    padding: 8px;
    margin: 0 16px 16px 0;
    transition: background-color 0.1s linear;
  }

  #released {
    font-size: 12px;
    margin-left: 82px;
  }

  @media (min-width: 1200px) {
    .cell {
      width: 75px;
      height: 75px;
    }

    #release {
      height: 91px;
      margin: 0 0 0 76px;
    }

    #released {
      font-size: 16px;
      margin-left: 116px;
    }
  }
`

const Border = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 62px;
  height: 62px;
  border: 2px dashed rgba(0, 0, 0, 0.5);
  margin: 0 0 0 8px;
  left: 0;
  top: 0;

  p {
    text-align: center;
    margin: 0 !important;
    font-size: 10px;
  }

  @media (min-width: 1200px) {
    width: 87px;
    height: 87px;
    margin: 0 0 0 76px;
    top: 0;
    left: 0;

    p {
      font-size: 12px;
    }
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
