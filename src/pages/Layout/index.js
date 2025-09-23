import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div>
        this is Layout
      </div>
      <Outlet />
    </>
  )
}
export default Layout;  