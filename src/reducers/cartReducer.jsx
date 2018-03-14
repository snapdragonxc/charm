"use strict"
// CART REDUCERS
export function cartReducer( state={ items:[] }, action) {
    switch(action.type){
        case "GET_CART":
            return {...state,
                items: action.payload,
                totalAmount: totals(action.payload).totalAmount,
                totalQty: totals(action.payload).totalQty
            }
            break;
        case "ADD_TO_CART":
              return {...state,
                items:action.payload,
                totalAmount: totals(action.payload).totalAmount,
                totalQty: totals(action.payload).totalQty
            }
            break;
        case "UPDATE_CART":
            return {...state,
                items:action.payload,
                totalAmount: totals(action.payload).totalAmount,
                totalQty: totals(action.payload).totalQty
            }
            break;
        case "DELETE_CART_ITEM":
            return {...state,
                items:action.payload,
                totalAmount: totals(action.payload).totalAmount,                
                totalQty: totals(action.payload).totalQty
            }
            break;
    }
    return state
}
// CALCULATE TOTALS
export function totals(payloadArr){
    const totalAmount = payloadArr.map( function(item){
            return item.price * item.qty;
        })
        .reduce(function(a, b) {
            return a + b;
        }, 0); //start summing from index0
    const totalQty = payloadArr.map(function(item){
            return item.qty;
        }).reduce(function(a, b) {
              return a + b;
        }, 0);
        //
    return {
        totalAmount:totalAmount.toFixed(2),
        totalQty:totalQty
    }
}
  