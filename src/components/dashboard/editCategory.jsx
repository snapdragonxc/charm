'use strict'
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategories, getCategory, updateCategory } from '../../actions/categoryActions.jsx';
import history from '../../history.jsx';
import { Router, Route, Switch, Link } from 'react-router-dom'
import Axios from 'axios';
const categoryByNameUrl = '/api/category/byname/';
class EditCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.currentName = '';        
    }
    componentDidMount() {
        this.props.getCategory(this.props.match.params.id);
    }
    nameChange(event) {
        this.setState({
            name: event.target.value
        });
    }    
    componentWillReceiveProps(nextProps){  // redux updates props and triggers a force update
        this.setState({
            name: nextProps.category.name
        }); 
        this.currentName = nextProps.category.name; // set current name throughout life cycle.
    } 
    handleSubmit(event) {
        event.preventDefault();
        if( this.state.name === this.currentName ){ 
            // name has not been changed
            this.props.history.goBack();
        } else {
            // change name
            this.props.getCategories();    
            var name = this.state.name;
            var index = this.props.categories.findIndex( function(category) {
                return category.name == name;
            });
            if( index == -1 ){ // check for unique name
                // name does not exist
                var id = this.props.match.params.id;
                // console.log(id);
                var category = {
                    _id: id,
                    name: name,
                }
                // change name
                this.props.updateCategory(category);
                this.props.history.goBack();
            } else {    
                // name already exists
                alert('This category already exists'); // warn user
                this.setState({
                    name: ''
                });
            }                   
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
                        <h2>Edit Category</h2>
                        <div className="clear"></div>
                        <div className="category-header-divider"></div>                                                                                              
                    </header>
                </div>
                <div className="row">
                        <form className="category-form lg-col-span-12" onSubmit={this.handleSubmit} id="formEdit">
                            <input type="text" className="category-form-control" value={this.state.name} onChange={this.nameChange} />                                                    
                      </form>
                </div>
                <div className="row">
                    <footer className="category-footer lg-col-span-12">    
                        <div className="clear"></div>                            
                        <button className="category-footer-btn pull-right" type="submit" form="formEdit" value="Submit">SAVE</button>
                        <button className="category-footer-btn pull-right" onClick={ (event) => this.onCancel(event) }>CANCEL</button>
                        <div className="clear"></div>                            
                    </footer>
                </div>                  
            </div>);
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCategory: getCategory,
        getCategories: getCategories,
        updateCategory: updateCategory
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        category: state.categoryApi.category,
        categories: state.categoryApi.categories,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);