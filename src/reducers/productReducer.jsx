'use strict'
// default state: { product:'', products: [] }
export function productReducer( state = { product:{ }, products: [], pages: 0 }, action ) {
    switch ( action.type ){
            // <--- PUBLIC ROUTES --->
        case 'GET_ALL_PRODUCTS':
            var newState = { ...state,  ...{ products: action.payload } }; // requires dots on second object
            return newState;   
        case 'GET_PRODUCTS':
            var newState = { ...state,  ...{ products: action.payload.products }, ...{ pages: action.payload.pages } }; // requires dots on second object
            return newState;
        case 'GET_PRODUCT':
            var newState = { ...state,  ...{ product: action.payload} };          
            return newState;
          // <--- END OF PUBLIC ROUTES --->
            // <--- PROTECTED ROUTES --->
        case 'DELETE_PRODUCT':
            var product = action.payload;
            var index = state.products.findIndex( (item) => item._id === product._id );
            if(index === -1) {
                console.log('error in deleting product');
                return state;
            }
            var newProducts = [...state.products.slice(0, index), // doesn't change original
                ...state.products.slice(index + 1)];           
            var newState = { ...state, ...{ products: newProducts} };
            return newState;
        case 'ADD_PRODUCT':
            var product = action.payload;
            var list = state.products; // tmp list for ease of use
            var newProducts = list.concat( product );   
            var newState = { ...state, ...{ products: newProducts} };
            return newState;
        case 'UPDATE_PRODUCT':
            var product = action.payload;
            var list = state.products; // tmp list for ease of use
            var index = list.findIndex( (item) => item._id === product._id );
            if(index === -1){ // an error occurred
                console.log('An error occurred in updating');
                return state; 
            }
            var newProducts = list
                .slice(0, index)
                .concat( product )
                .concat(list.slice(index + 1));   
            var newState = { ...state, ...{ products: newProducts} }; 
              return newState; 
          // <--- END OF PROTECTED ROUTES --->
        default:
            return state;
    }
};  