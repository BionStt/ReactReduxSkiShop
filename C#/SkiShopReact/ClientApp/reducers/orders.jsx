import { GET_ORDERS, GET_ONEORDER } from '../actions/getOrders';

export const orders = (state=[], action) => {
    switch (action.type) {
    case GET_ORDERS:
        return action.orders.slice();
    default:
        return state;
    }
}

export const orderSelected = (state = [], action) => {
    switch (action.type) {
    case GET_ONEORDER:
        return action.orderItems.slice();
    default:
        return state;
    }
}