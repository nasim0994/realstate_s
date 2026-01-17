import { RouterProvider } from "react-router-dom"
import { router } from "./routes"
import SmoothScrollProvider from "./providers/SmoothScrollProvider"


function App() {


  return (
    <SmoothScrollProvider>
      <RouterProvider router={router} />
    </SmoothScrollProvider>
  )
}

export default App
