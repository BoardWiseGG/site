import * as React from "react"

import type { Query } from "../types/Query"

import { CaptionImage } from "../components/CaptionImage"
import { Container } from "../components/Container"
import { FadeIn, FadeInStagger } from "../components/FadeIn"
import { FallbackMessage } from "../components/FallbackMessage"
import { FilterScroll } from "../components/FilterScroll"
import { Loading } from "../components/Loading"

const FIDE_RATING_MIN = 1500
const FIDE_RATING_MAX = 3200

interface Coach {
  id: string
  imageUrl: string
  name: string
  title: string
  slug: string
}

const defaultQuery: Query = {
  fideRating: [FIDE_RATING_MIN, FIDE_RATING_MAX],
}

export function Search() {
  const [query, setQuery] = React.useState<Query>(defaultQuery)
  const [loading, setLoading] = React.useState(true)
  const [coaches, setCoaches] = React.useState<Coach[]>([])

  return (
    <Container className="pt-8">
      <FilterScroll query={query} onEnable={setQuery} onModal={() => {}} />
      <Loading
        className={loading || coaches.length === 0 ? "mt-40" : "mt-10"}
        loading={loading}
      >
        {coaches.length > 0 ? (
          <FadeInStagger
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            faster
          >
            {coaches.map((coach, index) => (
              <FadeIn key={index} className="flex cursor-pointer flex-col">
                <CaptionImage
                  title={coach.name}
                  subtitle={coach.title || undefined}
                  src={coach.imageUrl}
                />
              </FadeIn>
            ))}
          </FadeInStagger>
        ) : (
          <FallbackMessage
            title="Coming Soon"
            body="Full search functionality will be added soon! Please come back later."
          />
        )}
      </Loading>
    </Container>
  )
}
