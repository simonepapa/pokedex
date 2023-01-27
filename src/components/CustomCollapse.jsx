import { useState } from "react"
import styled from "styled-components"
import { Collapse } from "react-collapse"
import { BsArrowRightSquare } from "react-icons/bs"

const OpenIcon = styled(BsArrowRightSquare)`
  width: 18px;
  height: 18px;
  position: absolute;
  right: 8px;
  transition: transform 0.2s linear;
  fill: #4f4f4f;

  &.open {
    transform: rotate(90deg);
  }

  &:hover {
    cursor: pointer;
  }
`

const Top = styled.div`
  display: flex;
  align-items: center;

  h4 {
    display: flex;
    font-weight: 700;
    margin: 8px 24px 0 8px;

    span {
      display: block;
      margin-left: 4px;
      font-weight: 400;
    }
  }
`

const Paragraph = styled.p`
  margin: 4px 8px 0 8px;
  padding-bottom: 8px;
`

function CustomCollapse({ move, currentLanguage }) {
  console.log(move)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <OpenIcon
        className={isOpen ? "open" : ""}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Collapse isOpened={isOpen}>
        <Top>
          <h4>
            Power:<span>{move.power !== null ? move.power : "N/A"}</span>
          </h4>
          <h4>
            Accuracy:<span>{move.accuracy !== null ? move.accuracy : "N/A"}</span>
          </h4>
          <h4>
            PP:<span>{move.pp !== null ? move.pp : "N/A"}</span>
          </h4>
        </Top>
        <Paragraph>
          {move.flavor_text_entries.length > 0
            ? move.flavor_text_entries.find(
                (e) => e.language.name === currentLanguage
              ) !== undefined
              ? move.flavor_text_entries.find(
                  (e) => e.language.name === currentLanguage
                ).flavor_text
              : move.flavor_text_entries.find((e) => e.language.name === "en")
                  .flavor_text
            : "No description available"}
        </Paragraph>
      </Collapse>
    </>
  )
}

export default CustomCollapse
