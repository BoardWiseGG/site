import * as React from "react"
import clsx from "clsx"

import type { Query } from "../types/Query"

import FilterIcon from "../icons/Filter"
import RightArrowIcon from "../icons/RightArrow"
import RisingGraphIcon from "../icons/RisingGraph"
import { Button } from "./Button"

interface FilterOption {
  title: string
  Icon: ({ ...props }: { [x: string]: any }) => React.JSX.Element
  enable: (q: Query) => Query
  isEnabled: (q: Query) => boolean
}

const filters: FilterOption[] = [
  {
    title: "FIDE 2000+",
    Icon: RisingGraphIcon,
    enable: (q) => {
      q.fideRating[0] = Math.max(2000, q.fideRating[0])
      return q
    },
    isEnabled: (q) => q.fideRating[0] >= 2000,
  },
]

enum Direction {
  LEFT,
  RIGHT,
}

interface FilterScrollProps {
  query: Query
  onModal: () => void
  onEnable: (q: Query) => void
}

export function FilterScroll({ query, onModal, onEnable }: FilterScrollProps) {
  const viewport = React.useRef<HTMLDivElement>(null)
  const [isFlush, setIsFlush] = React.useState([true, false])

  const scrollDir = (dir: Direction) => {
    const v = viewport.current
    if (!v) {
      return
    }
    const delta = v.clientWidth / 2
    const left = v.scrollLeft + (dir == Direction.RIGHT ? delta : -delta)
    v.scroll({ left, behavior: "smooth" })

    const isFlushLeft = left <= 1
    const isFlushRight = left + v.clientWidth >= v.scrollWidth
    setIsFlush([isFlushLeft, isFlushRight])
  }

  return (
    <div className="flex items-center gap-x-8">
      <div className="relative flex overflow-hidden">
        <div
          ref={viewport}
          className="flex items-center gap-x-12 overflow-hidden"
        >
          {[...filters].map((e) => (
            <div
              key={e.title}
              className={clsx("flex-none cursor-pointer text-center", {
                "fill-amber-500 text-amber-500": e.isEnabled(query),
              })}
              onClick={() => onEnable(e.enable({ ...query }))}
            >
              <e.Icon className="mx-auto h-6 w-6" />
              <span className="text-xs">{e.title}</span>
            </div>
          ))}
        </div>
        <div
          className={clsx(
            "pointer-events-none absolute top-1/2 -translate-y-1/2 bg-gradient-to-r from-white to-transparent to-90% py-4 pr-60",
            isFlush[0] ? "hidden" : ""
          )}
        >
          <Button
            className="pointer-events-auto rounded-full border border-neutral-900 py-4"
            onClick={() => {
              scrollDir(Direction.LEFT)
            }}
            invert
          >
            <RightArrowIcon className="h-3 w-3 rotate-180 fill-white" />
          </Button>
        </div>
        <div
          className={clsx(
            "pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent from-10% to-white py-4 pl-60",
            isFlush[1] ? "hidden" : ""
          )}
        >
          <Button
            className="pointer-events-auto rounded-full border border-neutral-900 py-4"
            onClick={() => {
              scrollDir(Direction.RIGHT)
            }}
            invert
          >
            <RightArrowIcon className="h-3 w-3 fill-white" />
          </Button>
        </div>
      </div>
      <Button className="flex gap-x-2 py-4" onClick={onModal}>
        <FilterIcon className="h-6 w-6 fill-white" />
        <span className="font-display">Filter</span>
      </Button>
    </div>
  )
}
