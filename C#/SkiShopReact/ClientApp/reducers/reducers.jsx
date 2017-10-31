import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { stylesPopular, stylesClearance } from './popularClearance';
import allCategories from './allCategories';
import selectedCategory from './selectedCategory';
import styleDetail from './styleDetail';
import shoppingCart from './shoppingCart';
import { orders, orderSelected } from './orders';
import categoryDetail from './categoryDetail';

const reducers = combineReducers({
    stylesPopular: stylesPopular,
    stylesClearance: stylesClearance,
    allCategories: allCategories, 
    selectedCategory: selectedCategory,
    styleDetail: styleDetail,
    shoppingCart: shoppingCart,
    orders: orders,
    orderItems: orderSelected,
    categoryDetail: categoryDetail,
    router: routerReducer
});

export default reducers;