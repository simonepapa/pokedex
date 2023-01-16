import { useMemo } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { useGetPokemonByIdQuery } from "../features/api/apiSlice"
import Type from "../components/Type"

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
  max-width: 1200px;
  width: 95vw;
  margin: 8px auto 0 auto;
  background-color: #ababab;
  padding: 16px;
`

const Info = styled.div`
  display: flex;
  width: 95%;
  margin: 0 auto;
`
const Left = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 40%;
  max-width: 40%;
  margin-right: 8px;
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  height: fit-content;
  margin: auto 0;
  padding: 16px 0;
`

const Right = styled.div`
  flex: 60%;
  max-width: 60%;
  margin-left: 8px;
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  padding: 8px 24px 24px 24px;
  height: fit-content;
`

const Sprite = styled.img`
  max-width: 90%;
  width: auto;
  height: 90%;
`

const Description = styled.p`
  font-size: 18px;
`

const Stats = styled.div`
  max-width: 70%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background-color: #42adbb80;
  border-radius: 8px;
  padding: 16px;
`

const StatName = styled.h3`
  margin: 16px 0 8px 0;
`

const StatValue = styled.p`
  margin: 0 0 8px 0;
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
`

const SecondaryTitle = styled.h2`
  margin: 0 16px;
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

function Pokemon() {
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
              <Sprite
                src={
                  pokemon.pokemon.sprites.other.dream_world.front_default !==
                  null
                    ? pokemon.pokemon.sprites.other.dream_world.front_default
                    : pokemon.pokemon.sprites.other.home.front_default
                }
                alt={`Sprite of ${pokemon.pokemon.name}`}
              />
            </Left>
            <Right>
              <h1>
                {pokemon.pokemon.name.charAt(0).toUpperCase() +
                  pokemon.pokemon.name.slice(1)}
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
                {
                  pokemon.pokemonSpecies.flavor_text_entries.find(
                    (e) => e.language.name === "en"
                  ).flavor_text
                }
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
                  <StatName>Abilities</StatName>
                  {pokemon.pokemon.abilities.map((ability) => (
                    <StatValue key={ability.ability.name}>
                      {ability.ability.name.charAt(0).toUpperCase() +
                        ability.ability.name.slice(1)}{" "}
                      {ability.is_hidden === true && "(Hidden)"}
                    </StatValue>
                  ))}
                  <StatValue></StatValue>
                  <StatValue></StatValue>
                </div>
              </Stats>
              <div>
                <StatName>Types</StatName>
                <Types>
                  {pokemon.pokemon.types.map((type) => (
                    <Type
                      key={`${pokemon.pokemon.id} + ${type.type.name}`}
                      type={type.type}
                    />
                  ))}
                </Types>
              </div>
            </Right>
          </Info>
          <Bottom>
            <SecondaryTitle>Stats</SecondaryTitle>
            <Grid>
              {pokemon.pokemon.stats.map((stat) => {
                return (
                  <SingleStat>
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
        </>
      ) : (
        <Spinner />
      )}
    </Content>
  )
}

export default Pokemon
