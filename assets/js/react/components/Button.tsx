import * as React from "react"
import clsx from "clsx"
import { Button as BaseButton, ButtonProps } from "@mui/base/Button"

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & { invert?: boolean; href?: string }
>(function Button(props, ref) {
  const { invert, className, href, ...other } = props

  const button = (
    <BaseButton
      ref={ref}
      className={clsx(
        "cursor-pointer rounded-lg px-4 py-1.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50",
        invert
          ? "bg-white text-neutral-950 hover:bg-neutral-200"
          : "bg-neutral-950 text-white hover:bg-neutral-800",
        className
      )}
      {...other}
    />
  )

  if (href === undefined) {
    return button
  }

  return <a href={href}>{button}</a>
})
