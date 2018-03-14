'use strict'
import Axios from 'axios';
/* Async Actions */
// Axios returns a dispatcher function
// that dispatches an action at a later time - CRUD
const categoriesUrl = '/api/categories';
const categoryUrl = '/api/category/';
// <--- CREATE ACTION --->
export function addCategory(category){
    return function(dispatch){
        Axios.post(categoryUrl, category).then(function(response){
            dispatch({
                type: 'ADD_CATEGORY',
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
};
// <--- READ ACTIONS --->
export function getCategories() {
    return function(dispatch){
        Axios.get(categoriesUrl).then(function(response){                
            dispatch({
                type: 'GET_CATEGORIES',
                    payload: response.data // products + number of pages
                });
        }).catch(function(err){})
    }
};
export function getCategory(index) {
    return function(dispatch){
        Axios.get(categoryUrl + index).then(function(response){              
            dispatch({
                type: 'GET_CATEGORY',
                payload: response.data
            });
        }).catch(function(err){})
    }           
};
// <--- UPDATE ACTION --->
export function updateCategory(category){
    var index  = category._id;
    // console.log(index);
    return function(dispatch){
        Axios.put(categoryUrl + index, category).then(function(response){
             //     console.log(response);
            dispatch({
                type: 'UPDATE_CATEGORY',
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
// <--- DELETE ACTION --->
export function deleteCategory(category){
    var index = category._id;
    return function(dispatch){
        Axios.delete(categoryUrl + index).then(function(response){
            dispatch({
                type: 'DELETE_CATEGORY',
                payload: category
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