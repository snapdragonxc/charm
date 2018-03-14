'use strict'
import React, { Component } from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom'
import Header from './common/header.jsx';
import Footer from './common/footer.jsx';
class App extends Component {
    render(){
        return(
            <div>
                <Header/>
                <Switch>
                    { this.props.routes }
                </Switch>
                <Footer/>
            </div>);
    }
}
export default App;
