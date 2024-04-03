import { Outlet } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="min-h-[85vh]">
      <Toaster
      position="top-right"
      ></Toaster>
      <Outlet></Outlet>
    </div>
  )
}

export default App
