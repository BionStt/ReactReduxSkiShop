export const ADD_LINE = 'ADD_LINE';
export const REMOVE_LINE = 'REMOVE_LINE';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';

export const addLine = (skuNo, brand, name, gender, price, size, quantity) => {
    return {
        type: ADD_LINE, 
        skuNo, 
        brand,
        name,
        gender, 
        price,
        size,
        quantity
    }
}

export const removeLine = (skuNo) => {
    return {
        type: REMOVE_LINE,
        skuNo
    }
}

export const updateQuantity = (skuNo, quantity) => {
    return {
        type: UPDATE_QUANTITY,
        skuNo,
        quantity
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}
