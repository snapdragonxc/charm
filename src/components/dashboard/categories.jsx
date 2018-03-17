'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCategories, deleteCategory } from '../../actions/categoryActions.jsx';
import history from '../../history.jsx';
import { Router, Route, Switch, Link } from 'react-router-dom';
const baseUrl = 'http://localhost:3000/dashboard/products/';
class Categories extends Component {
    constructor(props){
        super(props);
        this.addOnClick.bind(this);
        this.deleteOnClick.bind(this);
        this.editOnClick.bind(this);    
    }
    componentDidMount(){
        // console.log('Component mounted');
        this.props.getCategories();    
    }
    componentWillUnmount(){
        // console.log('Component unmounted')        
    }
    componentWillReceiveProps(nextProps){  // redux updates props and triggers a force update
        if(nextProps.authenticated === false){
            //nextProps.history.goBack(); // could go anywhere
            nextProps.history.push('/dashboard/products'); // redirect to dashboard
        }
    }
    addOnClick(event) {
        event.preventDefault();
        this.props.history.push('/dashboard/categories/add');
    }
    editOnClick(event, _id) {
        event.preventDefault();
        this.props.history.push("/dashboard/categories/edit/" + _id);
    }
    deleteOnClick(event, index) {
        event.preventDefault();
        var category = Object.assign({}, this.props.categories[index]);             
        this.props.deleteCategory(category);            
    }
    render(){    
        var that = this; 
        var categories = this.props.categories;        
        const list = categories.map(function(item, index){
            return( 
                <tr key={ index }>                    
                    <td>
                        { item.name }
                    </td>
                    <td>
                        <span className="categories-article-table-link" onClick={ (event) => that.editOnClick(event, item._id ) } >Edit</span>
                    </td>
                    <td>
                        <span className="categories-article-table-link" onClick={ (event) => that.deleteOnClick(event, index) } >Delete</span>
                    </td>
                </tr>)
        });
        return (
            <div className="row">
                <div className="categories">
                <header className="lg-col-span-12 categories-header">                      
                    <h2>Categories</h2>                         
                    <button className="categories-header-btn" onClick={ (event) => this.addOnClick(event)}>ADD</button>        
                    <div className="clear"></div>
                    <div className="categories-header-divider"></div>                                              
                </header>
                <article className="lg-col-span-12">
                    <table className="categories-article-table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Edit</th>            
                            <th>Delete</th>
                        </tr>
                        </thead>                    
                        <tbody>
                            { list }                        
                        </tbody>
                        <tfoot></tfoot>
                    </table>                                                                   
                </article>
                </div>
            </div>);
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCategories: getCategories,
        deleteCategory: deleteCategory
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        categories: state.categoryApi.categories,
        authenticated: state.auth.status
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Categories);
