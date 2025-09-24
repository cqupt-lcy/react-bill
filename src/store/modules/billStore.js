import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name: 'billStore',
    initialState: {
        billList: [],
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload;
        },
        addBill(state, action) {
            state.billList.push(action.payload);
        }
    }
})

const { setBillList, addBill } = billStore.actions;

// 这里使用 thunk action creator 的原因:
// 1. Redux 默认只支持同步 action，不能直接处理异步操作
// 2. 通过返回一个函数而不是普通 action 对象，让 thunk 中间件能够拦截并处理异步逻辑
// 3. 这个函数可以接收 dispatch 作为参数，在异步操作完成后再派发真正的 action
const getBillList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:8888/ka');
        dispatch(setBillList(res.data));
    }
}
const addBillList = (data) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8888/ka', data);
        dispatch(addBill(res.data))
    }
}

export { getBillList, addBillList };
export default billStore.reducer;