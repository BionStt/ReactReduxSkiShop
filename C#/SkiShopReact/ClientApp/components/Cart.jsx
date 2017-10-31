import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'react-router-redux';
import numeral from 'numeral';
import { fetch } from 'domain-task';

import CartLines from './CartLines';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            names: []
        }

        this.clickCheckout = this.clickCheckout.bind(this);
    }

    clickCheckout() {
        const { cart, dispatch } = this.props;
        let skus = [];
        let overStocked = [];
        this.props.cart.lines.map(l => {
            skus.push(l.skuNo);
        });
        fetch(`http://localhost:42014/skishop/checkQuantities/${skus}`)
            .then(response => response.json())
            .then(skuQuantities => {
                skuQuantities.map(skuQ => {
                    let line = cart.lines.find(l => l.skuNo === skuQ.skuNo);
                    if (skuQ.quantity < line.quantity) {
                        overStocked.push(`${line.skis} ${line.size}`);
                    }

                });
                this.setState({ names: [...overStocked] });
                if (overStocked.length > 0) {
                    return;
                } else {
                    dispatch(push('/checkout'));
                }
            });
        
    }

    render() {
        const { cart, removeSkis, updateCartQuantity, clearCart } = this.props;

        return (
            <div className="row">
                <div className="col-3">
                    <img src="image/left_cart.jpg" alt="loading picture..." style={{ width: '100%' }} />
                </div>
                <div className="col-9">
                    <h2 className="mt-3">
                        Your Cart:
                </h2>
                    <div className="pt-3">
                        {cart.itemCount === 0 &&
                            <div className="alert alert-warning">
                                There are no skis in your shopping cart.
                            <Link to="/home" className="alert-link">
                                    &nbsp; Click here to go back to the Home page
                            </Link>
                            </div>
                        }
                        {cart.itemCount > 0 &&
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Skis</th>
                                            <th className="text-center">Size</th>
                                            <th className="text-right">Price</th>
                                            <th className="text-center">Quantity</th>
                                            <th className="text-right">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <CartLines lines={cart.lines} removeLine={removeSkis}
                                        updateCartQuantity={updateCartQuantity} />
                                    <tfoot>
                                        <tr>
                                            <td colSpan="4" className="text-right">Total:</td>
                                            <td className="text-right">
                                                {`${numeral(cart.totalPrice).format('$0,0.00')}`}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                                {
                                this.state.names.map(name => (
                                    <p key={name} className="text-danger">
                                        {name}: more than stock level
                                    </p>
                                    ))
                                }
                                <div className="text-center">
                                    <Link to="/home" className="btn btn-primary">
                                        Continue shopping
                                    </Link>
                                    &nbsp;
                                    <button to="/checkout" className="btn btn-primary"
                                        style={{cursor: "pointer"}}
                                        onClick={this.clickCheckout} >
                                        Checkout
                                    </button>
                                    <button className="pull-right btn btn-outline-primary"
                                        onClick={clearCart}>
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Cart.propTypes = {
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
    }), 
    removeSkis: PropTypes.func.isRequired, 
    updateCartQuantity: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired, 
    dispatch: PropTypes.func.isRequired
};

export default Cart;