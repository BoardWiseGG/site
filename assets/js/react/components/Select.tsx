import * as React from "react"
import clsx from "clsx"

import {
  Select as BaseSelect,
  SelectProps,
  SelectOwnerState,
} from "@mui/base/Select"
import {
  Option as BaseOption,
  OptionProps,
  OptionOwnerState,
} from "@mui/base/Option"

import { FieldContext } from "./FieldSet"
import { resolveSlotProps } from "../utils/props"
import { sameWidth } from "../utils/popperjs"

export const Option = React.forwardRef<HTMLLIElement, OptionProps<string>>(
  function Option(props, ref) {
    const rootSlotProps = (ownerState: OptionOwnerState<string>) => {
      const resolved = resolveSlotProps(props.slotProps?.root, ownerState)
      return {
        ...resolved,
        className: clsx(
          "list-none p-2 rounded-lg cursor-default last-of-type:border-b-0",
          ownerState.disabled
            ? "text-slate-400"
            : "hover:bg-slate-100 hover:text-slate-900",
          {
            "font-bold": ownerState.selected,
            "bg-slate-100 text-slate-900":
              ownerState.selected || ownerState.highlighted,
          },
          resolved?.className
        ),
      }
    }

    return (
      <BaseOption ref={ref} {...props} slotProps={{ root: rootSlotProps }} />
    )
  }
)

export const Select = React.forwardRef(function Select<
  TValue extends {},
  Multiple extends boolean,
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const fieldContext = React.useContext(FieldContext)
  const { disabled = fieldContext?.disabled, slotProps, ...other } = props

  const rootSlotProps = (ownerState: SelectOwnerState<TValue, Multiple>) => {
    const resolved = resolveSlotProps(slotProps?.root, ownerState)
    return {
      ...resolved,
      className: clsx(
        "text-sm box-border px-3 py-2 rounded-lg text-left bg-white border border-solid text-slate-900 transition-all hover:bg-slate-50 outline-0 shadow shadow-slate-100 after:float-right",
        ownerState.open ? 'after:content-["▴"]' : 'after:content-["▾"]',
        ownerState.disabled ? "opacity-60" : "",
        fieldContext?.error
          ? "border-amber-800 focus-visible:outline focus-visible:outline-1 focus-visible:outline-amber-800"
          : "border-slate-300",
        resolved?.className
      ),
    }
  }

  const listboxSlotProps = (ownerState: SelectOwnerState<TValue, Multiple>) => {
    const resolved = resolveSlotProps(slotProps?.listbox, ownerState)
    return {
      ...resolved,
      className: clsx(
        "text-sm p-1.5 my-3 rounded-xl h-60 overflow-auto outline-0 bg-white border border-solid border-slate-200 text-slate-900 shadow shadow-slate-100",
        resolved?.className
      ),
    }
  }

  const popperSlotProps = (ownerState: SelectOwnerState<TValue, Multiple>) => {
    const resolved = resolveSlotProps(slotProps?.popper, ownerState)
    return {
      ...resolved,
      className: clsx("z-[1000]", resolved?.className),
      modifiers: [sameWidth],
    }
  }

  return (
    <BaseSelect
      ref={ref}
      {...other}
      slotProps={{
        ...slotProps,
        root: rootSlotProps,
        listbox: listboxSlotProps,
        popper: popperSlotProps,
      }}
      disabled={disabled}
    />
  )
})
