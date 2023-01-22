import { useEffect } from "react"
import styled from "styled-components"
import Sortable from "sortablejs"

const Container = styled.div`
  #release {
    width: fit-content;
    box-sizing: border-box;
    height: fit-content;
    background-color: rgba(217, 217, 217, 0.5);
    margin: 0 0 0 76px;
    padding: 0;
  }

  .highlighted {
    background-color: rgba(217, 217, 217, 1);
  }

  .cell {
    position: relative;
    width: 75px;
    height: 75px;
    background-color: rgba(217, 217, 217, 0.5);
    padding: 8px;
    margin: 0 16px 16px 0;
    transition: background-color 0.1s linear;
  }
`

function Release() {
  useEffect(() => {
    Sortable.create(document.getElementById("release"), {
      swap: true,
      group: {
        name: "personalStorage",
        pull: false,
      },
      animation: 100,
      onAdd: function releasePokemon(event) {
        var el = event.item
        el.parentNode.removeChild(el)
        const div = document.createElement('div')
        div.classList.add("cell")
        document.getElementById(event.to.id).appendChild(div)
      },
    })
  }, [])

  return (
    <>
      <Container>
        <h2>Drag a pokémon here to release it</h2>
        <div id="release">
          <div className="cell"></div>
        </div>
      </Container>
    </>
  )
}

export default Release
