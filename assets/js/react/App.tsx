import * as React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Footer } from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Footer />, // Placeholder.
  },
  {
    path: "/nested",
    element: <Footer />, // Placeholder.
  },
]);

export default function App() {
  return (
    <div>
      <main className="w-full flex-auto">
        <RouterProvider router={router} />
      </main>
      <Footer />
    </div>
  );
}
