import React from 'react';
import PropTypes from 'prop-types';

import Skis from './Skis';

const HomeSkis = ({skiArray, changeCategory}) => (
    <div className="row ml-2">
        {skiArray.map(skis =>
            <Skis key={skis.styleNo} skis={skis}
                onClick={() => changeCategory(skis.categoryName)} />
        )}
    </div>
    );

HomeSkis.PropTypes = {
    skiArray: PropTypes.arrayOf(PropTypes.shape({
        styleNo: PropTypes.string.isRequired,
        styleName: PropTypes.string.isRequired,
        brandName: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired,
        imageSmall: PropTypes.string.isRequired,
        priceCurrent: PropTypes.number.isRequired,
        priceRegular: PropTypes.number.isRequired,
        idealFors: PropTypes.arrayOf(PropTypes.string)
    }).isRequired).isRequired, 
    changeCategory: PropTypes.func.isRequired
}

export default HomeSkis;