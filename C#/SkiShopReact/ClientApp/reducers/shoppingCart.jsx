import { ADD_LINE, REMOVE_LINE, UPDATE_QUANTITY, CLEAR_CART }
    from '../actions/processShoppingCart';

const shoppingCart = (state={lines:[], itemCount: 0, totalPrice: 0 }, action) => {
    let index;
    let line = {};

    switch (action.type) {
        case ADD_LINE:
            line = {
                skuNo: action.skuNo,
                skis: `${action.brand} ${action.name} - ${action.gender}`,
                size: action.size,
                price: action.price,
                quantity: action.quantity,
                subTotal: action.quantity * action.price
            }
            if (state !== undefined && state != null
                && state.lines !== undefined && state.lines !== null && state.lines.length > 0) {
                 index= state.lines.findIndex(l => l.skuNo === action.skuNo);
            } else {
                return {
                    lines: [line],
                    itemCount: line.quantity,
                    totalPrice: line.subTotal
                }
            }
            if (index === -1) {
                return {
                    lines: [...state.lines, line],
                    itemCount:  state.itemCount + line.quantity,
                    totalPrice: state.totalPrice + line.subTotal
                }
            }
            // in case of adding an item that is already in the cart
            line.quantity += state.lines[index].quantity;
            line.subTotal += state.lines[index].subTotal;
            return {
                lines: [...state.lines.slice(0, index), line, ...state.lines.slice(index + 1)],
                itemCount: state.itemCount + action.quantity,
                totalPrice: state.totalPrice + action.quantity * action.price
            }
        case REMOVE_LINE:
            index = state.lines.findIndex(l => l.skuNo === action.skuNo);
            return {
                lines: [...state.lines.slice(0, index), ...state.lines.slice(index + 1)],
                itemCount: state.itemCount - state.lines[index].quantity,
                totalPrice: state.totalPrice - state.lines[index].subTotal
            }
        case UPDATE_QUANTITY:
            index = state.lines.findIndex(l => l.skuNo === action.skuNo);
            if (index > -1) {
                line = Object.assign({}, state.lines[index]);
                line.quantity = Number(action.quantity);
                line.subTotal = line.price * Number(action.quantity);
                return {
                    lines: [...state.lines.slice(0, index), line, ...state.lines.slice(index + 1)],
                    itemCount: state.itemCount - state.lines[index].quantity + Number(action.quantity),
                    totalPrice: state.totalPrice - state.lines[index].subTotal + line.subTotal
                }
            }
            return state;
        case CLEAR_CART:
            return {
                lines: [],
                itemCount: 0,
                totalPrice: 0
            }
        default:
            return state;
    }
}

export default shoppingCart;

