import * as React from "react"
import clsx from "clsx"

import MenuIcon from "../icons/Menu"
import XIcon from "../icons/X"
import { Container } from "./Container"
import { Logo } from "./Logo"

type HeaderProps = {
  panelId: string
  expanded: boolean
  onToggle: () => void
  toggleRef: React.RefObject<HTMLButtonElement>
  invert?: boolean
}

export function Header({
  panelId,
  expanded,
  onToggle,
  toggleRef,
  invert = false,
}: HeaderProps) {
  const Icon = expanded ? XIcon : MenuIcon
  const iconClasses = clsx(
    "h-6 w-6",
    invert
      ? "fill-white group-hover:fill-neutral-200"
      : "fill-neutral-950 group-hover:fill-neutral-700"
  )

  return (
    <Container>
      <div className="flex items-center justify-between">
        <a href="/" aria-label="Home">
          <Logo className="h-8" invert={invert} />
        </a>
        <div className="flex items-center gap-x-8">
          <button
            ref={toggleRef}
            type="button"
            onClick={onToggle}
            aria-expanded={expanded ? "true" : "false"}
            aria-controls={panelId}
            className={clsx(
              "group -m-2.5 rounded-full p-2.5 transition",
              invert ? "hover:bg-white/10" : "hover:bg-neutral-950/10"
            )}
            aria-label="Toggle navigation"
          >
            <Icon className={iconClasses} />
          </button>
        </div>
      </div>
    </Container>
  )
}
