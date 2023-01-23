import { useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { toast } from "react-toastify"
import Zoom from "react-medium-image-zoom"
import "react-medium-image-zoom/dist/styles.css"
import { IT, FR, DE, ES, GB, JP, KR } from "country-flag-icons/react/3x2"
import Spinner from "../components/Spinner"
import { useGetPokemonByIdQuery } from "../features/api/apiSlice"
import Type from "../components/Type"
import Evolution from "../components/Evolution"
import AlternativeCard from "../components/AlternativeCard"
import { BsArrowRight } from "react-icons/bs"
import { GiTrade, GiMale, GiFemale } from "react-icons/gi"

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
`

const Content = styled.main`
  width: 90vw;
  margin: 8px auto 16px auto;
  background-color: #ababab;
  padding: 8px;

  @media (min-width: 1200px) {
    max-width: 1200px;
    width: 95vw;
    padding: 16px;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  margin: 0 auto;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`

const LanguageSwitch = styled.div`
  display: flex;
  flex-wrap: wrap;

  svg {
    max-width: 24px;
  }

  @media (min-width: 1200px) {
    svg {
      max-width: 32px;
    }
  }
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 95%;
  max-width: 95%;
  margin-right: 8px;
  height: fit-content;
  margin: auto 0;

  @media (min-width: 1200px) {
    flex: 40%;
    max-width: 40%;
  }
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(217, 217, 217, 0.5);
  width: 100%;
  border-radius: 8px;
  height: fit-content;
  margin: auto 0 8px 0;
  padding: 16px 0;

  &.smaller {
    width: fit-content;
    padding: 8px 0;
  }
`

const BoxButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 24px 0 0 0;

  button {
    display: block;
    background-color: #d75050;
    border: 0;
    border-radius: 8px;
    padding: 8px;
    margin: 0 8px 0 8px;
    text-transform: uppercase;
    -webkit-transition: box-shadow 0.1s linear;
    transition: box-shadow 0.1s linear;
    font-size: 10px;
  }

  button:hover {
    cursor: pointer;
    box-shadow: 1px 2px 5px rgb(0 0 0 / 50%);
  }

  @media (min-width: 1200px) {
    button {
      margin: 0 24px 0 0;
      font-size: 12px;
    }
  }
`

const Right = styled.div`
  flex: 95%;
  max-width: 95%;
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  padding: 8px 24px 24px 24px;
  margin-right: 14px;
  height: fit-content;

  h1 {
    font-size: 21px;
  }

  h3 {
    font-size: 16px;
    margin: 8px 0;
  }
  
  p {
    margin: 8px 0;
  }

  @media (min-width: 1200px) {
    flex: 60%;
    max-width: 60%;
    margin-left: 8px;
    margin-right: 0;

    h1 {
      font-size: 32px;
    }

    h3 {
      font-size: 18px;
      margin: 18px 0;
    }

    p {
      margin: 18px 0;
    }
  }
`

const Sprite = styled.img`
  max-width: 90%;
  width: auto;
  height: 90%;
  max-height: 120px;

  @media (min-width: 1200px) {
    max-height: 200px;
  }
`

const GenderSwitcher = styled.div`
  display: flex;
  align-items: center;
  margin: 0;

  svg:not(.active) {
    opacity: 0.5;
  }
  svg:hover:not(.active) {
    cursor: pointer;
    opacity: 0.75;
  }
`

const MaleIcon = styled(GiMale)`
  width: 20px;
  height: auto;
  margin: 0 16px;
  padding: 8px;
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  fill: #02a3fe;
  transition: opacity 0.1s linear;

  @media (min-width: 1200px) {
    width: 32px;
  }
`

const FemaleIcon = styled(GiFemale)`
  width: 20px;
  height: auto;
  margin: 0 16px;
  padding: 8px;
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  fill: #ec49a6;
  transition: opacity 0.1s linear;

  @media (min-width: 1200px) {
    width: 32px;
  }
`

const Description = styled.p`
  font-size: 14px;

  @media (min-width: 1200px) {
    font-size: 18px;
  }
`

const Stats = styled.div`
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 90px);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: #42adbb80;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;

  svg {
    width: 24px;
    margin: 0 8px 0 0;
    padding: 0;
    background-color: transparent;
  }

  @media (min-width: 1200px) {
    max-width: 70%;
    grid-template-columns: repeat(auto-fit, 150px);
    margin-bottom: 0;
  }
`

const StatName = styled.h3`
  margin: 16px 0 8px 0;
  
  font-size: 16px !important;

  @media (min-width: 1200px) {
    font-size: 18px !important;
  }
`

const StatValue = styled.p`
  margin: 0 0 8px 0;

  font-size: 14px !important;

  @media (min-width: 1200px) {
    font-size: 18px !important;
  }
`

const Types = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const Bottom = styled.div`
  width: 95%;
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  margin: 16px auto 0 auto;
  height: fit-content;
  padding: 16px 0;

  @media (min-width: 1200px) {
    width: 95%;
    margin: 16px auto 0 auto;
  }
`

const SecondaryTitle = styled.h2`
  font-size: 18px;
  margin: 0 16px;

  @media (min-width: 1200px) {
    font-size: 24px;
  }
`

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 16px;
`

const SingleStat = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 32px 0 0;
`

const EvolutionRow = styled.div`
  display: flex;
  align-items: center;
  overflow-x: scroll;
  margin-bottom: 32px;

  @media (min-width: 1200px) {
    justify-content: center;
  }
`

const EvolutionDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Arrow = styled(BsArrowRight)`
  width: 32px;
  height: auto;
`

const Shed = styled.p`
  margin: 0;
  max-width: 200px;
  text-align: center;
`

const Alcremie = styled.ul`
  max-width: 300px;
`

const EvolutionBG = styled.div`
  margin: 0;
  border-radius: 8px;
  background-color: #ababab;
  padding: 2px 4px;
  margin-bottom: 4px;

  p {
    margin: 0;
    font-size: 14px;
  }

  &.use {
    display: flex;
    align-items: center;
  }

  @media (min-width: 1200px) {
    p {
      font-size: 16px;
    }
  }
`

const AlternativeForms = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 8px;
`

const CustomType = styled(Type)`
  font-size: 10px;
  padding: 4px 4px;
  margin: 0 8px 0 0 !important;

  @media (min-width: 1200px) {
    font-size: 16px;
    padding: 4px 8px;
  }
`

function Pokemon() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [currentGender, setCurrentGender] = useState("")

  const params = useParams()

  const {
    data: pokemon = [],
    isLoading,
    isSuccess,
    isError,
    isFetching,
    message,
    refetch,
  } = useGetPokemonByIdQuery(params.pokemon)

  const evolutionType = (details) => {
    let output = []
    for (let i = 0; i < details.evolution_details.details.length; i++) {
      switch (details.evolution_details.details[i].trigger.name) {
        case "level-up":
          let containers = []
          containers.push(
            <p key={`Level up 0`}>
              <strong>Level up</strong>
            </p>
          )
          for (const prop in details.evolution_details.details[i]) {
            if (prop !== "trigger") {
              if (
                details.evolution_details.details[i][prop] !== null &&
                details.evolution_details.details[i][prop] !== false &&
                details.evolution_details.details[i][prop] !== ""
              ) {
                switch (prop) {
                  case "location":
                    containers.push(
                      <p key={`Location ${i}`}>
                        in{" "}
                        {`${details.evolution_details.details[i][
                          prop
                        ].name.replace(/-/g, " ")}`}
                      </p>
                    )
                    break
                  case "known_move":
                    containers.push(
                      <p key={`Known move ${i}`}>
                        knowing{" "}
                        {`${details.evolution_details.details[i][
                          prop
                        ].name.replace(/-/g, " ")}`}
                      </p>
                    )
                    break
                  case "known_move_type":
                    containers.push(
                      <p key={`Known move type ${i}`}>
                        knowing{" "}
                        {`${details.evolution_details.details[i][
                          prop
                        ].name.replace(/-/g, " ")}`}{" "}
                        type move
                      </p>
                    )
                    break
                  case "gender":
                    containers.push(
                      <p key={`Gender ${i}`}>
                        gender{" "}
                        {`${
                          details.evolution_details.details[i][prop] === 1
                            ? "female"
                            : "male"
                        }`}
                      </p>
                    )
                    break
                  case "min_affection":
                    containers.push(
                      <p key={`Min affection ${i}`}>
                        with min affection{" "}
                        {`${details.evolution_details.details[i][prop]}`}
                      </p>
                    )
                    break
                  case "min_beauty":
                    containers.push(
                      <p key={`Min beauty ${i}`}>
                        with min beauty{" "}
                        {`${details.evolution_details.details[i][prop]}`}
                      </p>
                    )
                    break
                  case "min_happiness":
                    containers.push(
                      <p key={`Min happiness ${i}`}>
                        with min happiness{" "}
                        {`${details.evolution_details.details[i][prop]}`}
                      </p>
                    )
                    break
                  case "needs_overworld_rain":
                    containers.push(
                      <p key={`Needs overworld rain ${i}`}>
                        needs overworld rain
                      </p>
                    )
                    break
                  case "party_species":
                    containers.push(
                      <p key={`Party species ${i}`}>
                        with{" "}
                        <strong>{`${details.evolution_details.details[i][prop].name}`}</strong>{" "}
                        in party
                      </p>
                    )
                    break
                  case "party_type":
                    containers.push(
                      <p key={`Party type ${i}`}>
                        with a{" "}
                        <strong>{`${details.evolution_details.details[i][prop].name}`}</strong>{" "}
                        pokémon type in party
                      </p>
                    )
                    break
                  case "trade_species":
                    containers.push(
                      <p key={`Trade species ${i}`}>
                        trade for a{" "}
                        <strong>{`${details.evolution_details.details[i][prop].name}`}</strong>
                      </p>
                    )
                    break
                  case "relative_physical_stats":
                    containers.push(
                      <p key={`Relative physical stats ${i}`}>
                        with
                        <strong>
                          {`${
                            details.evolution_details.details[i][prop] === 1
                              ? " Attack > Defense"
                              : details.evolution_details.details[i][prop] === 0
                              ? " Attack = Defense"
                              : " Attack < Defense"
                          }`}
                        </strong>
                      </p>
                    )
                    break
                  case "time_of_day":
                    containers.push(
                      <p key={`Time of day ${i}`}>
                        during the{" "}
                        <strong>{`${details.evolution_details.details[i][prop]}`}</strong>
                      </p>
                    )
                    break
                  case "turn_upside_down":
                    containers.push(
                      <p key={`Needs overworld rain ${i}`}>
                        while the game system is held upside-down
                      </p>
                    )
                    break
                  default:
                    containers.push(
                      <p key={`Level up ${i + 1}`}>
                        {`${prop.replace(/_/g, " ")}`}:{" "}
                        {`${details.evolution_details.details[i][prop]}`}
                      </p>
                    )
                    break
                }
              }
            }
          }
          containers.length > 1 &&
            output.push(
              <EvolutionBG key={`Evolution container 0`}>
                {containers}
              </EvolutionBG>
            )
          break
        case "trade":
          if (details.evolution_details.details[i].held_item !== null) {
            output.push(
              <EvolutionBG
                key={`Trade ${details.evolution_details.details[i].held_item.name}`}
                className="use"
              >
                <strong>Trade while holding:</strong>
                <img
                  src={
                    details.evolution_details.details[i].held_item.sprites
                      .default
                  }
                  alt={`Trade while holding ${details.evolution_details.details[i].held_item.name}`}
                  title={`Trade while holding ${details.evolution_details.details[i].held_item.name}`}
                />
              </EvolutionBG>
            )
          } else if (
            details.evolution_details.details[i].trade_species !== null
          )
            output.push(
              <EvolutionBG
                key={`Trade for ${details.evolution_details.details[i].trade_species.name}`}
                className="use"
              >
                <p>
                  trade for a{" "}
                  <strong>{`${details.evolution_details.details[i].trade_species.name}`}</strong>
                </p>
              </EvolutionBG>
            )
          else
            output.push(
              <EvolutionBG key={`Trade-${i}`} className="use">
                <GiTrade
                  alt="Trade with no held items"
                  title="Trade with no held items"
                />
                <p>&nbsp; trade</p>
              </EvolutionBG>
            )
          break
        case "use-item":
          if (details.evolution_details.details[i].item !== null) {
            output.push(
              <EvolutionBG
                key={`Hold ${details.evolution_details.details[i].item.name}`}
                className="use"
              >
                <strong>Use:</strong>
                <img
                  src={
                    details.evolution_details.details[i].item.sprites.default
                  }
                  alt={`Use ${details.evolution_details.details[i].item.name}`}
                  title={`Use ${details.evolution_details.details[i].item.name}`}
                />
              </EvolutionBG>
            )
          } else output.push(<p key={`Use-${i}`}>Use item</p>)
          break
        case "shed":
          output.push(
            <EvolutionBG key="shedinja" className="use">
              <Shed>
                Reach level 20 while having at least a free spot in your team
                and at least a Poké Ball in your bag
              </Shed>
            </EvolutionBG>
          )
          break
        case "spin":
          output.push(
            <EvolutionBG key="alcremie" className="use">
              <div>
                <p>Evolves into</p>
                <Alcremie>
                  <li>
                    Vanilla Cream Alcremie after spinning clockwise for less
                    than 5 seconds during the day
                  </li>
                  <li>
                    Ruby Cream Alcremie after spinning counterclockwise for less
                    than 5 seconds during the day
                  </li>
                  <li>
                    Matcha Cream Alcremie after spinning clockwise for less than
                    5 seconds at night
                  </li>
                  <li>
                    Mint Cream Alcremie after spinning counterclockwise for more
                    than 5 seconds at night
                  </li>
                  <li>
                    Lemon Cream Alcremie after spinning clockwise for more than
                    5 seconds at night
                  </li>
                  <li>
                    Salted Cream Alcremie after spinning counterclockwise for
                    less than 5 seconds at night
                  </li>
                  <li>
                    Ruby Swirl Alcremie after spinning counterclockwise for more
                    than 5 seconds during the day
                  </li>
                  <li>
                    Caramel Swirl Alcremie after spinning clockwise for more
                    than 5 seconds during the day
                  </li>
                  <li>
                    Rainbow Swirl Alcremie after spinning counterclockwise for
                    more than 10 seconds between 7:00 PM and 7:59 PM in-game
                    time
                  </li>
                </Alcremie>
              </div>
            </EvolutionBG>
          )
          break
        case "tower-of-darkness":
          output.push(
            <EvolutionBG key="tower-of-darkness" className="use">
              <Shed>
                Evolves into Single Strike Style Urshifu (Fighting/Dark) when
                shown the scroll in the Tower of Darkness
              </Shed>
            </EvolutionBG>
          )
          break
        case "tower-of-waters":
          output.push(
            <EvolutionBG key="tower-of-waters" className="use">
              <Shed>
                Evolves into Rapid Strike Style (Fighting/Water) Urshifu when
                shown the scroll of darkness in the Tower of Waters
              </Shed>
            </EvolutionBG>
          )
          break
        case "three-critical-hits":
          output.push(
            <EvolutionBG key="three critical hits" className="use">
              <Shed>
                Evolves from Galarian Farfetch'd. Land three critical hits in a
                single battle
              </Shed>
            </EvolutionBG>
          )
          break
        case "take-damage":
          output.push(
            <EvolutionBG key="take damage" className="use">
              <Shed>
                Evolves from Galarian Yamask. Take at least 49 HP in damage (not
                self-inflicted) without fainting, then travel under the stone
                arch in Dusty Bowl.
              </Shed>
            </EvolutionBG>
          )
          break
        case "other":
          output.push(<p>Other</p>)
          break
        case "agile-style-move":
          output.push(
            <EvolutionBG key="agile style move" className="use">
              <Shed>
                Evolves in Hisui after using Psyshield Bash in the agile style
                at least twenty times
              </Shed>
            </EvolutionBG>
          )
          break
        case "strong-style-move":
          output.push(
            <EvolutionBG key="strong style move" className="use">
              <Shed>
                Evolves from Hisuian Qwilfish after using Barb Barrage in the
                strong style at least 20 times
              </Shed>
            </EvolutionBG>
          )
          break
        case "recoil-damage":
          output.push(
            <EvolutionBG key="recoil damage" className="use">
              <Shed>
                Evolves from White-Striped Basculin after losing at least 294 HP
                from recoil damage without fainting
              </Shed>
            </EvolutionBG>
          )
          break
        default:
          console.log("Unknown evolution type")
          break
      }
    }
    return output
  }

  const spriteDecider = (shiny) => {
    let prop = ""
    // Assign a string value to prop var, as this will be used in associative array form to decide whether to show base or shiny form
    if (!shiny && (currentGender === "male" || currentGender === "")) {
      prop = "front_default"
    } else if (shiny && (currentGender === "male" || currentGender === "")) {
      prop = "front_shiny"
    } else if (!shiny && currentGender === "female") {
      prop = "front_female"
    } else if (shiny && currentGender === "female") {
      prop = "front_shiny_female"
    }
    // If the prop "other" is defined
    if (pokemon.pokemon.sprites.other !== undefined) {
      // If the prop "home" is undefined and not null, return this sprite
      if (
        pokemon.pokemon.sprites.other.home[prop] !== undefined &&
        pokemon.pokemon.sprites.other.home[prop] !== null
      ) {
        return pokemon.pokemon.sprites.other.home[prop]
      } else if (
        // If the prop "dream_world" is undefined and not null, return this sprite
        pokemon.pokemon.sprites.other.dream_world[prop] !== undefined &&
        pokemon.pokemon.sprites.other.dream_world[prop] !== null
      ) {
        return pokemon.pokemon.sprites.other.dream_world[prop]
      } else if (
        (currentGender === "male" || currentGender === "") &&
        // If the prop "official-artwork" is undefined and not null AND the selected gender is male, return this sprite (female sprites usually don't have an official artwork for both base and shiny version in the API)
        pokemon.pokemon.sprites.other["official-artwork"][prop] !== undefined &&
        pokemon.pokemon.sprites.other["official-artwork"][prop] !== null
      ) {
        return pokemon.pokemon.sprites.other["official-artwork"][prop]
      } else if (
        currentGender === "female" &&
        pokemon.forms.find((e) => e.name.includes("female")) !== undefined
      ) {
        // If the selected gender is female, then there's a special case, especially for newer pokemon, where the female version is an alternative "form" and is contained in the forms array. If every check fails, use this as a last resort before printing the default sprite
        return !shiny
          ? pokemon.forms.find((e) => e.name.includes("female")).sprites
              .front_default
          : pokemon.forms.find((e) => e.name.includes("female")).sprites
              .front_shiny
      } else {
        // Default sprite
        return pokemon.pokemon.sprites[prop]
      }
    } else {
      // If there's no "other" prop, then print the default sprite
      return !shiny
        ? pokemon.pokemon.sprites.front_default
        : pokemon.pokemon.sprites.front_shiny
    }
  }

  const addToTeam = (shiny) => {
    const team = JSON.parse(localStorage.getItem("team"))
    for (let i = 0; i < Object.keys(team).length; i++) {
      if (team[i].sprite === "") {
        team[i].sprite = !shiny
          ? document.getElementById("baseForm").src
          : document.getElementById("shinyForm").src
        team[i].shiny = shiny
        team[i].gender =
          pokemon.pokemonSpecies.gender_rate === 8
            ? "female"
            : pokemon.pokemonSpecies.gender_rate === -1
            ? "genderless"
            : pokemon.pokemonSpecies.gender_rate === 0 ||
              currentGender === "male" ||
              currentGender === ""
            ? "male"
            : currentGender
        team[i].name = pokemon.pokemon.name
        localStorage.setItem("team", JSON.stringify(team))
        toast.success("Pokemon successfully added to your team")
        return
      }
    }
    toast.error("No free space in your team")
  }

  const addToBox = (shiny) => {
    const boxes = JSON.parse(localStorage.getItem("boxes"))
    for (let i = 1; i <= Object.keys(boxes).length; i++) {
      for (let j = 0; j < Object.keys(boxes[i]).length; j++) {
        if (boxes[i][j].sprite === "") {
          boxes[i][j].sprite = !shiny
            ? document.getElementById("baseForm").src
            : document.getElementById("shinyForm").src
          boxes[i][j].shiny = shiny
          boxes[i][j].gender =
            pokemon.pokemonSpecies.gender_rate === 8
              ? "female"
              : pokemon.pokemonSpecies.gender_rate === -1
              ? "genderless"
              : pokemon.pokemonSpecies.gender_rate === 0 ||
                currentGender === "male" ||
                currentGender === ""
              ? "male"
              : currentGender
          boxes[i][j].name = pokemon.pokemon.name
          localStorage.setItem("boxes", JSON.stringify(boxes))
          toast.success(`Pokemon successfully added to box ${i}`)
          return
        }
      }
    }
    toast.error("No free space in your boxes")
  }

  if (isError) {
    toast.error(message)
  } else if (isSuccess) {
    console.log(pokemon)
  }

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )
  }

  return (
    <Content>
      {!isLoading ? (
        <>
          <Info>
            <Left>
              <LeftContainer>
                <SecondaryTitle>Base</SecondaryTitle>
                <Zoom>
                  <Sprite
                    id="baseForm"
                    src={spriteDecider(false)}
                    title={`Sprite of ${
                      pokemon.pokemonSpecies.names.find(
                        (e) => e.language.name === "en"
                      ).name
                    }`}
                    alt={`Sprite of ${
                      pokemon.pokemonSpecies.names.find(
                        (e) => e.language.name === "en"
                      ).name
                    }`}
                  />
                </Zoom>
                <BoxButtons>
                  <button onClick={() => addToTeam(false)}>
                    Add to My Team
                  </button>
                  <button onClick={() => addToBox(false)}>Add to Box</button>
                </BoxButtons>
              </LeftContainer>
              <LeftContainer>
                <SecondaryTitle>Shiny</SecondaryTitle>
                <Zoom>
                  <Sprite
                    id="shinyForm"
                    src={spriteDecider(true)}
                    title={`Sprite of shiny ${
                      pokemon.pokemonSpecies.names.find(
                        (e) => e.language.name === "en"
                      ).name
                    }`}
                    alt={`Sprite of shiny ${
                      pokemon.pokemonSpecies.names.find(
                        (e) => e.language.name === "en"
                      ).name
                    }`}
                  />
                </Zoom>
                <BoxButtons>
                  <button onClick={() => addToTeam(true)}>
                    Add to My Team
                  </button>
                  <button onClick={() => addToBox(true)}>Add to Box</button>
                </BoxButtons>
              </LeftContainer>
              {pokemon.pokemonSpecies.has_gender_differences && (
                <LeftContainer className="smaller">
                  <GenderSwitcher>
                    {pokemon.pokemonSpecies.gender_rate !== 8 && (
                      <MaleIcon
                        onClick={() => setCurrentGender("male")}
                        className={
                          (currentGender === "" || currentGender === "male") &&
                          "active"
                        }
                      />
                    )}
                    {pokemon.pokemonSpecies.gender_rate !== 0 && (
                      <FemaleIcon
                        onClick={() => setCurrentGender("female")}
                        className={
                          (pokemon.pokemonSpecies.gender_rate === 8 ||
                            currentGender === "female") &&
                          "active"
                        }
                      />
                    )}
                  </GenderSwitcher>
                </LeftContainer>
              )}
            </Left>
            <Right>
              <LanguageSwitch>
                <GB
                  title="English"
                  onClick={() => setCurrentLanguage("en")}
                  className={`flag ${currentLanguage === "en" && "active"}`}
                />
                <JP
                  title="Japanese"
                  onClick={() => setCurrentLanguage("ja")}
                  className={`flag ${currentLanguage === "ja" && "active"}`}
                />
                <IT
                  title="Italian"
                  onClick={() => setCurrentLanguage("it")}
                  className={`flag ${currentLanguage === "it" && "active"}`}
                />
                <KR
                  title="Korean"
                  onClick={() => setCurrentLanguage("ko")}
                  className={`flag ${currentLanguage === "ko" && "active"}`}
                />
                <FR
                  title="French"
                  onClick={() => setCurrentLanguage("fr")}
                  className={`flag ${currentLanguage === "fr" && "active"}`}
                />
                <DE
                  title="German"
                  onClick={() => setCurrentLanguage("de")}
                  className={`flag ${currentLanguage === "de" && "active"}`}
                />
                <ES
                  title="Spanish"
                  onClick={() => setCurrentLanguage("es")}
                  className={`flag ${currentLanguage === "es" && "active"}`}
                />
              </LanguageSwitch>
              <h1>
                {pokemon.pokemonSpecies.names.find(
                  (e) => e.language.name === currentLanguage
                ) !== undefined
                  ? pokemon.pokemonSpecies.names.find(
                      (e) => e.language.name === currentLanguage
                    ).name
                  : pokemon.pokemonSpecies.names.find(
                      (e) => e.language.name === "en"
                    ).name}
                , N° {pokemon.pokemon.id.toString().padStart(3, "0")}
              </h1>
              <h3>
                Generation{" "}
                {pokemon.pokemonSpecies.generation.url
                  .substring(
                    0,
                    pokemon.pokemonSpecies.generation.url.length - 1
                  )
                  .slice(37)}
              </h3>
              <Description>
                {pokemon.pokemonSpecies.flavor_text_entries.find(
                  (e) => e.language.name === currentLanguage
                ) !== undefined
                  ? pokemon.pokemonSpecies.flavor_text_entries.find(
                      (e) => e.language.name === currentLanguage
                    ).flavor_text
                  : pokemon.pokemonSpecies.flavor_text_entries.find(
                      (e) => e.language.name === "en"
                    ).flavor_text}
              </Description>
              <Stats>
                <div>
                  <StatName>Height</StatName>
                  <StatValue>
                    {(pokemon.pokemon.height / 10).toFixed(1)} m
                  </StatValue>
                </div>
                <div>
                  <StatName>Weight</StatName>
                  <StatValue>
                    {(pokemon.pokemon.weight / 10).toFixed(1)} kg
                  </StatValue>
                </div>
                <div>
                  <StatName>Category</StatName>
                  <StatValue>
                    {
                      pokemon.pokemonSpecies.genera.find(
                        (e) => e.language.name === "en"
                      ).genus
                    }
                  </StatValue>
                </div>
                <div>
                  <StatName>Shape</StatName>
                  <StatValue>
                    {pokemon.pokemonSpecies.shape.name.charAt(0).toUpperCase() +
                      pokemon.pokemonSpecies.shape.name.slice(1)}
                  </StatValue>
                </div>
                <div>
                  <StatName>Habitat</StatName>
                  <StatValue>
                    {pokemon.pokemonSpecies.habitat !== null
                      ? pokemon.pokemonSpecies.habitat.name
                          .replace(/-/g, " ")
                          .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
                      : "Unknown"}
                  </StatValue>
                </div>
                <div>
                  <StatName>Abilities</StatName>
                  {pokemon.pokemon.abilities.map((ability) => (
                    <StatValue key={ability.ability.name}>
                      {ability.ability.name
                        .replace(/-/g, " ")
                        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                      {ability.is_hidden === true && " (Hidden)"}
                    </StatValue>
                  ))}
                </div>
                <div>
                  <StatName>Baby</StatName>
                  {pokemon.pokemonSpecies.is_baby ? "Yes" : "No"}
                  <StatValue></StatValue>
                </div>
                <div>
                  <StatName>Legendary</StatName>
                  {pokemon.pokemonSpecies.is_legendary ? "Yes" : "No"}
                </div>
                <div>
                  <StatName>Mythical</StatName>
                  {pokemon.pokemonSpecies.is_mythical ? "Yes" : "No"}
                </div>
                <div>
                  <StatName>Gender</StatName>
                  {pokemon.pokemonSpecies.gender_rate === -1 ? (
                    "Genderless"
                  ) : pokemon.pokemonSpecies.gender_rate === 8 ? (
                    <FemaleIcon />
                  ) : pokemon.pokemonSpecies.gender_rate === 0 ? (
                    <MaleIcon />
                  ) : (
                    <>
                      <MaleIcon />
                      <FemaleIcon />
                    </>
                  )}
                </div>
              </Stats>
              <div>
                <StatName>Types</StatName>
                <Types>
                  {pokemon.pokemon.types.map((type) => (
                    <CustomType
                      key={`${pokemon.pokemon.id} + ${type.type.name}`}
                      type={type.type}
                    />
                  ))}
                </Types>
              </div>
            </Right>
          </Info>
          <Bottom>
            <SecondaryTitle>Base stats</SecondaryTitle>
            <Grid>
              {pokemon.pokemon.stats.map((stat) => {
                return (
                  <SingleStat key={stat.stat.name}>
                    <StatName>
                      {stat.stat.name.charAt(0).toUpperCase() +
                        stat.stat.name.slice(1)}
                    </StatName>
                    <StatValue>{stat.base_stat}</StatValue>
                  </SingleStat>
                )
              })}
            </Grid>
          </Bottom>
          {pokemon.evolutionChain.length > 0 && (
            <Bottom>
              <SecondaryTitle>Evolution Chain</SecondaryTitle>
              {pokemon.evolutionChain.map((evolution, index) => (
                <EvolutionRow
                  key={`Evolution ${evolution.names[0].name}-${index}`}
                >
                  <Evolution
                    pokemon={evolution}
                    currentLanguage={currentLanguage}
                  />
                  {Object.keys(evolution.secondStage).length !== 0 && (
                    <>
                      <EvolutionDetails>
                        {evolutionType(evolution.secondStage)}
                        <Arrow />
                      </EvolutionDetails>

                      <Evolution
                        pokemon={evolution.secondStage}
                        currentLanguage={currentLanguage}
                      />
                    </>
                  )}
                  {Object.keys(evolution.thirdStage).length !== 0 && (
                    <>
                      <EvolutionDetails>
                        {evolutionType(evolution.thirdStage)}
                        <Arrow />
                      </EvolutionDetails>
                      <Evolution
                        pokemon={evolution.thirdStage}
                        currentLanguage={currentLanguage}
                      />
                    </>
                  )}
                </EvolutionRow>
              ))}
            </Bottom>
          )}
          {pokemon.forms.length > 0 && (
            <Bottom>
              <SecondaryTitle>Forms</SecondaryTitle>
              <AlternativeForms>
                {pokemon.forms.map((pokemon) => (
                  <AlternativeCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </AlternativeForms>
            </Bottom>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </Content>
  )
}

export default Pokemon
