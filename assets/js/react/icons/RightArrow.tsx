import * as React from "react"

const SvgComponent = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      fill: "none",
      stroke: "currentcolor",
      strokeWidth: "5.33333px",
      overflow: "visible",
    }}
    viewBox="0 0 32 32"
    {...props}
  >
    <path d="m12 4 11.3 11.3a1 1 0 0 1 0 1.4L12 28" />
  </svg>
)

export default SvgComponent
