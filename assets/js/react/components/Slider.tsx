import * as React from "react"
import clsx from "clsx"
import {
  Slider as BaseSlider,
  SliderProps as BaseSliderProps,
  SliderOwnerState,
} from "@mui/base/Slider"

import { resolveSlotProps } from "../utils/props"

export type SliderProps = BaseSliderProps

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  function Slider(
    props: SliderProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const rootSlotProps = (ownerState: SliderOwnerState) => {
      const resolved = resolveSlotProps(props.slotProps?.root, ownerState)
      return {
        ...resolved,
        className: clsx("hover:opacity-100", resolved?.className),
      }
    }

    const railSlotProps = (ownerState: SliderOwnerState) => {
      const resolved = resolveSlotProps(props.slotProps?.rail, ownerState)
      return {
        ...resolved,
        className: clsx(
          "block absolute w-full h-1 rounded-sm bg-slate-300",
          resolved?.className
        ),
      }
    }

    const trackSlotProps = (ownerState: SliderOwnerState) => {
      const resolved = resolveSlotProps(props.slotProps?.track, ownerState)
      return {
        ...resolved,
        className: clsx(
          "block absolute w-full h-1 rounded-sm bg-current",
          resolved?.className
        ),
      }
    }

    const thumbSlotProps = (ownerState: SliderOwnerState) => {
      const resolved = resolveSlotProps(props.slotProps?.thumb, ownerState)
      return {
        ...resolved,
        className: clsx(
          "absolute w-6 h-6 -ml-2 -mt-2.5 box-border rounded-full bg-current hover:shadow hover:shadow-slate-300",
          resolved?.className
        ),
      }
    }

    const markSlotProps = (ownerState: SliderOwnerState) => {
      const resolved = resolveSlotProps(props.slotProps?.mark, ownerState)
      return {
        ...resolved,
        className: clsx(
          "absolute w-1 h-1 opacity-70 bg-current rounded-sm -translate-x-2/4 top-1/2",
          resolved?.className
        ),
      }
    }

    const markLabelSlotProps = (ownerState: SliderOwnerState) => {
      const resolved = resolveSlotProps(props.slotProps?.markLabel, ownerState)
      return {
        ...resolved,
        className: clsx(
          "absolute text-sm top-5 -translate-x-1/2",
          resolved?.className
        ),
      }
    }

    return (
      <BaseSlider
        ref={ref}
        {...props}
        className={clsx(
          "relative inline-block h-1.5 w-full cursor-pointer touch-none",
          props.className
        )}
        slotProps={{
          ...props.slotProps,
          root: rootSlotProps,
          rail: railSlotProps,
          track: trackSlotProps,
          thumb: thumbSlotProps,
          mark: markSlotProps,
          markLabel: markLabelSlotProps,
        }}
      />
    )
  }
)
