import { Mode } from "./Mode"
import { Site } from "./Site"
import { Title } from "./Title"

export type SearchParams = {
  rating: [number, number]
  modes: Mode[]
  languages: string[]
  titles: Title[]
  sites: Site[]
}

export const FIDE_RATING_MIN = 1500
export const FIDE_RATING_MAX = 3200

export const defaultSearchParams: SearchParams = {
  rating: [FIDE_RATING_MIN, FIDE_RATING_MAX],
  modes: [Mode.RAPID, Mode.BLITZ, Mode.BULLET],
  languages: [],
  titles: [],
  sites: [Site.CHESSCOM, Site.LICHESS],
}

export function toQueryParams(p: SearchParams) {
  const queryParams: { [key: string]: any } = {}

  if (p.sites.length > 0) {
    queryParams["sites"] = p.sites.join(",")
  }

  for (const mode of p.modes) {
    queryParams[`${mode.toLowerCase()}_gte`] = p.rating[0]
    queryParams[`${mode.toLowerCase()}_lte`] = p.rating[1]
  }

  if (p.languages.length > 0) {
    queryParams["languages"] = p.languages.join(",")
  }

  if (p.titles) {
    queryParams["titles"] = p.titles.join(",")
  }

  return queryParams
}
