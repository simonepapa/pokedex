import styled from "styled-components"
import { Droppable, Draggable } from "react-beautiful-dnd"

const Container = styled.div`
  margin: 0 76px;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  background-color: red;
  padding: 16px;
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
  return (
    <>
      <h2>Box {number}</h2>
      <Container>
        <Droppable droppableId="droppable" horizontal="horizontal">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {Object.keys(box).map((key, i) => {
                return (
                  <Draggable draggableId={`draggable-${i}`} index={i}>
                    {(provided, snapshot) => (
                      <BoxCell
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >{box[key].item}</BoxCell>
                    )}
                  </Draggable>
                )
              })}
            </div>
          )}
        </Droppable>
      </Container>
    </>
  )
}

export default Box
