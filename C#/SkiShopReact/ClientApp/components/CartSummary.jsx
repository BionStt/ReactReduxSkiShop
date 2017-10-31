import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import { push } from 'react-router-redux';

import getSelectedCategory from '../actions/getSelectedCategory';

class CartSummary extends React.Component {
    constructor(props) {
        super(props);

        this.clickOrder = this.clickOrder.bind(this);
        this.clickCart = this.clickCart.bind(this);
    }

    clickOrder() {
        const { dispatch } = this.props;
        dispatch(getSelectedCategory());
        dispatch(push('/orders'));
    }

    clickCart() {
        const { dispatch } = this.props;
        dispatch(getSelectedCategory());
        dispatch(push('/cart'));
    }

    render() {
        const { cart } = this.props;

        //console.log(cart);
        return (
            <div className="collapse navbar-collapse justify-content-end">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/orders" className="nav-link"
                            onClick={this.clickOrder}>
                            <span className="text-white" style={{ fontSize: '0.80rem' }}>
                                Orders
                            </span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <button className="btn btn-primary">
                            <Link to="/cart" className="nav-link"
                                style={{ fontSize: '0.80rem' }}
                                onClick={this.clickCart}>
                                <span className="fa fa-shopping-cart text-white">: <span style={{ color: 'yellow' }}>{cart.itemCount}</span> item(s) {cart.itemCount > 0 ? <span style={{ color: 'yellow' }}>{`${numeral(cart.totalPrice).format('$0,0.00')}`}</span> : ''}</span>
                            </Link>
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}

CartSummary.propTypes = {
    cart: PropTypes.shape({
        lines: PropTypes.arrayOf(PropTypes.shape({
            skuNo: PropTypes.string,
            skis: PropTypes.string,
            size: PropTypes.string, 
            price: PropTypes.number,
            quantity: PropTypes.number,
            subTotal: PropTypes.number
        })),
        itemCount: PropTypes.number,
        totalPrice: PropTypes.number
    })
};

export default CartSummary;