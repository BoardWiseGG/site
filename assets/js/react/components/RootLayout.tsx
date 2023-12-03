import * as React from "react"
import clsx from "clsx"
import { motion, MotionConfig, useReducedMotion } from "framer-motion"

import { Container } from "./Container"
import { Footer } from "./Footer"
import { GridPattern } from "./GridPattern"
import { Header } from "./Header"

function NavigationRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="even:mt-px sm:bg-neutral-950">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  )
}

function NavigationItem({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className="group relative isolate -mx-6 bg-neutral-950 px-6 py-10 even:mt-px sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-neutral-800 sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-neutral-900 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </a>
  )
}

function Navigation() {
  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-white">
      <NavigationRow>
        <NavigationItem href="/about/">About Us</NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href="/contact/">Contact Us</NavigationItem>
      </NavigationRow>
    </nav>
  )
}

export function RootLayout({ children }: { children: React.ReactNode }) {
  let panelId = React.useId()
  let [expanded, setExpanded] = React.useState(false)
  let openRef = React.useRef<React.ElementRef<"button">>(null)
  let closeRef = React.useRef<React.ElementRef<"button">>(null)
  let shouldReduceMotion = useReducedMotion()

  return (
    <>
      <MotionConfig
        transition={{
          ease: "easeInOut",
          duration: shouldReduceMotion ? 0 : undefined,
        }}
      >
        <header>
          <div
            className="absolute left-0 right-0 top-2 z-40 pt-6"
            aria-hidden={expanded ? "true" : undefined}
            // @ts-ignore (https://github.com/facebook/react/issues/17157)
            inert={expanded ? "" : undefined}
          >
            <Header
              panelId={panelId}
              toggleRef={openRef}
              expanded={expanded}
              onToggle={() => {
                setExpanded((expanded) => !expanded)
                window.setTimeout(
                  () => closeRef.current?.focus({ preventScroll: true })
                )
              }}
            />
          </div>

          <motion.div
            layout
            id={panelId}
            style={{ height: expanded ? "auto" : "1px" }}
            className="relative z-50 overflow-hidden bg-neutral-950"
            aria-hidden={expanded ? undefined : "true"}
            // @ts-ignore (https://github.com/facebook/react/issues/17157)
            inert={expanded ? undefined : ""}
          >
            <div className="bg-neutral-800">
              <div className="bg-neutral-950 py-8">
                <Header
                  invert
                  panelId={panelId}
                  toggleRef={closeRef}
                  expanded={expanded}
                  onToggle={() => {
                    setExpanded((expanded) => !expanded)
                    window.setTimeout(
                      () => openRef.current?.focus({ preventScroll: true })
                    )
                  }}
                />
              </div>
              <Navigation />
            </div>
          </motion.div>
        </header>
      </MotionConfig>

      <div
        className={clsx("relative flex flex-auto overflow-hidden bg-white", {
          "pt-14": !expanded,
        })}
      >
        <div
          className={clsx("relative isolate flex w-full flex-col", {
            "pt-9": !expanded,
          })}
        >
          <GridPattern
            className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-neutral-50 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
            yOffset={-96}
            interactive
          />

          <main className="w-full flex-auto">{children}</main>

          <Footer />
        </div>
      </div>
    </>
  )
}
