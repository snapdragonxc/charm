'use strict'
// default state: { product:'', products: [] }
export function shopReducer( state = { product:'', products: [] }, action ) {
    switch ( action.type ){
    
        case 'GET_PRODUCTS':
            var newState = { ...state,  ...{products: action.payload} }; // requires triple dots on second object to merge           
            //console.log(newState);
            return newState;
        case 'GET_PRODUCT':
            console.log(action.payload);
            var newState = { ...state,  ...{ product: action.payload} };           
            return newState;
        default:
            return state;
    }
};