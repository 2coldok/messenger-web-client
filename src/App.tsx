import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function App() {
  
  return (
    <>
      <Header />
      <h1>여긴 App</h1>
      <Outlet />
    </>
  )
}
