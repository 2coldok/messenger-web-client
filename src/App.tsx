import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";

export default function App() {
  
  return (
    <>
      <Navbar />
      <h1>여긴 App</h1>
      <Outlet />
    </>
  )
}
