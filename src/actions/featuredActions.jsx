'use strict'
import Axios from 'axios';
/* Async Actions */
// Returns a dispatcher function
// that dispatches an action at a later time - CRUD
// <--- CREATE ACTION --->
export function createFeaturedProduct(featuredProduct){
    return function(dispatch){
        Axios.post('/api/featuredProduct', featuredProduct).then(function(response){
            // console.log('create', response.data);
            dispatch({
                type: 'CREATE_FEATURED_PRODUCT',
                    payload: response.data
            })
        }).catch(function(err){
            // dispatch({type:"ADD_PRODUCT_REJECTED", payload:"there was an error whilst adding a new category"}) 
            if(err.response.status == 401) {// authorisation access error
                dispatch({
                    type: 'LOGOUT_SUCCESS',
                    name: ''
                })
            }
        })
    }
};
// <--- READ ACTIONS --->
export function getFeaturedProducts() {
    return function(dispatch){
        Axios.get('/api/featuredProducts').then(function(response){           
            dispatch({
                type: 'GET_FEATURED_PRODUCTS',
                payload: response.data // products + number of pages
            })
        }).catch(function(err){
            /* dispatch({type:"GET_PRODUCTS_REJECTED", payload:"there was an error whilst getting the categories"}) */
        })
    }
};
export function getFeaturedProduct(index) {                  
    return function(dispatch){
        Axios.get('/api/featuredProduct/' + index).then(function(response){        
            dispatch({
                type: 'GET_FEATURED_PRODUCT',
                payload: response.data
            })
        }).catch(function(err){
            /* dispatch({type:"GET_PRODUCT_REJECTED", payload:"there was an error whilst getting a product"}) */
        })
    }        
};
export function getFeaturedProductsInFull() {                    
    return function(dispatch){
        Axios.get('/api/featuredProductsInFull').then(function(response){            
            dispatch({
                type: 'GET_FEATURED_PRODUCTS_IN_FULL',
                payload: response.data
            })
        }).catch(function(err){
            /* dispatch({type:"GET_PRODUCT_REJECTED", payload:"there was an error whilst getting a product"}) */
        })
    }       
};
// <--- UPDATE ACTION --->
export function updateFeaturedProduct(featuredProduct){
var index  = featuredProduct.index;
// console.log(index);
    return function(dispatch){
    Axios.put('/api/featuredProduct/' + index, featuredProduct).then(function(response){
        //  console.log(response.data);
        dispatch({
            type: 'UPDATE_FEATURED_PRODUCT',
            payload: response.data
        })
    }).catch(function(err){
        //dispatch({type:"UPDATE_PRODUCT_REJECTED", payload:"there was an error whilst updating a product"}) 
        if(err.response.status == 401) {// authorisation access error
            dispatch({
                type: 'LOGOUT_SUCCESS',
                name: ''
            })
        }
    })
    }
}