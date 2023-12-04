import * as React from "react"
import clsx from "clsx"

import { FieldContext } from "./FieldSet"

type LabelProps = {
  children: React.ReactNode
  sublabel?: boolean
} & React.ComponentPropsWithoutRef<"label">

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  function Label(props, ref) {
    const fieldContext = React.useContext(FieldContext)
    const { children, sublabel, className, ...other } = props

    return (
      <label
        ref={ref}
        {...other}
        className={clsx(
          "block font-semibold",
          {
            'text-neutral-850 before:content-["*"]':
              fieldContext?.required && !sublabel,
            "text-neutral-600/80": !fieldContext?.required,
            "text-sm": sublabel,
            "opacity-60": fieldContext?.disabled,
          },
          className
        )}
      >
        {children}
      </label>
    )
  }
)
