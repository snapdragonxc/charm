'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAllProducts } from '../../actions/productActions.jsx';
import { getFeaturedProducts, getFeaturedProduct, updateFeaturedProduct, createFeaturedProduct } from '../../actions/featuredActions.jsx';
import history from '../../history.jsx';
import { Router, Route, Switch, Link } from 'react-router-dom';
import SelectWidget from '../common/select.jsx'
const baseUrl = 'http://localhost:3000/dashboard/products/';
const imgFolder = "/images/products/";    
class Featured extends Component {
    constructor(props){
        super(props);
        this.state = {
            featuredList: [
                { productId: -1, productUrl: 'blank.jpg'},
                { productId: -1, productUrl: 'blank.jpg'},
                { productId: -1, productUrl: 'blank.jpg'}
            ]
        }
        this.onSelectChange = this.onSelectChange.bind(this);       
        //
    }
    componentDidMount(){
        // console.log('Component mounted')
        this.props.getAllProducts(); 
        this.props.getFeaturedProducts();
    }
    componentWillUnmount(){
        // console.log('Component unmounted')
    }
    componentWillReceiveProps(nextProps){  // redux updates props and triggers a force update
        if(nextProps.authenticated === false){
            //nextProps.history.goBack(); // could go anywhere
            nextProps.history.push('/dashboard/products'); // redirect to dashboard            
        } else {
            this.populateFeaturedList( nextProps );
        }
    }
    populateFeaturedList(nextProps){
        // Transfer featured list from props to state. This allows for the case of
        // an empty database. The alternative is to seed the database server side with 
        // initial values.
        // console.log(nextProps);
        var featuredList = this.state.featuredList.concat();
        for( var i = 0; i < featuredList.length; i++ ){
            if( nextProps.featuredProducts[i] ) { // if exist
                var index = nextProps.featuredProducts[i].index;
                // console.log(index);
                featuredList[index].productId = nextProps.featuredProducts[i].productId;
                // Find product and get url
                var product = nextProps.products.find(function(product){
                    if(product._id === nextProps.featuredProducts[i].productId) {
                        return product;
                    }
                })
                if( product ){                                
                    featuredList[index].productUrl = product.img;
                }
            }
        }
        this.setState({
            featuredList: featuredList
        })
    }
    onSelectChange(event, index){
        event.preventDefault();
        var productId = event.target.value;
        // console.log(productId, index);
        if( productId == -1 ){
            return; // cannot have a featured list with no product except on initialisation
        }
        var idx = this.props.featuredProducts.findIndex(function(item){
            return item.index === index; // check if featured product exists or not
        });    
        // <--- Update Redux Store. --->        
        var featuredProduct = {
            index: index,
            productId: productId
        }
        if( idx !== -1){ 
            // If featured product exists update Featured Product with Axios.
            this.props.updateFeaturedProduct(featuredProduct);
        } else {    
            // If not exist create Featured Product with Axios.
            this.props.createFeaturedProduct(featuredProduct);
        }
        // <--- Update State with new _id/image url --->
        var featuredList = this.state.featuredList.concat();
        featuredList[index].productId = featuredProduct._id;
        featuredList[index].productUrl = featuredProduct.img;        
        this.setState({
            featuredList: featuredList
        }) 
    }
    render(){
        var imgFolder = "/images/products/";
        var that = this;               
        const list = this.state.featuredList.map(function(item, index){
            return( 
                <div key={ index } className="lg-col-span-4" >
                    <div className="featured-product-image-container">
                        <img src={ imgFolder + item.productUrl } alt="none set"/>
                    </div>
                    <SelectWidget value={ item.productId } items={ that.props.products } handleChange={ (event) => that.onSelectChange(event, index) } />
                </div>);
        });             
        return (
            <div className="featured">                                                                  
                <form>    
                    <header className="row featured-header">
                        <div className="lg-col-span-12"><h2>Featured Products</h2></div>
                    </header>    
                    <div className="row">                
                        <div className="lg-col-span-12"><div className="featured-divider"></div></div>
                    </div>    
                    <div className="row featured-product">    
                        { list }
                    </div>
                </form>
            </div>);
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getAllProducts: getAllProducts,
        getFeaturedProduct: getFeaturedProduct,
        getFeaturedProducts: getFeaturedProducts,
        updateFeaturedProduct: updateFeaturedProduct,
        createFeaturedProduct: createFeaturedProduct
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        products: state.productApi.products,
        authenticated: state.auth.status,
        featuredProduct: state.featuredApi.featuredProduct,
        featuredProducts: state.featuredApi.featuredProducts
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Featured);
