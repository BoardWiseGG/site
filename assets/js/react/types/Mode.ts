export enum Mode {
  RAPID = "RAPID",
  BLITZ = "BLITZ",
  BULLET = "BULLET",
}

export const getModeName = (m: Mode) => {
  return m.charAt(0) + m.toLowerCase().slice(1)
}
