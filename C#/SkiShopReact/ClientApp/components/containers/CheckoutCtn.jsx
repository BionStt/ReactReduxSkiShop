import { connect } from 'react-redux';

import Checkout from '../Checkout';

const mapStateToProps = (state) => {
    return {
        cart: state.shoppingCart
    }
};

const CheckoutCtn = connect(mapStateToProps)(Checkout);

export default CheckoutCtn;