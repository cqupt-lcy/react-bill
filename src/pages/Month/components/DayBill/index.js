import { useMemo, useState } from 'react';
import classNames from 'classnames';
import './index.scss'
import { billTypeToName } from '@/constants';
import Icon from '@/components/Icon';
const DayBill = ({ date, data }) => {
    const [visible, setVisible] = useState(false);
    const moneyData = useMemo(() => {
        const pay = data.filter(item => item.type === 'pay').reduce((acc, cur) => acc + cur.money, 0);
        const income = data.filter(item => item.type === 'income').reduce((acc, cur) => acc + cur.money, 0);
        const total = income - pay;
        return { pay, income, total };
    }, [data])
    return (
        <div className="dayBill">
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span className={classNames('arrow', { 'expand': visible })} onClick={() => setVisible(!visible)}></span>
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
                            <Icon type={item.useFor}></Icon>
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