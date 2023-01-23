import { Link } from "react-router-dom"
import { useEffect } from "react"
import styled from "styled-components"
import Sortable from "sortablejs"
import { GrStar } from "react-icons/gr"
import { GiMale, GiFemale } from "react-icons/gi"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"

const Container = styled.div`
  .grid {
    margin: 0;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    padding: 16px 8px 0 8px;
    background-color: var(--${(props) => props.children.props.background});
    border-radius: 16px;
  }

  .highlighted {
    background-color: rgba(217, 217, 217, 1);
  }

  @media (min-width: 1200px) {
    .grid {
      margin: 0 76px;
      padding: 16px;
    }
  }
`

const BoxCell = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  background-color: rgba(217, 217, 217, 0.5);
  padding: 8px;
  margin: 0 16px 16px 0;
  transition: background-color 0.1s linear;

  img {
    width: 50px;
    max-height: 50px;
  }

  @media (min-width: 1200px) {
    width: 75px;
    height: 75px;

    img {
      width: 75px;
      max-height: 75px;
    }
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

const BoxTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90vw;
  background-color: var(--${(props) => props.background});
  margin: 0 auto 8px auto;
  display: flex;
  border-radius: 16px;

  @media (min-width: 1200px) {
    max-width: 1048px;

    h2 {
      margin: 0 !important;
    }
  }
`

const LeftArrow = styled(BsArrowLeft)`
  width: 32px;
  height: auto;
  margin: 0 0 0 8px;
  fill: #000;
`

const RightArrow = styled(BsArrowRight)`
  width: 32px;
  height: auto;
  margin: 0 8px 0 0;
  fill: #000;
`

function Box({ number, box }) {
  useEffect(() => {
    Sortable.create(document.getElementById("box"), {
      swap: true,
      swapClass: "highlighted",
      group: "personalStorage",
      animation: 100,
      onSort: function updateSwap(event) {
        const boxItems = Array.from(
          JSON.parse(localStorage.getItem("boxes"))[number]
        )
        const teamItems = Array.from(JSON.parse(localStorage.getItem("team")))

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
        }

        const actualBoxes = JSON.parse(localStorage.getItem("boxes"))
        actualBoxes[number] = boxItems
        localStorage.setItem("boxes", JSON.stringify(actualBoxes))
        localStorage.setItem("team", JSON.stringify(teamItems))
      },
    })
  }, [number])

  const handleBg = (number) => {
    switch (number) {
      case "1":
        return "flying"
      case "2":
        return "fire"
      case "3":
        return "water"
      case "4":
        return "dragon"
      case "5":
        return "grass"
      case "6":
        return "ice"
      case "7":
        return "fighting"
      case "8":
        return "poison"
      default:
        return "normal"
    }
  }

  return (
    <>
      <BoxTop background={handleBg(number)}>
        <Link
          to={`/storage/${parseInt(number) - 1}`}
          className={parseInt(number) === 1 ? "disabled" : ""}
        >
          <LeftArrow />
        </Link>
        <h2>Box {number}</h2>
        <Link
          to={`/storage/${parseInt(number) + 1}`}
          className={parseInt(number) === 8 ? "disabled" : ""}
        >
          <RightArrow />
        </Link>
      </BoxTop>
      <Container>
        <div background={handleBg(number)} id="box" className="grid">
          {box[number] &&
            Object.keys(box[number]).map((key) => {
              return (
                <BoxCell key={key}>
                  {box[number][key].gender === "female" ? (
                    <FemaleIcon />
                  ) : box[number][key].gender === "male" ? (
                    <MaleIcon />
                  ) : null}
                  {box[number][key].sprite !== "" && (
                    <img src={box[number][key].sprite} alt={`Sprite of ${box[number][key].name}`} />
                  )}
                  {box[number][key].shiny && <ShinyIndicator />}
                </BoxCell>
              )
            })}
        </div>
      </Container>
    </>
  )
}

export default Box
