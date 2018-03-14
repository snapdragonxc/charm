'use strict'
// <--- Vendor --->
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import history from './history.jsx'; 
// <--- MIDDLEWARE --->
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger'; //<--- Monitor state change on the console
// <--- STORE --->
import reducers from './reducers/reducers.jsx';
import { getProduct, getProducts } from './actions/productActions.jsx';
import { addToCart, deleteFromCart, getCart } from './actions/cartActions.jsx';
//const middleware = applyMiddleware(thunk, logger);  // <--- Used for debugging of state change on the console ---> 
const middleware = applyMiddleware(thunk);
  //const initialState = {};
const store = createStore(reducers, middleware);
// <--- ROUTES --->
import App from './components/app.jsx';
import Home from './components/home.jsx';
import Shop from './components/shop.jsx';
import About from './components/about.jsx';
import Faq from './components/faq.jsx';
import ContactPage from './components/contact.jsx';
import Cart from './components/cart.jsx';
import Detail from './components/detail.jsx';
// <--- API ROUTES --->
import Signin from './components/dashboard/signin.jsx';
import Products from './components/dashboard/products.jsx';
import Add from './components/dashboard/add.jsx';
import Edit from './components/dashboard/edit.jsx';
import Categories from './components/dashboard/categories.jsx';
import AddCategory from './components/dashboard/addCategory.jsx';
import EditCategory from './components/dashboard/editCategory.jsx';
import Featured from './components/dashboard/featured.jsx';
// <--- Check Authenticated status on initial page load ---> */
// This handles session management timeout on authorisation.
import Axios from 'axios';
Axios.get('/api/status')
    .then(function(response){            
        // continue as normal             
    })
    .catch(function(err){
        // not authorised. - clear local stoarge items for authorisation
        localStorage.removeItem("charm");
        localStorage.removeItem("charm-name");
        // console.log(err);
    });
// Protected route
const PrivateRoute = function({ component: Component, ...rest }){
    // copied from https://reacttraining.com/react-router/web/example/auth-workflow
    var authenticated = ( localStorage.getItem("charm") === 'authenticated')? true : false; 
    const ProtectedComponent = function(props){
        if( authenticated ) {
            return <Component {...props}/>              
        } else {
            return <Redirect to="/dashboard"/>                       
       }
    }
    return (
        <Route {...rest} render={ (props) => ProtectedComponent(props) }/> 
    );
}
const ParentPrivateRoute = function({ component: Component, ...rest }){
    var authenticated = ( localStorage.getItem("charm") === 'authenticated')? true : false; 
    const ProtectedComponent = function(props){
        if( authenticated ) {
            return <Redirect to="/dashboard/products"/>                         
        } else {
            return <Component {...props}/>                       
        }
    }
    return (
        <Route {...rest} render={ (props) => ProtectedComponent(props) }/> 
    );
}
const routesArray = [
    // <--- PUBLIC --->
    <Route key={1} path={'/'} exact={true} component={ Home } />,      
    <Route key={2} path={'/shop/:category'} exact={true} component={ Shop } />,
        <Route key={3} path={'/shop/:category/:page'} component={ Shop } />,  
    <Route key={4} path={'/detail/:id'} component={ Detail } />,      
    <Route key={5} path={'/about'} component={ About } />,
    <Route key={6} path={'/faq'} component={ Faq } />,
    <Route key={7} path={'/contact'} component={ ContactPage } />,
    <Route key={8} path={'/cart'} component={ Cart } />,
    // <--- PROTECTED ROUTES --->
    <ParentPrivateRoute key={9} path={'/dashboard'} exact={true} component={ Signin } />, // subroute parent
        <PrivateRoute key={10} path={'/dashboard/products'} exact={true} component={ Products } />, 
        <PrivateRoute key={11} path={'/dashboard/products/:page'} component={ Products } />,            
        <PrivateRoute key={12} path={'/dashboard/add'} component={ Add } />,
        <PrivateRoute key={13} path={'/dashboard/edit/:id'} component={ Edit } />,
        <PrivateRoute key={14} path={'/dashboard/categories'} exact={true} component={ Categories } />,
        <PrivateRoute key={15} path={'/dashboard/categories/add'} component={ AddCategory } />,
        <PrivateRoute key={16} path={'/dashboard/categories/edit/:id'} component={ EditCategory } />,
        <PrivateRoute key={17} path={'/dashboard/featured'} component={ Featured } />,
]
// <--- Render App --->
ReactDOM.render (
    <Provider store={ store }>
        <Router history={ history }  >   
            <App routes={ routesArray } />
        </Router>
    </Provider>
    , document.getElementById('app')
)