import { type Modifier } from "@popperjs/core"

export const sameWidth: Partial<Modifier<any, any>> = {
  name: "sameWidth",
  phase: "beforeWrite",
  enabled: true,
  requires: ["computeStyles"],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }) => {
    if ("offsetWidth" in state.elements.reference) {
      state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`
    }
  },
}
