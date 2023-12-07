export enum Mode {
  RAPID = "RAPID",
  BLITZ = "BLITZ",
  BULLET = "BULLET",
}

export const getModeName = (mode: Mode) => {
  return mode.charAt(0) + mode.toLowerCase().slice(1)
}
