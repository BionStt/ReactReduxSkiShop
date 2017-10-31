import React from 'react';
import PropTypes from 'prop-types';

const ShopBrand = ({changeCategory}) => (
    <span className="text-white" onClick={()=>changeCategory()}>
        Neiman Ski
    </span>
)
ShopBrand.PropTypes = {
    changeCategory: PropTypes.func.isRequired
};
        
export default ShopBrand;