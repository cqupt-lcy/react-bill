import { Outlet } from "react-router-dom";
import { Button } from "antd-mobile";
import { getBillList } from "@/store/modules/billStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function Layout() {
  const { billList } = useSelector(state => state.bill);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBillList());
  }, [dispatch]);

  return (
    <>
      <div>
        this is Layout
      </div>
      <Button color="primary">
        测试按钮
      </Button>
      {billList.map(item => <div>{item.money}</div>)}
      <Outlet />
    </>
  )
}
export default Layout;  