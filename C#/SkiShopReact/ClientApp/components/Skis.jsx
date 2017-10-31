import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import IfClearancePrice from './IfClearancePrice';

const Skis = ({ skis, onClick }) => (
    <div className="col-4 mt-3">
        <Link to={`/styleDetail/${skis.categoryName}/${skis.styleNo}`}
            className="pb-3 mb-3" style={{textDecoration: 'none'}}>
            <img src={skis.imageSmall} onClick={onClick}/>
        </Link>
        <Link to={`/styleDetail/${skis.category}/${skis.styleNo}`}
            style={{fontSize: '0.70rem'}}>
            <p className="mb-0 text-muted">{skis.brandName.toUpperCase()}</p>
            <strong style={{ color: 'black' }}>{skis.styleName} - {skis.gender}</strong>
            <IfClearancePrice current={skis.priceCurrent} regular={skis.priceRegular} />
        </Link>
    </div>
);

Skis.PropTypes = {
    skis: PropTypes.shape({
        styleNo: PropTypes.string.isRequired,
        styleName: PropTypes.string.isRequired,
        brandName: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired,
        imageSmall: PropTypes.string.isRequired,
        priceCurrent: PropTypes.number.isRequired,
        priceRegular: PropTypes.number.isRequired
    }).isRequired, 
    onClick: PropTypes.func.isRequired
}

export default Skis;