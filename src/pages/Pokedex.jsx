import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { useGetPokemonByGenQuery } from "../features/api/apiSlice"
import Card from "../components/Card"
import Type from "../components/Type"
import { BsSearch } from "react-icons/bs"

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

const SimpleFilters = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1200px) {
    flex-direction: roW;
    justify-content: space-between;
  }
`

const Generations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 0 0 0;

  div {
    display: flex;
    flex-wrap: wrap;
  }

  h2 {
    margin: 16px 0 8px 0;
  }

  @media (min-width: 1200px) {
    margin: 16px 0 24px 76px;

    h2 {
      margin: 19px 0;
    }
  }
`

const Generation = styled.p`
  font-size: 14px;
  margin: 0 8px 8px 0;
  padding: 8px;
  background-color: rgba(217, 217, 217, 0.5);
  transition: background-color 0.1s linear;
  border-radius: 8px;

  @media (min-width: 1200px) {
    font-size: 18px;
    margin: 0 16px 0 0;
  }

  &:hover:not(.active) {
    background-color: rgba(217, 217, 217, 0.8);
    cursor: pointer;
  }

  &.active {
    font-weight: 700;
  }
`

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 16px 0;

  h2 {
    margin: 16px 0 8px 0;
  }

  select {
    background-color: rgba(217, 217, 217, 0.5);
    border: none;
    border-radius: 8px;
    width: 150px;
    padding: 8px;
    font-size: 14px;
  }

  @media (min-width: 1200px) {
    align-items: end;
    margin: 16px 76px 0 0;

    h2 {
      margin: 19px 0;
    }

    select {
      width: 150px;
      font-size: 16px;
    }
  }
`

const Grid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const TypeFilters = styled.div`
  margin: 0 0 0 0;

  h2 {
    margin: 0;
  }

  div {
    display: flex;
    align-items: center;
  }

  button {
    display: block;
    background-color: #d75050;
    border: 0;
    border-radius: 8px;
    padding: 8px;
    margin: 0 0 24px 0;
    text-transform: uppercase;
    transition: box-shadow 0.1s linear;
    font-size: 12px;

    :hover {
      cursor: pointer;
      box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
    }
  }

  @media (min-width: 1200px) {
    margin: 16px 76px 24px 76px;

    h2 {
      margin: 19px 0;
    }
  }
`

const Types = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  p {
    margin: 0 8px 16px 0;
    transition: opacity 0.1s linear;
  }

  p:hover {
    cursor: pointer;
    opacity: 1;
  }

  @media (min-width: 1200px) {
    p {
      margin: 0 16px 16px 0;
      transition: opacity 0.1s linear;
    }
  }
`
const TogglerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 16px;
`

const Toggler = styled.label`
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
  margin: 0 8px;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: #d75050;
    }
    &:focus + span {
      box-shadow: 0 0 1px #d75050;
    }
    &:checked + span:before {
      -webkit-transform: translateX(12px);
      -ms-transform: translateX(12px);
      transform: translateX(12px);
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.2s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 10px;
      width: 10px;
      left: 4px;
      bottom: 4px;
      background-color: white;
      transition: 0.2s;
      border-radius: 50%;
    }
  }

  @media (min-width: 1200px) {
    width: 50px;
    height: 28px;

    span {
      &:before {
        height: 20px;
        width: 20px;
      }
    }

    input {
      &:checked + span:before {
        -webkit-transform: translateX(22px);
        -ms-transform: translateX(22px);
        transform: translateX(22px);
      }
    }
  }
`

const Search = styled.input`
  display: block;
  width: 75%;
  max-width: 400px;
  margin: 0 auto 24px auto;
  border: 0;
  border-bottom: 1px solid #000;
  background-color: transparent;
  font-size: 16px;
  background: transparent
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E")
    no-repeat right;
  padding-right: 24px;

  &:focus {
    outline: none;
  }

  @media (min-width: 1200px) {
    font-size: 18px;
  }
`

const SearchIcon = styled(BsSearch)`
  position: absolute;
  right: 0;
