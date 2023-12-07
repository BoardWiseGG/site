import * as React from "react"
import clsx from "clsx"

import type { SearchParams } from "../types/SearchParams"

import BulletIcon from "../icons/Bullet"
import EnglishIcon from "../icons/English"
import FilterIcon from "../icons/Filter"
import KnightIcon from "../icons/Knight"
import LightningIcon from "../icons/Lightning"
import PawnIcon from "../icons/Pawn"
import RabbitIcon from "../icons/Rabbit"
import RightArrowIcon from "../icons/RightArrow"
import RisingGraphIcon from "../icons/RisingGraph"
import TrophyIcon from "../icons/Trophy"
import { Button } from "./Button"
import { Mode } from "../types/Mode"
import { Site } from "../types/Site"
import { Title } from "../types/Title"

interface FilterOption {
  title: string
  Icon: ({ ...props }: { [x: string]: any }) => React.JSX.Element
  enable: (p: SearchParams) => SearchParams
  isEnabled: (p: SearchParams) => boolean
}

const filters: FilterOption[] = [
  {
    title: "FIDE 2000+",
    Icon: RisingGraphIcon,
    enable: (p) => {
      p.rating[0] = Math.max(2000, p.rating[0])
      return p
    },
    isEnabled: (p) => p.rating[0] >= 2000,
  },
  {
    title: "English Speaking",
    Icon: EnglishIcon,
    enable: (p) => {
      for (const lang of ["en-US", "en-GB"]) {
        if (!p.languages.includes(lang)) {
          p.languages.push(lang)
        }
      }
      return p
    },
    // Using `||` doesn't match how `enable` works but this is probably closer
    // to how people would expect the filter to operate.
    isEnabled: (p) =>
      p.languages.includes("en-US") || p.languages.includes("en-GB"),
  },
  {
    title: "Rapid Specialty",
    Icon: RabbitIcon,
    enable: (p) => {
      p.modes = [Mode.RAPID]
      return p
    },
    isEnabled: (p) => p.modes.length === 1 && p.modes.includes(Mode.RAPID),
  },
  {
    title: "Blitz Specialty",
    Icon: LightningIcon,
    enable: (p) => {
      p.modes = [Mode.BLITZ]
      return p
    },
    isEnabled: (p) => p.modes.length === 1 && p.modes.includes(Mode.BLITZ),
  },
  {
    title: "Bullet Specialty",
    Icon: BulletIcon,
    enable: (p) => {
      p.modes = [Mode.BULLET]
      return p
    },
    isEnabled: (p) => p.modes.length === 1 && p.modes.includes(Mode.BULLET),
  },
  {
    title: "On Chess.com",
    Icon: PawnIcon,
    enable: (p) => {
      p.sites.push(Site.CHESSCOM)
      return p
    },
    isEnabled: (p) => p.sites.includes(Site.CHESSCOM),
  },
  {
    title: "On Lichess",
    Icon: KnightIcon,
    enable: (p) => {
      p.sites.push(Site.LICHESS)
      return p
    },
    isEnabled: (p) => p.sites.includes(Site.LICHESS),
  },
  {
    title: "Titled Player",
    Icon: TrophyIcon,
    enable: (p) => {
      p.titles = Object.keys(Title) as Title[]
      return p
    },
    isEnabled: (p) => p.titles.length > 0,
  },
]

enum Direction {
  LEFT,
  RIGHT,
}

interface FilterScrollProps {
  params: SearchParams
  onModal: () => void
  onSelect: (p: SearchParams) => void
}

export function FilterScroll({ params, onModal, onSelect }: FilterScrollProps) {
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
      <div className="relative flex flex-grow overflow-hidden">
        <div
          ref={viewport}
          className="flex items-center gap-x-12 overflow-hidden"
        >
          {[...filters].map((e) => (
            <div
              key={e.title}
              className={clsx("flex-none cursor-pointer text-center", {
                "fill-amber-500 text-amber-500": e.isEnabled(params),
              })}
              onClick={() => onSelect(e.enable({ ...params }))}
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
