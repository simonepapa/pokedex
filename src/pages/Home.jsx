import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import { useGetPokemonByNameQuery } from "../features/api/apiSlice"

function Home() {
  const {
    data: pokemon,
    isLoading,
    isSuccess,
    isError,
    message,
  } = useGetPokemonByNameQuery("bulbasaur")

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    toast.error(message)
  } else if (isSuccess) {
    console.log(pokemon)
  }

  return <div>Home</div>
}

export default Home
