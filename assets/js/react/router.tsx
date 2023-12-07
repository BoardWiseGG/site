import * as React from "react"
import { createBrowserRouter } from "react-router-dom"

import { FallbackMessage } from "./components/FallbackMessage"
import { About } from "./pages/About"
import { Contact } from "./pages/Contact"
import { Search } from "./pages/Search"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: "/about/",
    element: <About />,
  },
  {
    path: "/contact/",
    element: <Contact />,
  },
  {
    path: "*",
    element: (
      <FallbackMessage
        className="mt-40"
        title="Illegal Move!"
        body="This page has wandered off the board."
      />
    ),
  },
])
