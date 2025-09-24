import { DatePicker, NavBar } from "antd-mobile";
import './index.scss'
import { useEffect, useMemo, useState } from "react";
import classNames from 'classnames'
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from 'lodash'
import DayBill from "./components/DayBill";
function Month() {
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });
  const [moneyCount, setMoneyCount] = useState({pay:0, income:0, total:0});
  const [dayGroup, setDayGroup] = useState({});
  const handleConfirm = (value) => {
    const date = dayjs(value).format("YYYY-MM")
    setTime(date)
    setVisible(false);
  }
  const billList = useSelector(state => state.bill.billList);
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, item => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  useEffect(() => {
    if(!(time in monthGroup)) return 
    const arr = monthGroup[time];
    let pay=0, income=0, total=0;
    arr.forEach(item => {
      if(item.type === 'pay') pay+=(item.money);
      else if(item.type === 'income') income+= item.money;
      total+=item.money;
    });
    setDayGroup(_.groupBy(arr, item => dayjs(item.date).format("YYYY-MM-DD")));
    setMoneyCount({pay, income, total});
  }, [time, monthGroup])
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
              <span className="money">{moneyCount.pay}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{moneyCount.income}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{moneyCount.total}</span>
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
        {Object.keys(dayGroup) && Object.keys(dayGroup).map(key => (
          <DayBill date={key} data={dayGroup[key]} key={key}></DayBill>
        ))}
      </div>
    </div>
  )
}
export default Month;   