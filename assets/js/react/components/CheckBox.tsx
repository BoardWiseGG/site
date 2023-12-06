import * as React from "react"
import clsx from "clsx"
import {
  Input as BaseInput,
  InputOwnerState,
  InputProps,
  MultiLineInputProps,
} from "@mui/base/Input"

import { FieldContext } from "./FieldSet"
import { resolveSlotProps } from "../utils/props"

export type CheckBoxProps = Omit<InputProps, keyof MultiLineInputProps>

export const CheckBox = React.forwardRef<HTMLInputElement, CheckBoxProps>(
  function CheckBox(
    props: CheckBoxProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const fieldContext = React.useContext(FieldContext)
    const { disabled = fieldContext?.disabled, className, ...other } = props

    const inputSlotProps = (ownerState: InputOwnerState) => {
      const resolved = resolveSlotProps(props.slotProps?.input, ownerState)
      return {
        ...resolved,
        className: clsx(
          "w-5 h-5 accent-black cursor-pointer -translate-y-[3px]",
          resolved?.className
        ),
        style: {
          color: "black",
        },
      }
    }

    return (
      <BaseInput
        ref={ref}
        {...other}
        type="checkbox"
        className={clsx("h-5 w-5", { "opacity-60": disabled }, className)}
        slotProps={{ input: inputSlotProps }}
        disabled={disabled}
      />
    )
  }
)
