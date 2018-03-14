'use strict'
// default state: { product:'', products: [] }
export function uploadReducer( state = { name: 'blank.jpg'  }, action ) {
    switch ( action.type ){
        case 'RESET_IMAGE':
            var newState = { ...{ name: 'blank.jpg'  } };
            return newState;
        case 'UPLOAD_IMAGE':
            var name = action.payload;
            var newState = { ...{ name: name} };
          return newState;
        case 'DELETE_IMAGE':
            var newState = { ...{ name: 'blank.jpg'  } };
            return newState;
        default:
            return state;
    }
};
      