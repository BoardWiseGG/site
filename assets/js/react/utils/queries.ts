import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import type { Coach } from "../types/Coach"
import type { Language } from "../types/Language"

export const useFetchCoaches = () => {
  return useQuery({
    queryKey: ["api", "coaches"],
    queryFn: async () => {
      const response = await axios.get<{ data: Coach[] }>("/api/coaches/")
      return response.data.data
    },
  })
}

export const useFetchLanguages = () => {
  return useQuery({
    queryKey: ["api", "languages"],
    queryFn: async () => {
      const response = await axios.get<{ data: Language[] }>("/api/languages/")
      return response.data.data
    },
  })
}
