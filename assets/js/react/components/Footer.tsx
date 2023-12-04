import * as React from "react"

import { Container } from "./Container"
import { Logo } from "./Logo"

const navigation = [
  {
    title: "Students",
    links: [{ title: "Find a Coach", href: "/" }],
  },
  {
    title: "Company",
    links: [
      { title: "About Us", href: "/about/" },
      { title: "Contact Us", href: "/contact/" },
    ],
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-sm font-semibold tracking-wider text-neutral-950">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-neutral-700">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <a
                    href={link.href}
                    className="transition hover:text-neutral-950"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-16 w-full sm:mt-24 lg:mt-28">
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
        <Navigation />
      </div>
      <div className="mb-12 mt-16 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-neutral-950/10 pt-12">
        <a href="/" aria-label="Home">
          <Logo className="h-8" />
        </a>
        <p className="text-sm text-neutral-700">
          © BoardWise LLC {new Date().getFullYear()}
        </p>
      </div>
    </Container>
  )
}
