import * as React from "react"

import type { SearchParams } from "../types/SearchParams"

import { Container } from "../components/Container"
import { FadeIn } from "../components/FadeIn"
import { FallbackMessage } from "../components/FallbackMessage"
import { Loading } from "../components/Loading"
import { SearchResult } from "../components/SearchResult"
import { SortModal } from "../components/SortModal"
import { SortScroll } from "../components/SortScroll"
import { defaultSearchParams } from "../types/SearchParams"
import { useCoachesInfiniteQuery } from "../utils/queries"

function SearchResults({ searchParams }: { searchParams: SearchParams }) {
  const { isLoading, isError, data, fetchNextPage, hasNextPage, isFetching } =
    useCoachesInfiniteQuery(searchParams)

  const resultsRef = React.useRef<HTMLDivElement | null>(null)

  const handleScroll = React.useCallback(() => {
    if (!resultsRef.current) {
      return
    }
    const resultRect = resultsRef.current.getBoundingClientRect()
    if (!isFetching && hasNextPage && resultRect.bottom < 800) {
      fetchNextPage()
    }
  }, [isFetching, hasNextPage, resultsRef])

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isFetching, hasNextPage, resultsRef])

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
    <>
      <div
        ref={resultsRef}
        className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {data?.pages.map((group, index) => (
          <React.Fragment key={index}>
            {group.map((coach) => (
              <FadeIn
                key={`${coach.site}-${coach.username}`}
                className="flex flex-col"
              >
                <SearchResult coach={coach} />
              </FadeIn>
            ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage ? <Loading className="pt-20" loading /> : null}
    </>
  )
}

export function Search() {
  const [searchParams, setSearchParams] = React.useState(defaultSearchParams)
  const [modalOpen, setModalOpen] = React.useState(false)

  return (
    <Container className="pt-8">
      <SortScroll
        params={searchParams}
        onSelect={setSearchParams}
        onModal={() => setModalOpen(true)}
      />
      <SortModal
        open={modalOpen}
        defaultValues={searchParams}
        onClose={() => setModalOpen(false)}
        onSubmit={(q) => {
          setSearchParams(q)
          setModalOpen(false)
        }}
      />
      <SearchResults searchParams={searchParams} />
    </Container>
  )
}
