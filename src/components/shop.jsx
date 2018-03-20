'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {  getProductsByCategory } from '../actions/productActions.jsx';
import { getCategories } from '../actions/categoryActions.jsx';
import history from '../history.jsx';
import { Router, Route, Switch, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import Pagination from './common/pagination.jsx'
const imgFolder = "/images/products/";    
class Shop extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: ''
        }
        this.handleOptionChange.bind(this);
        this.onClickRoute = this.onClickRoute.bind(this);
        this.pageIndex = this.pageIndex.bind(this);
        this.onClickArrow = this.onClickArrow.bind(this);
        this.categoryOnClick = this.categoryOnClick.bind(this);
        //
        // Add Listen function to monitor Browser Buttons
        this.unlisten = this.props.history.listen((location, action) => { 
            var currPage = this.pageIndex();
            var params = this.getCategoryFromPath(location.pathname);
            var category = params[0];
            if( action === 'POP' ){
                //console.log('pop', currPage);
                this.setState({category: category});
                this.props.getProductsByCategory(category, currPage - 1); 
            }
        }); 
    }
    componentDidMount(){
        //console.log("mounted");
        this.props.getCategories();
        var params = this.props.location.pathname.slice(6).split('\/');
        var category = params[0];
        //console.log(category);
        var page = params[1];
        page = (typeof page === 'undefined') ? 1 : page;
        this.setState({category: category});
        //this.props.getProductsByCategory(category, page);
        this.props.getProductsByCategory(category, page - 1);
    }
    componentWillReceiveProps(nextProps){  // redux updates props and triggers a force update
        if(nextProps.nav != this.props.nav){
            // for some reason an update did not happen when nav-menu clicked, hence this.
            //console.log('nav event');
            this.setState({category: 'all-items'}); 
            this.props.getProductsByCategory('all-items', 0);
        }
    }  
    componentWillUnmount(){
        //console.log('Component unmounted')
        this.unlisten();
    }
    categoryOnClick( name ){
        this.props.history.push("/shop/" + name);
        this.props.getProductsByCategory(name, 0);    
        this.setState({
            category: name
        });     
        //console.log(name, this.NavAllItemsClickEvent);
    }
    handleOptionChange(category) {
        this.categoryOnClick( category );
    }
    detailOnClick(event, _id, inventory) {
        event.preventDefault();
       // console.log(inventory)
        if(inventory === 0){
            return;
        }
        this.props.history.push("/detail/" + _id);
    }
    onClickRoute(event, index){
        event.preventDefault();
        var url = "/shop/" + this.state.category + "/" + index;
        this.props.history.push(url);
        //this.props.getProductsByCategory(this.state.category, index); 
        this.props.getProductsByCategory(this.state.category, index - 1 ); 
    }
    onClickArrow(event, index, max){
        //console.log("index", index);
        event.preventDefault();
        if(index === max){
            index = max -1;
        }
        if(index === 0){
            //index = 0;
            index = 1;
        }
        var curPage = parseInt(this.pageIndex());
        if(index == curPage)
            return;     
        var url = "/shop/" + this.state.category + "/" + index;
        this.props.history.push(url);
        //this.props.getProductsByCategory(this.state.category, index); 
        this.props.getProductsByCategory(this.state.category, index - 1); 
    }
    getCategoryFromPath(pathname){
        //var params = this.props.location.pathname.slice(6).split('\/');
        var params = pathname.slice(6).split('\/');    
        return params;
    }
    pageIndex(){
        var params = this.props.location.pathname.slice(6).split('\/');
        var page;
        if( params[1] === undefined){
            //page = 0;
            page = 1;
        } else {
            page = params[1];
        }
        return page;
    }
    render(){
        var that = this;
        const categoryList = this.props.categories.map(function(item, index){
            return(
                <li className="shop-nav-filter" key={ index + 1}>
                    <a onClick={ (event) => that.categoryOnClick(item.name )} >
                        { item.name }
                    </a>
                    <input type="radio" value={ item.name } checked={that.state.category === item.name} 
                        onChange={ (event) => that.handleOptionChange(item.name)} />
                </li>
            )
        });
        var products;
        if(this.props.products != undefined){
            products = this.props.products;
        } else {
            products = [];
        }
        const list = products.map(function(item, index){
            if( (index + 1) % 3 == 0 ){  // account for un-even column heights in row
                return( 
                    <div key={ index } >
                        <li className="sm-col-span-9 lg-col-span-4 shop-products-product"> 
                            <div onClick={ (event) => that.detailOnClick(event, item._id, item.inventory ) }>
                                <img src={ imgFolder + item.img.substring(0, item.img.length-4) + '_thb.jpg' }/>
                            </div>
                            <h3>{ item.name }</h3>
                            { ( item.inventory === 0 )? 
                            <p> <span className="shop-products-product-price-out-of-stock">{ '$' + item.price.toFixed(2) }</span>
                                <span className="shop-products-product-out-of-stock"> Out of Stock</span></p> :
                            <p>{ '$' + item.price.toFixed(2) }</p>}
                        </li>
                        <div className="clear"></div>
                    </div>
                )
            } else {
                return( 
                    <li key={ index } className="sm-col-span-9 lg-col-span-4 shop-products-product"> 
                        <div onClick={ (event) => that.detailOnClick(event, item._id, item.inventory ) }>
                            <img src={ imgFolder + item.img.substring(0, item.img.length-4) + '_thb.jpg' }/>
                        </div>
                         <h3>{ item.name }</h3>
                        { ( item.inventory === 0 )? 
                            <p> <span className="shop-products-product-price-out-of-stock">{ '$' + item.price.toFixed(2) }</span>
                                <span className="shop-products-product-out-of-stock"> Out of Stock</span></p> :
                            <p>{ '$' + item.price.toFixed(2) }</p>}
                    </li>
                )
            }
        });
        var curPage = parseInt(this.pageIndex());        
        //console.log(curPage);
        var pages = (this.props.pages < 50)? this.props.pages : 50; // set limit on number of pages        
        return (
            <div className="shop">
                <div className="row">
                    <nav className="sm-col-span-12 lg-col-span-3 shop-nav">
                        <h2>Shop</h2>
                        <div className="shop-nav-divider"></div>
                        <ul className="shop-nav-filter-container">
                            <form>
                                <li className="shop-nav-filter" key={0}>
                                    <a onClick={ (event) => this.categoryOnClick("all-items" ) }> All Items </a>
                                    <input type="radio" value='all-items' checked={this.state.category === 'all-items'} 
                                          onChange={(event) => this.handleOptionChange('all-items')}/>
                                  </li>
                                { categoryList }
                            </form>
                        </ul>
                        <div className="shop-nav-divider"></div>
                    </nav>
                    <article className="sm-col-span-12 lg-col-span-9 shop-products">
                        <ul className="row shop-products-container">
                            { list }    
                        </ul>     
                        <Pagination number={ pages } onClickArrow={this.onClickArrow} onClickRoute={this.onClickRoute} curPage={ curPage }/>
                    </article>
                </div>           
            </div>
        );
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getProductsByCategory: getProductsByCategory,
        getCategories: getCategories,
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        products: state.productApi.products,
        pages: state.productApi.pages,
        categories: state.categoryApi.categories,
        nav: state.nav.event
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Shop));