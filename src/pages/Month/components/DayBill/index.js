import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './index.scss'
import { billTypeToName } from '@/constants';
const DayBill = ({ date, data }) => {
    const [moneyData, setMoneyData] = useState({ pay: 0, income: 0, total: 0 });
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        let pay = 0, income = 0, total = 0;
        data.forEach(item => {
            if (item.type === 'pay') pay += item.money;
            else if (item.type === 'income') income += item.money;
        });
        total = income - pay;
        setMoneyData({ pay, income, total });
    }, [data])
    return (
        <div className="dayBill">
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span className={classNames('arrow', {'expand': visible})} onClick={() => setVisible(!visible)}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{moneyData.pay}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{moneyData.income}</span>
                    </div>
                    <div className="balance">
                        <span className="type">结余</span>
                        <span className="money">{moneyData.total}</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            {visible && <div className="billList">
                {data.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            <div className="detail">
                                <div className="billType">{billTypeToName[item.useFor]}</div>
                            </div>
                            <div className={classNames('money', item.type)}>
                                {item.money.toFixed(2)}
                            </div>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}
export default DayBill;