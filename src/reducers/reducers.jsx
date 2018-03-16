'use strict'
import { combineReducers } from 'redux';
// IMPORT REDUCERS TO BE COMBINED
import { productReducer } from './productReducer.jsx';
import { categoryReducer } from './categoryReducer.jsx';
import { cartReducer } from './cartReducer.jsx';
import { authReducer } from './authReducer.jsx';
import { navReducer } from './navReducer.jsx';
import { featuredReducer } from './featuredReducer.jsx';
  // COMBINE THE REDUCERS & EXPORT
export default combineReducers({
    productApi: productReducer,
    cart: cartReducer,
    auth: authReducer,
    categoryApi: categoryReducer,
    nav: navReducer,
    featuredApi: featuredReducer,
})