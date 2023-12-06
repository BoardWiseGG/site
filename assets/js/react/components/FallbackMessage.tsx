import * as React from "react"
import clsx from "clsx"

import { FadeIn } from "./FadeIn"

export type FallbackMessageProps = {
  title: string
  body: string
} & React.ComponentPropsWithoutRef<"div">

export const FallbackMessage = React.forwardRef(function FallbackMessage(
  props: FallbackMessageProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const { title, body, className, ...other } = props
  return (
    <FadeIn
      ref={ref}
      className={clsx("flex flex-col items-center text-center", className)}
      {...other}
    >
      <h1 className="font-display text-2xl font-semibold text-neutral-950">
        {title}
      </h1>
      <p className="mt-2 text-sm text-neutral-600">{body}</p>
    </FadeIn>
  )
})
