import React from 'react';
import { Link } from 'react-router-dom';

import ShopBrandCtn from './containers/ShopBrandCtn';
import CategoryListCtn from './containers/CategoryListCtn';
import CartSummaryCtn from './containers/CartSummaryCtn';

const ShopHead = () => (
    <div className="navbar navbar-toggleable-md navbar-inverse flex-row"
         style={{ backgroundColor: '#3B5998' }}>
        <Link to="/home" className="navbar-brand">
            <ShopBrandCtn/>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
            <CategoryListCtn />
        </div>
        <CartSummaryCtn className="pull-right"/>
    </div>
);

export default ShopHead;