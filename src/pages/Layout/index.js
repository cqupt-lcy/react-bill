import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
function Layout() {
  return (
    <>
      <div>
        this is Layout
      </div>
      <Button color="primary">
        测试按钮
      </Button>
      <Outlet />
    </>
  )
}
export default Layout;  