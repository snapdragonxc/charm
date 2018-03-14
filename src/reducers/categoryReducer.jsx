'use strict'
export function categoryReducer( state = { category:{ }, categories: [] }, action ) {
    switch ( action.type ){
        // <--- PUBLIC ROUTES --->
        case 'GET_CATEGORIES':
            var newState = { ...state,  ...{ categories: action.payload } }; // requires dots on second object
            return newState;
        case 'GET_CATEGORY':
            var newState = { ...state,  ...{ category: action.payload} };
            return newState;
        // <--- END OF PUBLIC ROUTES --->
        // <--- PROTECTED ROUTES --->
        case 'ADD_CATEGORY':
            var category = action.payload;
            var list = state.categories; // tmp list for ease of use
            var newCategories = list.concat( category );              
            var newState = { ...state, ...{ categories: newCategories} };
            return newState;            
        case 'UPDATE_CATEGORY':
            var category = action.payload;
            var list = state.categories; // tmp list for ease of use
            //console.log(category, list);
            var index = list.findIndex( (item) => item._id === category._id );
            if(index === -1){ // an error occurred
                console.log('An error occurred in updating');
                return state; 
            }
            var newCategories = list
                .slice(0, index)
                .concat( category )
                .concat(list.slice(index + 1));   
            var newState = { ...state, ...{ categories: newCategories } }; 
            return newState; 
        case 'DELETE_CATEGORY':
            var category = action.payload;
            var index = state.categories.findIndex( (item) => item._id === category._id );
            if(index === -1) {
                console.log('error in deleting category');
                return state;
            }
            var newCategories = [...state.categories.slice(0, index), // doesn't change original
                ...state.categories.slice(index + 1)];
            var newState = { ...state, ...{ categories: newCategories} };
            return newState;             
        // <--- END OF PROTECTED ROUTES --->
        default:
            return state;
    }
};