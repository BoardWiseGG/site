import * as React from "react"

const SvgComponent = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...props}>
    <path
      d="M30.8 2.29a.49.49 0 0 0-.45-.29H16.42a.5.5 0 0 0-.42.23l-10.71 17a.49.49 0 0 0 .41.77h7.67L6.6 33.25a.52.52 0 0 0 .46.75h3a.5.5 0 0 0 .37-.16L28 14.85a.5.5 0 0 0-.37-.85h-6.74l9.83-11.18a.49.49 0 0 0 .08-.53Z"
      className="clr-i-solid clr-i-solid-path-1"
    />
    <path fill="none" d="M0 0h36v36H0z" />
  </svg>
)

export default SvgComponent
