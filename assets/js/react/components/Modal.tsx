import * as React from "react"
import clsx from "clsx"
import {
  Modal as BaseModal,
  ModalBackdropSlotProps,
  ModalProps,
} from "@mui/base/Modal"

import XIcon from "../icons/X"
import { FadeIn } from "./FadeIn"

const Backdrop = React.forwardRef<HTMLDivElement, ModalBackdropSlotProps>(
  function Backdrop(props, ref) {
    const { open, ownerState, onClick, ...other } = props

    return (
      <div
        className={clsx(
          { "MuiBackdrop-open": open },
          "fixed inset-0 z-[-1] bg-neutral-800/60"
        )}
        onClick={onClick}
      >
        <div ref={ref} {...other} />
      </div>
    )
  }
)

type FrameProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    as?: T
    title: string
    footer: React.ReactNode
    onClose?: ModalProps["onClose"]
  }

function Frame<T extends React.ElementType>(props: FrameProps<T>) {
  const { as, title, footer, onClose, children, ...other } = props
  let Component = as ?? "div"

  return (
    <Component
      className="flex h-full w-full flex-col justify-center rounded-lg bg-white"
      {...other}
    >
      <div className="relative flex-none border-b-2 p-4 text-center">
        <XIcon
          className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer"
          onClick={onClose}
        />
        <span className="h1 font-display font-bold">{title}</span>
      </div>
      <div className="flex-1 overflow-scroll px-8 py-12">{children}</div>
      <div className="flex-none border-t-2 p-4">{footer}</div>
    </Component>
  )
}

export function Modal<T extends React.ElementType = "div">(
  props: ModalProps & { frame?: FrameProps<T> }
) {
  const { className, children, frame, onClose, ...other } = props

  return (
    <BaseModal
      className={clsx(
        "fixed z-[100] flex items-center justify-center text-base text-black",
        className
      )}
      slots={{ backdrop: Backdrop }}
      onClose={onClose}
      {...other}
    >
      <div className="fixed inset-0 mt-8 md:inset-x-[18%] md:inset-y-16 md:mt-0">
        <FadeIn
          className="relative h-full w-full"
          transition={{ duration: 0.2 }}
        >
          {frame ? (
            <Frame {...frame} onClose={onClose}>
              {children}
            </Frame>
          ) : (
            children
          )}
        </FadeIn>
      </div>
    </BaseModal>
  )
}

Modal.displayName = "Modal"
