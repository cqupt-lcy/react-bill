import { DatePicker, NavBar } from "antd-mobile";
import './index.scss'
import { useState } from "react";
import classNames from 'classnames'
import dayjs from "dayjs";
function Month() {
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });
  const handleConfirm = (value) => {
    const date = dayjs(value).format("YYYY-MM")
    setTime(date)
    setVisible(false);
  }
  return (
    <div className="monthlyBill">
      {/* 头部导航栏区域 */}
      <NavBar className="nav" backIcon={false}>
        月度收支
      </NavBar>
      {/* 内容区域 */}
      <div className="content">
        {/* header：包括时间选择和显示、账单统计 */}
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date">
            <span className="text">
              {time}
            </span>
            <span className={classNames('arrow',{'expand': visible})} onClick={() => setVisible(true)}></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">100</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">200</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">100</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
           className="kaDate"
           title="记账日期"
           precision="month"
           visible={visible}
           max={new Date()}
           onConfirm={(value) => handleConfirm(value)}
           onCancel={() => setVisible(false)}
           />
        </div>
      </div>
    </div>
  )
}
export default Month;   