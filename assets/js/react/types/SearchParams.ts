export type SearchParams = {
  fideRating: [number, number]
}

export const FIDE_RATING_MIN = 1500
export const FIDE_RATING_MAX = 3200

export const defaultSearchParams: SearchParams = {
  fideRating: [FIDE_RATING_MIN, FIDE_RATING_MAX],
}
