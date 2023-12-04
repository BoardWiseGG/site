import * as React from "react"
import { createBrowserRouter } from "react-router-dom"

import { FallbackMessage } from "./components/FallbackMessage"
import { Search } from "./pages/Search"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
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
