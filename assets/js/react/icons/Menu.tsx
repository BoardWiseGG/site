import * as React from "react"

const SvgComponent = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    aria-hidden="true"
    {...props}
  >
    <path d="M2 6h20v2H2zM2 16h20v2H2z" />
  </svg>
)

export default SvgComponent
