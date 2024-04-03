import { Outlet } from "react-router-dom"

import MyNavbar from "./MyNavbar";
function App() {
  return (
    <div className="min-h-[85vh] px-10 pt-3">
      <MyNavbar></MyNavbar>

      <Outlet></Outlet>
    </div>
  )
}

export default App
