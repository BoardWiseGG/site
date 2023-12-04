import * as React from "react"

interface CaptionImageProps {
  title?: string
  subtitle?: string
  src: string
}

export function CaptionImage({ title, subtitle, src }: CaptionImageProps) {
  return (
    <div className="group relative h-96 overflow-hidden rounded-3xl bg-neutral-100">
      <img
        alt=""
        src={src}
        className="h-full w-full object-cover transition duration-500 motion-safe:group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
        {title && (
          <p className="font-display text-base/6 font-semibold tracking-wide text-white">
            {title}
          </p>
        )}
        {subtitle && <p className="mt-2 text-sm text-white">{subtitle}</p>}
      </div>
    </div>
  )
}
