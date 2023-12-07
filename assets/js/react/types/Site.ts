export enum Site {
  CHESSCOM = "chesscom",
  LICHESS = "lichess",
}

export function getSiteName(site: Site) {
  switch (site) {
    case Site.CHESSCOM:
      return "Chess.com"
    case Site.LICHESS:
      return "Lichess"
    default:
      const _exhaustivenessCheck: never = site
      return _exhaustivenessCheck
  }
}
