import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import { updateQuantity, removeLine } from '../actions/processShoppingCart';

class CartLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quantityUpdated: this.getInitial(this.props.line.quantity)
        };

        this.changeQuantity = this.changeQuantity.bind(this);
    }

    getInitial(quantity) {
        let initial = quantity;
        return initial;
    }

    changeQuantity(event) {
        let quantity = event.target.value; 
        this.setState({
            quantityUpdated: quantity // quantityUpdated will be updated after this function is finished 
        });
        this.props.updateCartQuantity(this.props.line.skuNo, quantity);
    }

    render() {
        const { line } = this.props;

        return (
            <tr>
                <td className="text-left">{line.skis}</td>
                <td className="text-center">{line.size}</td>
                <td className="text-right">{`${numeral(line.price).format('$0,0.00')}`}</td>
                <td>
                    <input type="number" min="1" max="99"
                            className="form-control"
                            style={{ width: '5rem' }}
                            value={this.state.quantityUpdated}
                            onChange={this.changeQuantity} />
                </td>
                <td className="text-right">
                    {`${numeral(line.subTotal).format('$0,0.00')}`}
                </td>
                <td className="text-center">
                    <button className="btn btn-outline-primary btn-sm"
                            onClick={this.props.clickRemove}>
                        Remove
                    </button>
                </td>
            </tr>
        );
        
    }
}

CartLine.propTypes = {
    line: PropTypes.shape({
        skuNo: PropTypes.string,
        skis: PropTypes.string,
        size: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
        subTotal: PropTypes.number
    }), 
    clickRemove: PropTypes.func.isRequired, 
    updateCartQuantity: PropTypes.func.isRequired
}

export default CartLine;