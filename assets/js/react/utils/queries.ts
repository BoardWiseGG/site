import axios from "axios"
import { useQuery, useInfiniteQuery } from "@tanstack/react-query"

import type { Coach } from "../types/Coach"
import type { Language } from "../types/Language"
import type { SearchParams } from "../types/SearchParams"

export const useCoachesInfiniteQuery = (searchParams: SearchParams) => {
  return useInfiniteQuery({
    queryKey: ["coaches", searchParams],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get<{ data: Coach[] }>("/api/coaches/", {
        params: {
          page_no: pageParam,
          page_size: 15,
        },
      })
      return response.data.data
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
  })
}

export const useLanguagesQuery = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: async () => {
      const response = await axios.get<{ data: Language[] }>("/api/languages/")
      return response.data.data
    },
  })
}
