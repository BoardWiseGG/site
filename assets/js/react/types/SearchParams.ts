export type SearchParams = {
  fideRating: [number, number]
}

const FIDE_RATING_MIN = 1500
const FIDE_RATING_MAX = 3200

export const defaultSearchParams: SearchParams = {
  fideRating: [FIDE_RATING_MIN, FIDE_RATING_MAX],
}
