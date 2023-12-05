import * as React from "react"

const SvgComponent = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M13 31V17h8M13 24h7.5M13 31h7.5M26 31V19M26 31v-6.5a4.5 4.5 0 0 1 4.5-4.5v0a4.5 4.5 0 0 1 4.5 4.5V31"
    />
    <rect
      width={36}
      height={36}
      x={6}
      y={6}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      rx={3}
    />
  </svg>
)

export default SvgComponent
