import * as React from "react"
import clsx from "clsx"
import {
  Input as BaseInput,
  InputProps,
  InputOwnerState,
} from "@mui/base/Input"

import { FieldContext } from "./FieldSet"
import { resolveSlotProps } from "../utils/props"

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(props: InputProps, ref: React.ForwardedRef<HTMLInputElement>) {
    const fieldContext = React.useContext(FieldContext)
    const { disabled = fieldContext?.disabled, ...other } = props

    const inputSlotProps = (ownerState: InputOwnerState) => {
      const resolved = resolveSlotProps(props.slotProps?.input, ownerState)
      return {
        ...resolved,
        className: clsx(
          "text-sm font-normal leading-5 px-3 py-2 rounded-lg shadow-md border border-solid shadow-slate-100 focus:shadow-lg bg-white text-slate-900",
          fieldContext?.error
            ? "border-amber-800 focus-visible:outline focus-visible:outline-1 focus-visible:outline-amber-800"
            : "border-slate-300",
          { "opacity-60": ownerState.disabled },
          resolved?.className
        ),
      }
    }

    return (
      <BaseInput
        ref={ref}
        {...other}
        slotProps={{ input: inputSlotProps }}
        disabled={disabled}
      />
    )
  }
)
