import * as React from "react"
import clsx from "clsx"

import type { Coach } from "../types/Coach"

import PawnIcon from "../icons/Pawn"
import KnightIcon from "../icons/Knight"

function getSiteIcon(coach: Coach) {
  switch (coach.site) {
    case "chesscom":
      return ({ className, ...props }: { className?: string }) => (
        <PawnIcon
          className={clsx("stroke-black fill-lime-600", className)}
          {...props}
        />
      )
    case "lichess":
      return ({ className, ...props }: { className?: string }) => (
        <KnightIcon
          className={clsx("stroke-black fill-white", className)}
          {...props}
        />
      )
    default:
      return null
  }
}

function getProfileUrl(coach: Coach) {
  switch (coach.site) {
    case "chesscom":
      return `https://www.chess.com/member/${coach.username}`
    case "lichess":
      return `https://lichess.org/coach/${coach.username}`
    default:
      return ""
  }
}

export function SearchResult({ coach }: { coach: Coach }) {
  const profileUrl = getProfileUrl(coach)
  const Component = profileUrl ? "a" : "div"
  const Icon = getSiteIcon(coach)

  return (
    <Component
      className={clsx(
        "group relative h-96 overflow-hidden rounded-3xl bg-neutral-100",
        { "cursor-pointer": profileUrl }
      )}
      href={profileUrl || undefined}
      target={profileUrl ? "_blank" : undefined}
    >
      <img
        src={coach.image_url ?? ""}
        className="h-full w-full object-cover transition duration-500 motion-safe:group-hover:scale-105"
      />
      {Icon && (
        <div className="absolute -top-10 -right-10 pt-4 pr-4 flex flex-col justify-end items-start bg-radial-gradient/gray w-[5.2rem] h-[5.2rem]">
          <Icon className="w-6 h-6 ml-2 mb-2" />
        </div>
      )}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
        {coach.name ? (
          <p className="font-display text-base/6 font-semibold tracking-wide text-white">
            {coach.title ? (
              <span className="font-bold pr-1">{coach.title}</span>
            ) : null}
            {coach.name}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-white">{coach.username}</p>
      </div>
    </Component>
  )
}
