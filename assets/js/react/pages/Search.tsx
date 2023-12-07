import * as React from "react"

import type { SearchParams } from "../types/SearchParams"

import { Container } from "../components/Container"
import { FadeIn } from "../components/FadeIn"
import { FallbackMessage } from "../components/FallbackMessage"
import { FilterModal } from "../components/FilterModal"
import { FilterScroll } from "../components/FilterScroll"
import { Loading } from "../components/Loading"
import { SearchResult } from "../components/SearchResult"
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
                className="flex cursor-pointer flex-col"
              >
                <SearchResult
                  src={coach.image_url ?? ""}
                  title={coach.name ?? ""}
                  subtitle={coach.title ?? ""}
                  target="_blank"
                  href={
                    coach.site === "lichess"
                      ? `https://lichess.org/coach/${coach.username}`
                      : coach.site === "chesscom"
                        ? `https://www.chess.com/member/${coach.username}`
                        : undefined
                  }
                />
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
      <SearchResults searchParams={searchParams} />
    </Container>
  )
}
