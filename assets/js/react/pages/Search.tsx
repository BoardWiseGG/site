import * as React from "react"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

import type { Coach } from "../types/Coach"

import { Container } from "../components/Container"
import { FadeIn, FadeInStagger } from "../components/FadeIn"
import { FallbackMessage } from "../components/FallbackMessage"
import { FilterModal } from "../components/FilterModal"
import { FilterScroll } from "../components/FilterScroll"
import { Loading } from "../components/Loading"
import { SearchResult } from "../components/SearchResult"
import { defaultSearchParams } from "../types/SearchParams"

function SearchResults() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["coaches"],
    queryFn: async () => {
      const response = await axios.get<{ data: Coach[] }>("/api/coaches/")
      return response.data.data
    },
  })

  if (isLoading) {
    return <Loading className="mt-40" loading />
  }

  if (isError) {
    return (
      <FallbackMessage
        className="mt-40"
        title="Blunder!"
        body="Our tech team is working to restore the checkmate."
      />
    )
  }

  return (
    <FadeInStagger
      className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      faster
    >
      {data?.map((coach, index) => (
        <FadeIn key={index} className="flex cursor-pointer flex-col">
          <SearchResult
            src={coach.image_url ?? ""}
            title={coach.name ?? ""}
            subtitle={coach.name ?? ""}
          />
        </FadeIn>
      ))}
    </FadeInStagger>
  )
}

export function Search() {
  const [searchParams, setSearchParams] = React.useState(defaultSearchParams)
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <Container className="pt-8">
      <FilterScroll
        params={searchParams}
        onSelect={setSearchParams}
        onModal={() => setModalOpen(true)}
      />
      <FilterModal
        open={modalOpen}
        defaultValues={searchParams}
        onClose={() => setModalOpen(false)}
        onSubmit={(q) => {
          setSearchParams(q)
          setModalOpen(false)
        }}
      />
      <SearchResults />
    </Container>
  )
}
