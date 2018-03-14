'use strict'
import Axios from 'axios';
/* Async Actions */
// Returns a dispatcher function
// that dispatches an action at a later time - CRUD
//const loginUrl = 'http://localhost:3000/api/login';
const loginUrl = '/api/login';
    export function login(payload) {                        
    return function(dispatch){
        Axios.post(loginUrl, payload).then(function(response){
            //console.log('Successfully logged in', response.data);
            dispatch({
                type: 'LOGIN_SUCCESS',
                name: response.data
            })              
        }).catch(function(err){
            console.log(err);
        })
    };            
};
export function logout(){
    return function(dispatch){
        Axios.get('/api/logout').catch(function(err){
            //console.log(err);
            dispatch({
                type: 'LOGOUT_SUCCESS',
                name: ''
            })
        })
    }
};
