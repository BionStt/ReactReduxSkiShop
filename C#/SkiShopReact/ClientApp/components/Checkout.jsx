import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Form } from 'formsy-react';
import { fetch } from 'domain-task';

import FormInput from './FormInput';
import { clearCart } from '../actions/processShoppingCart';

class Checkout extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            ifSent: false,
            canSent: false,
            ifFail: false,
            message: ''
    };
        this.submit = this.submit.bind(this);
        this.reset = this.reset.bind(this);
        this.enableButton = this.enableButton.bind(this);
        this.disableButton = this.disableButton.bind(this);
    }

    submit(data) {
        const { cart, dispatch } = this.props;

        console.log(data);
        let order = Object.assign({}, data);
        order.orderItems = cart.lines.slice();
        order.totalValue = cart.totalPrice;
        console.log(order);
        order = JSON.stringify(order);

        let res = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'default',
            body: order
        };
        fetch('http://localhost:42014/skishop/postOrder', res)
            .then(response => {
                if (response.ok) return response.json();
                throw new Error('Network response was not ok.');
            })
            .then((resData) => {
                dispatch(clearCart());
                this.setState({
                    ifSent: true,
                    canSent: false,
                    ifFail: false,
                    message: ''
                });
            })
            .catch(error => {
                this.setState({
                    ifFail: true,
                    message: error.message
                });
            });

    }

    enableButton() {
        this.setState({
            canSent: true
        });
    }

    disableButton() {
        this.setState({
            canSent: false
        });
    }

    reset() {
        this.refs.form.reset();
    }

    render() {
        if (this.state.ifSent) {
            return (
                <div className="m-1 text-center">
                    <h2>Thanks</h2>
                    <p>Thanks for placing your order.</p>
                    <p>We'll ship your order as soon as we can</p>
                    <Link to="/home" className="btn btn-primary">
                        Return to Shop
                    </Link>
                </div>
                );
        };

        if (this.state.ifFail) {
            return (
                <div>
                    Sorry, failed processing your order due to:
                    <p>{this.state.message}. </p>
                    <p>Please try again.</p>
                </div>
                )}

        return (
            <div className="m-2 ml-5">
                <p>
                    Please enter your shipping details
                </p>

                <Form onSubmit={this.submit} onValid={this.enableButton}
                    ref="form"
                    onInvalid={this.disableButton}>
                    <strong>Ship to</strong>
                    <FormInput value="" name="name" title="Name"
                        placeholder="required"
                        validationError="Please enter your name"
                        required />

                    <strong>Address</strong>
                    <FormInput value="" name="street" title="Street"
                               placeholder="required"
                               validationError="Please enter your street"
                               required />
                    <FormInput value="" name="city" title="City"
                               placeholder="required"
                               validationError="Please enter your city"
                               required />
                    <FormInput value="" name="province" title="Province"
                               placeholder="required"
                               validationError="Please enter your province"
                               required />
                    <FormInput value="" name="postcode" title="Postcode"
                               placeholder="required"
                               validationError="Please enter your postcode"
                               required />
                    <FormInput value="" name="email" title="Email"
                               placeholder="required"
                               validations="isEmail"
                               validationError="This is not a valid email"
                               required />

                    <div className="offset-1 col-6">
                        <Link to="/cart" className="btn btn-primary">
                            Back
                        </Link>
                        &nbsp;
                        <button type="submit" className="btn btn-primary"
                            style={{ cursor: this.state.canSent ? 'pointer' : 'no-drop' }}
                            disabled={!this.state.canSent} >
                            Complete Order
                        </button>
                        &nbsp;
                        <button className="btn btn-outline-primary pull-right"
                            style={{ cursor: 'pointer' }}
                            onClick={this.reset}>
                            Reset
                        </button>
                    </div>
                </Form>
            </div>
        );
    }
}

Checkout.propTypes = {
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

export default Checkout;
