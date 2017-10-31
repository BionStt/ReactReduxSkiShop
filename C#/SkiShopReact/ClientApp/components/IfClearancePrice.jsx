import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

const IfClearancePrice = ({ current, regular }) => {
    if (current < regular)
        return (
            <p>
                <del style={{color: 'navy', fontWeight: 500}}>
                    {`${numeral(regular).format('$0,0.00')}`}
                </del>
                <span style={{color: 'red', fontWeight: 'bold'}}>
                    {` ${numeral(current).format('$0,0.00')}`}
                </span>
            </p>
        );
    return (
        <p style={{ color: 'navy', fontWeight: 500 }}>
            {`${numeral(current).format('$0,0.00')}`}
        </p>
    );
}

IfClearancePrice.PropTypes = {
    current: PropTypes.number,
    regular: PropTypes.number
}

export default IfClearancePrice;

