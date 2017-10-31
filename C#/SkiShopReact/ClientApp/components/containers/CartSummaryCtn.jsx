import { connect } from 'react-redux';

import CartSummary from '../CartSummary';

const mapStateToProps = (state) => {
    return {
        cart: state.shoppingCart
    }
};

const CartSummaryCtn = connect(mapStateToProps)(CartSummary);

export default CartSummaryCtn;
