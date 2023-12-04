import * as React from "react"

import LogoMark from "../icons/LogoMark"

function Fallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <LogoMark size={30} className="animate-[spin_2.5s_linear_infinite]" />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

type LoadingProps = React.ComponentPropsWithoutRef<"div"> & {
  loading: boolean
}

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  function Loading(props, ref) {
    const { loading, children, ...other } = props
    return (
      <div ref={ref} {...other}>
        {loading ? <Fallback /> : children}
      </div>
    )
  }
)
