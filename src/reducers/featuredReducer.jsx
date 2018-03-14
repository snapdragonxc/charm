'use strict'
export function featuredReducer( state = { featuredProduct:{ }, featuredProducts: [], featuredProductsInFull: [] }, action ) {
    switch ( action.type ){
            // <--- PUBLIC ROUTES --->
        case 'GET_FEATURED_PRODUCTS':
            var newState = { ...state,  ...{ featuredProducts: action.payload } }; // requires dots on second object
            return newState;
        case 'GET_FEATURED_PRODUCTS_IN_FULL':
            var newState = { ...state,  ...{ featuredProductsInFull: action.payload } }; // requires dots on second object
            return newState;
        case 'GET_FEATURED_PRODUCT':
            var newState = { ...state,  ...{ featuredProduct: action.payload} };        
            return newState;
            // <--- END OF PUBLIC ROUTES --->
            // <--- PROTECTED ROUTES --->
        case 'CREATE_FEATURED_PRODUCT':
            var featuredProduct = action.payload;
            var list = state.featuredProducts; // tmp list for ease of use
            var newFeaturedProducts = list.concat( featuredProduct );   
            var newState = { ...state, ...{ featuredProducts: newFeaturedProducts} };
            return newState;            
        case 'UPDATE_FEATURED_PRODUCT':
            var featuredProduct = action.payload;
            var list = state.featuredProducts; // tmp list for ease of use
            //console.log(category, list);
            var index = list.findIndex( (item) => item._id === featuredProduct._id );
            if(index === -1){ // an error occurred
                console.log('An error occurred in updating');
                return state; 
            }
            var newFeaturedProducts = list
                .slice(0, index)
                .concat( featuredProduct )
                .concat(list.slice(index + 1));   
            
            var newState = { ...state, ...{ featuredProducts: newFeaturedProducts } }; 
            return newState; 
          // <--- END OF PROTECTED ROUTES --->
        default:
            return state;
    }
};