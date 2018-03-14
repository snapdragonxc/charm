'use strict'
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  getCategories, addCategory } from '../../actions/categoryActions.jsx';
import history from '../../history.jsx';
import { Router, Route, Switch, Link } from 'react-router-dom';
import Axios from 'axios';
const categoryByNameUrl = '/api/category/byname/';
class AddCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nameChange = this.nameChange.bind(this);        
    }
    nameChange(event) {
        this.setState({
            name: event.target.value
        });
    }    
    handleSubmit(event) {
        event.preventDefault();
        this.props.getCategories();    
        var name = this.state.name;         
        var index = this.props.categories.findIndex( function(category) {
            return category.name == name;
        });
        if( index == -1 ){ // check for unique category
            var category = {
                name: name
            }
            this.props.addCategory(category);
            this.props.history.goBack();
        } else {
            alert('This category already exists'); // if not unique category, warn user
            this.setState({
                name: ''
            });
        }
    }
    onCancel(event) {
        event.preventDefault();
        this.props.history.goBack();
    }
    render(){
        return (
            <div className="category">
                <div className="row">
                    <header className="lg-col-span-12 category-header">                      
                        <h2>Add Category</h2>
                        <div className="clear"></div>
                        <div className="category-header-divider"></div>                                                                                              
                    </header>
                </div>
                    <div className="row">
                        <form className="category-form lg-col-span-12" onSubmit={this.handleSubmit} id="formAdd">
                            <input type="text" className="category-form-control" value={this.state.name} onChange={this.nameChange} />                                                    
                        </form>
                </div>
                <div className="row">
                    <footer className="category-footer lg-col-span-12">    
                    <div className="clear"></div>                           
                    <button className="category-footer-btn pull-right" type="submit" form="formAdd" value="Submit">SAVE</button>
                    <button className="category-footer-btn pull-right" onClick={ (event) => this.onCancel(event) }>CANCEL</button>
                    <div className="clear"></div>                            
                    </footer>
                </div>                  
            </div>);
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCategories: getCategories,
        addCategory: addCategory
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        categories: state.categoryApi.categories,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);