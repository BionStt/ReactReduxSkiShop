import { connect } from 'react-redux';

import Cart from '../Cart';
import { updateQuantity, removeLine, clearCart } from '../../actions/processShoppingCart';

const mapStateToProps = (state) => {
    return {
        cart: state.shoppingCart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeSkis: (skuNo) => {
            dispatch(removeLine(skuNo));
        },
        updateCartQuantity: (skuNo, quantity) => {
            dispatch(updateQuantity(skuNo, quantity));
        }, 
        clearCart: () => {
            dispatch(clearCart());
        }, 
        dispatch
    }
}

const CartCtn = connect(mapStateToProps, mapDispatchToProps)(Cart);

export default CartCtn;
