import * as React from "react"
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { RootLayout } from "./components/RootLayout"
import { router } from "./router"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootLayout>
        <RouterProvider router={router} />
      </RootLayout>
    </QueryClientProvider>
  )
}
