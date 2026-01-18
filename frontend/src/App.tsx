import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import SmoothScrollProvider from "./providers/SmoothScrollProvider"

export default function App() {
  return (
    <SmoothScrollProvider>
      <RouterProvider router={router} />
    </SmoothScrollProvider>
  )
}

