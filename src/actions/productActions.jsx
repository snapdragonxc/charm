'use strict'
import Axios from 'axios';
/* Async Actions */
// Axios returns a dispatcher function
// that dispatches an action at a later time - CRUD

// <--- CREATE ACTION --->
export function addProduct(product, file){
    return function(dispatch){
        Axios.post('/api/upload', file).then(function(response){           
            product.img = response.data.toString();    
            Axios.post('/api/product/', product).then(function(response){
                dispatch({
                    type: 'ADD_PRODUCT',
                    payload: response.data
                })
            }).catch(function(err){
                console.log(err);
            })
        }).catch(function(err){
             console.log(err);
            if(err.response.status == 401) {
                // authorisation access error
                dispatch({
                    type: 'AUTHORISATION_FAILURE',
                    name: ''
                })
            }
        })
    }
};
// <--- READ ACTIONS --->
export function getAllProducts() { 
// Used by dashboard to select featured products. Used as list only without loading images.
    return function(dispatch){
        Axios.get('/api/allProducts').then(function(response){            
            dispatch({
                type: 'GET_ALL_PRODUCTS',
                payload: response.data // products 
            })
        }).catch(function(err){})
    }
};
export function getProductsByCategory(category, index) { 
// Gets products per category per page. Since it is to be used with images, must be per page. 
// Also does 'All Products' per page.
//console.log(category, index);
    if(index === undefined){    
        index = 0;
    }
    return function(dispatch){
        Axios.get('/api/products/' + category + '/' + index).then(function(response){           
            dispatch({
                type: 'GET_PRODUCTS',
                payload: response.data // products + number of pages
            })
        }).catch(function(err){})
    }
};
export function getProduct(index){                   
    return function(dispatch){
        Axios.get('/api/product/' + index).then(function(response){           
            dispatch({
                type: 'GET_PRODUCT',
                payload: response.data
            })
        }).catch(function(err){})
    }        
};

// <--- UPDATE ACTION --->
export function updateProduct(product, imgData, updateImage){    
    if(updateImage){   
        return function(dispatch){           
            // update image
            Axios.put('/api/upload/' + product.img, imgData).then(function(response){  
                // update product with new image url      
                product.img = response.data.toString();  
                Axios.put('/api/product/' + product._id, product).then(function(response){
                    // console.log(response.data);            
                    dispatch({
                        type: 'UPDATE_PRODUCT',
                        payload: response.data
                    })
                }).catch(function(err){console.log(err);})
            }).catch(function(err){
                if(err.response.status == 401) {
                    // authorisation access error
                    dispatch({
                        type: 'AUTHORISATION_FAILURE',

                        name: ''
                    })
                }
            })
        }
    } else {
        return function(dispatch){
            Axios.put('/api/product/' + product._id, product).then(function(response){
                // console.log(response.data);            
                dispatch({
                    type: 'UPDATE_PRODUCT',
                    payload: response.data
                })
            }).catch(function(err){
                if(err.response.status == 401) {
                    // authorisation access error
                    dispatch({
                        type: 'AUTHORISATION_FAILURE',
                        name: ''
                    })
                }
            })
        }
    }
}
// <--- DELETE ACTION --->
export function deleteProduct(product){
var index = product._id;
    return function(dispatch){
        Axios.delete('/api/product/' + index).then(function(response){
            dispatch({
                type: 'DELETE_PRODUCT',
                payload: product
            })
        }).catch(function(err){
            if(err.response.status == 401) {
                // authorisation access error
                dispatch({
                    type: 'AUTHORISATION_FAILURE',
                    name: ''
                })
            }
        })
    }
}