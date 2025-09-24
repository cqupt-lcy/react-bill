import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/constants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { addBillList } from '@/store/modules/billStore'

const New = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [type, setType] = useState('pay');
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM-DD");
  })
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const handleConfirm = (value) => {
    setVisible(false);
    setTime(dayjs(value).format("YYYY-MM-DD"));
  }
  const showTime = () => {
    const today = dayjs(new Date()).format("YYYY-MM-DD");
    return time === today ? "今天" : time
  }
  const handleSave = () => {
    if (inputValue === '') return
    let money = 0;
    if (type === 'pay') money = -inputValue;
    else { money = inputValue };

    const data = {
      "type": type,
      "money": money,
      "date": time,
      "useFor": selectedItem,
    }
    dispatch(addBillList(data));
    navigate('/')
  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames({ 'selected': type === 'pay' })}
            onClick={() => setType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames({ 'selected': type === 'income' })}
            shape="rounded"
            onClick={() => setType('income')}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={() => setVisible(true)}>{showTime()}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={visible}
                onConfirm={(value) => handleConfirm(value)}
                onCancel={() => setVisible(false)}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={inputValue}
                onChange={(value) => setInputValue(Number(value))}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[type].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        {
                          'selected': item.type === selectedItem
                        }
                      )
                      }
                      onClick={() => setSelectedItem(item.type)}
                      key={item.type}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={handleSave}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New