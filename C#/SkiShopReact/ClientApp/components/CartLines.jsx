import React from 'react';
import PropTypes from 'prop-types';

import CartLine from './CartLine';

const CartLines = ({ lines, removeLine, updateCartQuantity }) => {
    return (
        <tbody>
            {lines.map(line => 
                <CartLine key={line.skuNo} line={line}
                    clickRemove={() => removeLine(line.skuNo)}
                    updateCartQuantity={updateCartQuantity}/>
                )
            }
        </tbody>
        );
};

CartLines.propTypes = {
    lines: PropTypes.arrayOf(PropTypes.shape({
        skuNo: PropTypes.string,
        skis: PropTypes.string,
        size: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
        subTotal: PropTypes.number
    })), 
    removeLine: PropTypes.func.isRequired, 
    updateCartQuantity: PropTypes.func.isRequired
};

export default CartLines;