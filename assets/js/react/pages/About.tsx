import * as React from "react"

import { PageIntro } from "../components/PageIntro"

const Title = (
  <span>
    The{" "}
    <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
      BoardWise
    </span>{" "}
    Mission
  </span>
)

export function About() {
  return (
    <>
      <PageIntro eyebrow="About Us" title={Title}>
        <p>A better approach to finding the right coach for you.</p>
        <p className="mt-4 text-base">
          We are a small group of chess enthusiasts dedicated to helping other
          players improve their game as efficiently as they can. We{"'"}re
          starting this initiative the best way we know how - with experts in
          the field.
        </p>
      </PageIntro>
    </>
  )
}
