import * as React from "react"
import clsx from "clsx"

import LogoMark from "../icons/Logomark"

export function Logo({
  invert = false,
}: React.ComponentPropsWithoutRef<"svg"> & { invert?: boolean }) {
  return (
    <div className="mr-4 flex flex-nowrap items-center justify-start">
      <LogoMark
        className="mr-4 duration-500 ease-in-out hover:rotate-180"
        invert={invert}
      />
      <p
        className={clsx(
          "font-display text-xl font-bold tracking-tight",
          invert ? "text-white" : "text-neutral-950"
        )}
      >
        BoardWise
      </p>
    </div>
  )
}
