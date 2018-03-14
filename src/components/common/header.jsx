'use strict'
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCart } from '../../actions/cartActions.jsx';
import { logout } from '../../actions/authActions.jsx';
import { navEvent } from '../../actions/navActions.jsx';
import Axios from 'axios';
const Shipping = (props) => {
    if(props.loc == -1){
        return (
            <div className="row">
                <div className="sm-col-span-12 lg-col-span-12 site-shipping">
                    <h2>FREE SHIPPING AUSTRALIA WIDE ON ALL ITEMS</h2>
                </div>
            </div>);
      } else {
        return (
            <div></div>);
    }
}
class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: -1 // location = shopfront. location = dashboard when != -1
        };
        this.onSignout = this.onSignout.bind(this);
        this.onClickShop = this.onClickShop.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.shopEvent = false;
    }
    componentDidMount() {     
        var href = window.location.href;
        // console.log(href);
        var loc = href.search(/dashboard/i);
        if( loc === -1 ){
            this.props.getCart(); // get cart if not dashboard
        } 
        this.setState({location: loc});
    }
    onSignout(event){
        event.preventDefault();
        // console.log('signout');
        //this.props.history.push('/dashboard');
        this.props.logout();    
    }
    onClickShop(){
        this.shopEvent = !this.shopEvent;
        this.props.navEvent(this.shopEvent);
        var menu = document.getElementById("site-nav-id");
        menu.className = "site-nav";
    }  
    openMenu() {
        var menu = document.getElementById("site-nav-id");
        if (menu.className === "site-nav") {
            menu.className += " responsive";
        } else {
            menu.className = "site-nav";
        }
    }
    closeMenu(){
        var menu = document.getElementById("site-nav-id");
        menu.className = "site-nav";
    }  
    render() {    
        var num = this.props.totalQty || 0;
        var myCart = '';
        if ( num > 0 ){
            myCart = ' (' + num + ')';
        }
        var that = this;      
        var loc = this.state.location; 
        var homePath = ( loc === -1 )? '/' : '/dashboard';
        // note don't need link on signout link as react will trigger update and router will redirect
        const SiteNavApi = () => {
            if(this.props.authenticated){               
                return (
                    <ul className="site-nav dashboard-auth"> 
                        <li>
                            <Link to="/dashboard/products">PRODUCTS</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/categories">CATEGORIES</Link>
                        </li>
                        <li>
                            <Link to="/dashboard/featured">FEATURED</Link>
                        </li>
                        <li>
                            <a className="signout" onClick={ (event) => that.onSignout(event)}>
                                <span><i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;SIGNOUT</span>
                            </a>
                        </li>
                    </ul>);
            } else {
                return  <ul className="site-nav dashboard-not-auth" ></ul>;
            }
        };    
        const SiteNav = ()=> {
            return (
                <ul className="site-nav" id="site-nav-id">
                    <li className="site-nav-icon" onClick={ this.openMenu } >
                        <a href="javascript:void(0);">&#9776;</a></li>
                    <li>
                        <Link to="/" onClick={ this.closeMenu }>HOME</Link>
                    </li>
                    <li>
                        <Link to="/shop/all-items" onClick={ this.onClickShop } >SHOP</Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={ this.closeMenu }>ABOUT</Link>
                    </li>
                    <li>
                        <Link to="/faq" onClick={ this.closeMenu }>FAQ</Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={ this.closeMenu }>CONTACT</Link>
                    </li>
                    <li>
                        <Link to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i>{ myCart }</Link>
                    </li>
                </ul>);
        };
        return(
            <div>
                <header className="row site">                   
                    <div className="sm-col-span-12 lg-col-span-12 site-logo">                      
                    <Link to={ homePath } ><img className="site-logo-img" src="/images/front/logo.png" /></Link>
                    </div>
                    <nav className="sm-col-span-12 lg-col-span-12">
                        { ( loc === -1 )? <SiteNav/> : <SiteNavApi/> }
                    </nav>
                        <div className="ClearAll"></div>
                </header>
                <Shipping loc={loc} />                
            </div>);
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCart: getCart,
        logout: logout,
        navEvent: navEvent
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        totalQty: state.cart.totalQty,
        authenticated: state.auth.status
    }
}
const HeaderWithRouter = withRouter(Header) // don't really need anymore but anyway leave for future possibility
export default connect(mapStateToProps, mapDispatchToProps)(HeaderWithRouter);
  