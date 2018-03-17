'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProductsByCategory, deleteProduct, updateProduct } from '../../actions/productActions.jsx';
import history from '../../history.jsx';
import { Router, Route, Switch, Link } from 'react-router-dom';
import Pagination from '../common/pagination.jsx'
const baseUrl = 'http://localhost:3000/dashboard/products/';
const imgFolder = "/images/products/";    
class Products extends Component {
    constructor(props){
        super(props);
        this.addOnClick = this.addOnClick.bind(this);
        this.deleteOnClick = this.deleteOnClick.bind(this);
        this.editOnClick = this.editOnClick.bind(this);
        this.addQty = this.addQty.bind(this);
        this.subQty = this.subQty.bind(this);
        this.onClickRoute = this.onClickRoute.bind(this);
        this.pageIndex = this.pageIndex.bind(this);
        this.onClickArrow = this.onClickArrow.bind(this);
        //
    }
    componentDidMount(){
        // console.log('Component mounted')
        var page = this.pageIndex();
        // console.log('pageIndex', page);
        this.props.getProductsByCategory('all-items', page -1); 
        // Add Listen function to monitor Browser Buttons
        this.unlisten = this.props.history.listen((location, action) => { 
            var currPage = this.pageIndex();
            if( action === 'POP' ){
                this.props.getProductsByCategory('all-items', currPage - 1); 
            }
        }); 
    }
    componentWillUnmount(){
        // console.log('Component unmounted')
        this.unlisten();
    }
    componentWillReceiveProps(nextProps){  // redux updates props and triggers a force update
        // console.log(nextProps);
    }
    pageIndex(){
        var pathname = this.props.location.pathname;
        var pageIndexStr = pathname.substr(pathname.lastIndexOf('/') + 1);
        var pageIndex = (pageIndexStr !== 'products')? parseInt(pageIndexStr) : 1;
        return pageIndex;
    }
    addOnClick(event) {
        event.preventDefault();
        this.props.history.push('/dashboard/add');
    }
    editOnClick(event, _id) {
        event.preventDefault();
        this.props.history.push('/dashboard/edit/' + _id);
    }
    deleteOnClick(event, index, curPage) {
        // console.log('index', index, 'cuPage', curPage)
        event.preventDefault();
        var product = Object.assign({}, this.props.products[index]);     
        var length = this.props.products.length;
        if( length - 1 === 0){
            this.props.deleteProduct(product);
            curPage = curPage - 1;
            if(curPage < 1){
                curPage = 1;
            }
            this.props.getProductsByCategory('all-items', curPage - 1);
            var url = "/dashboard/products/" +  curPage;
            this.props.history.push(url);
        } else {
            this.props.deleteProduct(product);
            //this.props.getProducts(curPage);
            this.props.getProductsByCategory('all-items', curPage - 1); 
        }
    }
    subQty(event, index) {             
        event.preventDefault();
        var product = Object.assign( {}, this.props.products[index] ); // to prevent change of state.
        product.inventory = product.inventory - 1; 
        if( product.inventory === -1 ){
            product.inventory = 0;
        }
        this.props.updateProduct(product);        
    }
    addQty(event, index){
        event.preventDefault();
        var product = Object.assign( {}, this.props.products[index] ); // to prevent change of state.
        product.inventory = product.inventory + 1; 
        this.props.updateProduct(product);        
    }
    onClickRoute(event, index){
        event.preventDefault();
        var url = "/dashboard/products/" +  index;
        this.props.history.push(url);
        this.props.getProductsByCategory('all-items', index - 1); 
    }
    onClickArrow(event, index, max){
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
        var url = "/dashboard/products/" +  index;
        this.props.history.push(url);
        this.props.getProductsByCategory('all-items', index - 1);  
    }
    render(){    
        var that = this; 
        //
        var curPage = parseInt(this.pageIndex());        
          var pages = (this.props.pages < 50)? this.props.pages : 50; // set limit on number of pages        
        //
        var products;
        if(this.props.products != undefined){
            products = this.props.products;
        } else {
            products = [];
        }
        const list = products.map(function(item, index){
            //var    sku = 'Sku: ' + item._id.substr(-8, 8).toUpperCase(); // for display only.
            var sku = item._id.substr(-8, 8).toUpperCase(); // for display only.
            return( 
                <tr key={ index }>
                    <td>
                        <div className="products-table-image-container">
                            <img src={ imgFolder + item.img } alt="" width="100" height="100" />
                        </div>
                    </td>
                    <td>
                        { sku }
                    </td>
                    <td>
                        { item.name }
                    </td>
                    <td>
                        {'$' + item.price.toFixed(2) }
                    </td>
                    <td>
                        <span className="products-table-spinner">
                            <span className="products-table-sub" onClick={ (event) => that.subQty(event, index)}>-</span>                                
                            <span className="products-table-inventory">{ item.inventory }</span>
                            <span className="products-table-add" onClick={ (event) => that.addQty(event, index)}>+</span>
                        </span>
                    </td>
                    <td>
                        <span className="products-table-link" onClick={ (event) => that.editOnClick(event, item._id ) } >Edit</span>
                    </td>
                    <td>
                        <span className="products-table-link" onClick={ (event) => that.deleteOnClick(event, index, curPage) } >Delete</span>
                    </td>
                </tr>);
        });
        return (
            <div className="row products">
                <div className="lg-col-span-12 products-header">                      
                    <h2>Products</h2>                          
                    <button className="products-header-btn" onClick={ (event) => this.addOnClick(event)}>ADD</button>        
                    <div className="clear"></div>
                    <div className="products-header-divider"></div>                                                  
                </div>                  
                <div className="lg-col-span-12">                      
                    <table className="products-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Sku</th>            
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Inventory</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>                        
                    <tbody>
                        { list }                           
                    </tbody>
                        <tfoot></tfoot>
                    </table>
                    <Pagination number={ pages } onClickArrow={this.onClickArrow} onClickRoute={this.onClickRoute} curPage={ curPage }/>                                                           
                </div>
            </div>);
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getProductsByCategory: getProductsByCategory,
        deleteProduct: deleteProduct,
        updateProduct: updateProduct
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        products: state.productApi.products,
        pages: state.productApi.pages,
        authenticated: state.auth.status
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products);
  