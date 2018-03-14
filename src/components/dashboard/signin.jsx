'use strict'
import React, { Component } from 'react';
import history from '../../history.jsx';
//
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../actions/authActions.jsx';
//
import { Router, Route, Switch, Link } from 'react-router-dom';
class Signin extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps){  // redux updates props and triggers a force update
        // console.log('res');
        if(nextProps.authenticated){
            nextProps.history.push('/dashboard/products');
        }      
    }
    handleSubmit(event) {
        // note don't need link on signin as react will trigger update and the router will do the redirect
        event.preventDefault();
        // console.log('logging in');
        var user = {
            username: this.username.value,
            password: this.password.value
        }
          this.props.login(user);
          this.myFormRef.reset();
    }
    render(){
        // console.log('props', this.props);
        var that = this;
        return (
            <div className="signin">              
                <div className="row">
                    <form className="signin-form" onSubmit={that.handleSubmit} ref={(el) => that.myFormRef = el}>
                        <div className="signin-form-group lg-col-span-12">    
                            <label>User Name</label>
                            <input type="text" className="signin-form-control" ref={(input) => that.username = input} />
                        </div>
                        <div className="signin-form-group lg-col-span-12">    
                            <label>Password</label>
                            <input type="password" className="signin-form-control" ref={(input) => that.password = input}/>
                        </div>
                        <div className="signin-form-group lg-col-span-12">    
                            <input className="signin-form-btn" type="submit" value="Sign in"/>
                        </div>
                    </form>
                </div>
                  
            </div>);
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        login: login,
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        authenticated: state.auth.status,
        username: state.auth.name
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin);