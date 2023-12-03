import * as React from "react"
import { RouterProvider } from "react-router-dom"

import { RootLayout } from "./components/RootLayout"
import { router } from "./router"

export default function App() {
  return (
    <RootLayout>
      <RouterProvider router={router} />
    </RootLayout>
  )
}
