import { useEffect, useState } from "react"

export const useLocalStorage = (key) => {
  const [value, setValue] = useState()

  useEffect(() => {
    if (localStorage.getItem(key) === null && key === "boxes") {
      localStorage.setItem(
        key,
        JSON.stringify({
          0: [
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
          ],
          1: [
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
          ],
          2: [
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
          ],
          3: [
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
            { sprite: "", shiny: false, gender: "" },
          ],
        })
      )
    } else if (localStorage.getItem(key) !== null && key === "boxes") {
      setValue(JSON.parse(localStorage.getItem(key)))
    }

    if (localStorage.getItem(key) === null && key === "team") {
      localStorage.setItem(
        key,
        JSON.stringify([
          { sprite: "", shiny: false, gender: "" },
          { sprite: "", shiny: false, gender: "" },
          { sprite: "", shiny: false, gender: "" },
          { sprite: "", shiny: false, gender: "" },
          { sprite: "", shiny: false, gender: "" },
          { sprite: "", shiny: false, gender: "" },
        ])
      )
    } else if (localStorage.getItem(key) !== null && key === "team") {
      setValue(JSON.parse(localStorage.getItem(key)))
    }
  }, [key])

  return [value]
}
