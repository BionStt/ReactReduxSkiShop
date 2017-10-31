import { fetch } from 'domain-task';

export const GET_ORDERS = 'GET_ORDERS';
export const GET_ONEORDER = 'GET_ONEORDER';

export function fetchOrders() {
    return fetch('http://localhost:42014/skishop/getOrders');
}

export function fetchOneOrder(orderId) {
    return fetch(`http://localhost:42014/skishop/getOrderDetail/${orderId}`);
}

export const getOrders = (orders) => {
    return {
        type: GET_ORDERS,
        orders
    }
}

export const getOneOrder = (orderItems) => {
    return {
        type: GET_ONEORDER,
        orderItems
    }
}

export function getOrdersAsync() {
    return dispatch => {
        return fetchOrders()
            .then(response => response.json())
            .then(orders => dispatch(getOrders(orders)));
    }
}

export function getOneOrderAsync(orderId) {
    return dispatch => {
        return fetchOneOrder(orderId)
            .then(response => response.json())
            .then(orderItems => dispatch(getOneOrder(orderItems)));
    }
}