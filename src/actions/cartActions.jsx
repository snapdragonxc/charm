'use strict'
import axios from 'axios';
//const cartUrl = 'http://localhost:3000/api/cart';
const cartUrl = '/api/cart';
// GET CART
export function getCart(){
    return function(dispatch){
        axios.get(cartUrl).then(function(response){
            // console.log(response.data);
            dispatch({
                type:"GET_CART", 
                payload:response.data
            });
        }).catch(function(err){
            //dispatch({type:"GET_CART_REJECTED", msg:"error when getting the cart from session"})
        })
    }
}
// ADD TO CART
export function addToCart(cart){
    return function(dispatch){
        axios.post(cartUrl, cart).then(function(response){
            dispatch({
                type:"ADD_TO_CART", 
                payload:response.data
            });
        }).catch(function(err){
             // dispatch({type:"ADD_TO_CART_REJECTED", msg: 'error when adding to the cart'})
        })
    }
}
// UPDATE CART
export function updateCart(_id, unit, cart){
    // console.log(cart, _id);
    // Determine at which index is the item to be updated
    const indexToUpdate = cart.findIndex(        
        function(item){
            return item._id === _id;
        }
    )
    var item = Object.assign({}, cart[indexToUpdate]); 
    item.qty = parseInt(item.qty) + parseInt(unit);
    item.subTotal = item.qty * item.price;
    //console.log('updateCart', item, indexToUpdate);
    var cartUpdate = [...cart.slice(0, indexToUpdate), item, ...cart.slice(indexToUpdate + 1)]
    //console.log(cartUpdate);
    return function(dispatch){
        axios.post(cartUrl, cartUpdate).then(function(response){
            dispatch({
                type:"UPDATE_CART", 
                payload:response.data
            });
        }).catch(function(err){
            //dispatch({type:"UPDATE_CART_REJECTED", msg: 'error when adding to the cart'})
        })
    }
}
  // DELETE FROM CART
export function deleteCartItem(cart){
    return function(dispatch){
          axios.post(cartUrl, cart)
        .then(function(response){
            dispatch({
                type:"DELETE_CART_ITEM", 
                payload:response.data
            });
        }).catch(function(err){
              //dispatch({type:"DELETE_CART_ITEM_REJECTED", msg: 'error when deleting an item from the cart'})
        })
    }
}