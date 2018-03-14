// <--- AUTH REDUCER --->
import history from '../history.jsx';
export function authReducer( auth = {status: false, name: ''}, action ) { // state is relative to parent, i.e. auth is a relative state  
    switch ( action.type ){
    
        case 'LOGIN_SUCCESS':
            localStorage.setItem("charm", "authenticated");
            localStorage.setItem("charm-name", action.name);
            return  { status: true, name: action.name};
        case 'LOGOUT_SUCCESS':
            localStorage.removeItem("charm");
            localStorage.removeItem("charm-name");
            history.push('/dashboard'); // redirect to login if not authorized;               
            return   { status: false, name: ''};
        case 'AUTHORISATION_FAILURE':
            localStorage.removeItem("charm");
            localStorage.removeItem("charm-name");
            history.push('/dashboard'); // redirect to login if not authorized;
            return { status: false, name: ''};
        default:
            var newAuth = auth;
            //localStorage.removeItem("charm");
            if(localStorage.getItem("charm") === 'authenticated') {
                newAuth = {status: true, name: localStorage.getItem("charm-name")};
              
            }
            return newAuth;
    }
};
