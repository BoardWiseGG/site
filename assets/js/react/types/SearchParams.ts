import { Mode } from "./Mode"

export type SearchParams = {
  rating: [number, number]
  modes: Mode[]
  languages: string[]
}

export const FIDE_RATING_MIN = 1500
export const FIDE_RATING_MAX = 3200

export const defaultSearchParams: SearchParams = {
  rating: [FIDE_RATING_MIN, FIDE_RATING_MAX],
  modes: [Mode.RAPID, Mode.BLITZ, Mode.BULLET],
  languages: [],
}