`

function Pokedex() {
  const [searchParams, setSearchParams] = useSearchParams()
  const generations = [1, 2, 3, 4, 5, 6, 7, 8]

  const {
    data: list = [],
    isLoading,
    isError,
    isFetching,
    message,
  } = useGetPokemonByGenQuery(
    searchParams.get("gen") !== null ? searchParams.get("gen") : "1"
  )

  const sortedPokemon = useMemo(() => {
    const sortedPokemon = list.slice()

    if (
      searchParams.get("order") === "asc" ||
      searchParams.get("order") === null
    ) {
      // Sort pokemon in ascending ID order
      sortedPokemon.sort(function (a, b) {
        return a.id - b.id
      })
    } else if (searchParams.get("order") === "desc") {
      // Sort pokemon in ascending ID order
      sortedPokemon.sort(function (a, b) {
        return b.id - a.id
      })
    } else if (searchParams.get("order") === "az") {
      // Sort pokemon in alphabetical order from A to Z
      sortedPokemon.sort((a, b) => {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      })
    } else if (searchParams.get("order") === "za") {
      // Sort pokemon in alphabetical order from Z to A
      sortedPokemon.sort((a, b) => {
        if (a.name < b.name) {
          return 1
        }
        if (a.name > b.name) {
          return -1
        }
        return 0
      })
    }

    // Filter pokemon by type
    if (searchParams.get("type") !== null) {
      // Get all types in query URL and put each one in array as string
      const paramsTypes = searchParams.get("type").split(",")

      // As we're using sortedPokemon array both to order/filter and to loop in the return function, we can't use filter (as it would create another array)
      // We loop through array by hand
      let from = 0
      let to = 0
      while (from < sortedPokemon.length) {
        // Check if pokemon has at least one of the selected types (OR case) or both the selected types (AND operator)
        // Please note that if there's only one parameter selected then the filter will act as an "OR" (based on official pokemon website)
        if (
          searchParams.get("operator") === "or" ||
          searchParams.get("operator") === null ||
          (searchParams.get("operator") === "and" && paramsTypes.length === 1)
        ) {
          // Check if the pokemon has the type(s) selected. Always check for the first type in types array, as it is always defined, and check that the second type exists before checking if it equals to the selected type(s) (to prevent app crash)
          if (
            paramsTypes.includes(sortedPokemon[from].types[0].type.name) ||
            (sortedPokemon[from].types[1] !== undefined &&
              paramsTypes.includes(sortedPokemon[from].types[1].type.name))
          ) {
            sortedPokemon[to] = sortedPokemon[from]
            to++
          }
        } else if (
          searchParams.get("operator") === "and" &&
          paramsTypes.length === 2
        ) {
          // Select the pokémon only if it has at least two types and these types are the same as the selected ones
          if (sortedPokemon[from].types.length === 2) {
            if (
              (paramsTypes.includes(sortedPokemon[from].types[0].type.name) &&
                sortedPokemon[from].types[1] !== undefined &&
                paramsTypes.includes(sortedPokemon[from].types[1].type.name)) ||
              (sortedPokemon[from].types[1] !== undefined &&
                paramsTypes.includes(sortedPokemon[from].types[1].type.name) &&
                paramsTypes.includes(sortedPokemon[from].types[0].type.name))
            ) {
              sortedPokemon[to] = sortedPokemon[from]
              to++
            }
          }
        }
        // Increase from parameter
        from++
      }
      // "Delete" all the pokemon whose types are not included in the array by setting the sortedPokemon's length to the "to" parameter
      sortedPokemon.length = to
    }

    if (searchParams.get("search") !== null) {
      let from = 0
      let to = 0
      while (from < sortedPokemon.length) {
        if (
          sortedPokemon[from].species.name.startsWith(
            searchParams.get("search")
          )
        ) {
          sortedPokemon[to] = sortedPokemon[from]
          to++
        }
        // Increase from parameter
        from++
      }
      //sortedPokemon.map((pokemon, index) => {
      //  if (!pokemon.species.name.startsWith(searchParams.get("search"))) {
      //    sortedPokemon.splice(index, 1)
      //  }
      //})
      sortedPokemon.length = to
    }

    return sortedPokemon
  }, [list, searchParams])

  const refreshGen = (e) => {
    // When user clicks on a generation number, change the URL parameter
    setSearchParams((searchParams) => {
      searchParams.set("gen", e.target.childNodes[0].nodeValue)
      return searchParams
    })
  }

  const handleSelect = (e) => {
    // When the user selects an order criteria, change the URL parameter
    setSearchParams((searchParams) => {
      searchParams.set("order", e.target.value)
      return searchParams
    })
  }

  const handleSearch = (e) => {
    if (e.target.value === "") {
      searchParams.delete("search")
      setSearchParams(searchParams)
    } else {
      setSearchParams((searchParams) => {
        searchParams.set("search", e.target.value)
        return searchParams
      })
    }
  }

  const handleTypeClick = (e) => {
    // When user clicks on a type, change its state (from inactive to active and viceversa)
    e.target.classList.toggle("inactive")
    e.target.classList.toggle("active")
  }

  const handleTypesFilters = () => {
    const paramsFilters = []
    // Get all the selected types (this will select DOM element)
    const activeFilters = document.querySelectorAll(".type.active")
    // For each element, get its attribute "type" and put it in an array
    activeFilters.forEach((type) => {
      paramsFilters.push(type.getAttribute("type"))
    })
    // If at least one type is selected, then update the URL parameter, else delete the URL parameter
    if (activeFilters.length > 0) {
      setSearchParams((searchParams) => {
        searchParams.set("type", paramsFilters)
        return searchParams
      })
      const booleanLogic = document.getElementById("booleanLogic")
      setSearchParams((searchParams) => {
        searchParams.set("operator", booleanLogic.checked ? "and" : "or")
        return searchParams
      })
    } else {
      searchParams.delete("type")
      setSearchParams(searchParams)
    }
  }

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    )
  } else if (isError) {
    toast.error(message)
  }

  return (
    <Content>
      <SimpleFilters>
        <Generations>
          <h2>Generation</h2>
          <div>
            {generations.map((generation) => (
              <Generation
                onClick={(e) => refreshGen(e)}
                key={generation}
                className={
                  (generation.toString() === searchParams.get("gen") ||
                    (generation === 1 && searchParams.get("gen") === null)) &&
                  "active"
                }
              >
                {generation}
              </Generation>
            ))}
          </div>
        </Generations>
        <OrderList>
          <h2>Order</h2>
          <select onChange={handleSelect} defaultValue={"asc"}>
            <option value="asc">Ascendant</option>
            <option value="desc">Descendant</option>
            <option value="az">A to Z</option>
            <option value="za">Z to A</option>
          </select>
        </OrderList>
      </SimpleFilters>
      <TypeFilters>
        <div>
          <h2>Types</h2>
          <TogglerContainer>
            <p>At least one</p>
            <Toggler>
              <input id="booleanLogic" type="checkbox" />
              <span></span>
            </Toggler>
            <p>All</p>
          </TogglerContainer>
        </div>
        <Types>
          <Type
            onClick={handleTypeClick}
            type="normal"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="fire"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="water"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="electric"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="grass"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="ice"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="fighting"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="poison"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="ground"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="flying"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="psychic"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="bug"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="rock"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="ghost"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="dragon"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="dark"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="steel"
            className="type inactive"
          />
          <Type
            onClick={handleTypeClick}
            type="fairy"
            className="type inactive"
          />
        </Types>
        <button onClick={handleTypesFilters}>Apply</button>
      </TypeFilters>
      <Search
        onChange={handleSearch}
        type="text"
        id="search"
        name="search"
        placeholder="Type to search for a pokémon"
      />
      <Grid>
        {!isFetching ? (
          <>
            {sortedPokemon.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </>
        ) : (
          <Spinner />
        )}
      </Grid>
    </Content>
  )
}

export default Pokedex
