'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProduct } from '../actions/productActions.jsx';
import { addToCart, updateCart } from '../actions/cartActions.jsx';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';
import history from '../history.jsx';
import Spinner from './common/spinner.jsx'
class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 1};
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);            
    }
    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        //window.scrollTo(0, 0); - alternative
    }
    componentDidMount() {
        this.props.getProduct(this.props.match.params.id);
        this.topFunction();
    }
    componentWillUnmount() {
        this.props.product.img = "";  /* to prevent previous image showing on mount */
        this.props.product.name = "";
        this.props.product.description = "",
        this.props.product.price = "";
    }
    handleChange(event) {} // To prevent ReactJS warning message if omitted
    subFunction(event){
        event.preventDefault();
        var qty = this.state.value;
        if(qty > 1){
            this.setState({value: qty - 1});
        }
    }
    addFunction(event ){
        event.preventDefault();
        var qty = this.state.value;
        this.setState({value: qty + 1});
    }
    onSubmit( event ) {
        event.preventDefault();
        //
        var item = Object.assign({}, this.props.product);
        var unit = parseInt(this.state.value);    
        // CHECK IF CART IS EMPTY
        if(this.props.cart.length > 0) {
            // CART IS NOT EMPTY
            let _id = this.props.product._id;
            let cartIndex = this.props.cart.findIndex(function(item){
                return item._id === _id;
            })
            
            // IF RETURNS -1 THERE ARE NO ITEMS WITH SAME ID
            if (cartIndex === -1){
                item.qty = unit;
                item.subTotal = item.qty * item.price;            
                var newCart = [...this.props.cart, item];               
                this.props.addToCart(newCart);
            } else {
                // WE NEED TO UPDATE QUANTITY
                this.props.updateCart(_id, unit, this.props.cart);
            }
        } else {
            // CART IS EMPTY
            item.qty = unit;
            item.subTotal = item.qty * item.price;
            var newCart = [...this.props.cart, item];
            this.props.addToCart(newCart);
        }
        this.props.history.goBack();
    }
    
    render(){
        // src="./images/detail/product-detail.jpg"
        var imgFolder = "/images/products/";          
        var product = this.props.product;                      
        var sku = '', price = 0;
        if(product._id){
            sku = 'Sku: ' + product._id.substr(-8, 8).toUpperCase(); // for display only.
        }
        if(product.price){
            price = product.price.toFixed(2);
        }
        return(<div>
            <div className="detail">
                <div className="row">                    
                    <nav className="sm-col-span-12 lg-col-span-12 detail-nav">
                        <div className="detail-nav-paginate-home">
                            <span><a onClick={ (event) => this.props.history.goBack() }><i className="fa fa-angle-left" aria-hidden="true"></i>&nbsp;Go Back</a></span>
                        </div>                            
                    </nav>
                </div>
                <div className="row">
                    <div className="sm-col-span-12 lg-col-span-7 detail-left">
                            <header className="detail-left-header">
                                <h2>{ product.name }</h2>
                                <h4><small>{ sku }</small></h4>
                                <h3>{'$' + price }</h3>
                            </header>
                            <div className="detail-left-image">        
                                <div>                              
                                    <a href={ imgFolder + product.img } target="_blank"><img src={ imgFolder + product.img } /></a>                                      
                                </div>
                            </div>
                            <div className="detail-left-description">
                                <p>{ product.description }</p>
                            </div>                             
                    </div>
                    <div className="sm-col-span-12 lg-col-span-5 detail-right">
                        <header className="detail-right-header">
                            <h2>{ product.name }</h2>
                            <h4><small>{ sku }</small></h4>
                            <h3>{'$' + price }</h3>
                        </header>
                        <form onSubmit={(event)=> this.onSubmit(event)}>                                              
                            <div className="detail-right-qty">
                                <h4><small>Quantity</small></h4>
                                <Spinner  qty={ this.state.value } sub={ (event) => this.subFunction(event) } add={ (event) => this.addFunction(event) } handleChange={ this.handleChange } />                                                                        
                            </div>
                            <button className="detail-right-btn">ADD TO CART</button>
                        </form>
                        <div className="detail-right-info">
                            <h4>PRODUCT INFO</h4>
                            <p>Charm Accessories jewellery are made from either Silver or Gold plated brass with Rhinestone crystals. 
                            To care for the crystals, wash in warm water and then pat dry with a soft, clean cloth. 
                            Avoid using chemicals and soaps as these will leave a residue on the cystals, causing them to become 
                            duller more quickly. On the silver plated metal, use a high-quality jewellery cleaner and tarnish remover. 
                            Gold plated jewellery requires less frequent cleaning. Jewellery should be stored away from natural 
                            sunlight. Use the protective jewellery box or tarnish-resistant pouch purchased with the jewellery. 
                            Do not use plastic bags as these can make silver tarnish faster.</p>
                        </div>
                        <div className="detail-right-info">
                            <h4>RETURN AND REFUND POLICY</h4>
                            <p>If you wish to return an item simply because you change your mind, 
                            we will gladly exchange or refund, provided that the item is in original 
                            condition, unworn and with tags still attached. In the interests of 
                            hygiene and for your protection we do not accept returns of, or provide 
                            refunds for pierced earrings, packs containing earrings, body jewellery 
                            and hair accessories unless the items are of unsatisfactory quality. If 
                            you’d like a refund or exchange then you will be expected to pay for 
                            shipping the item back to us. We do not cover postage costs for 
                            returning items.</p>
                        </div>
                              
                    </div>
                </div>
            </div>
        </div>);
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getProduct: getProduct,
        addToCart: addToCart,
        updateCart: updateCart
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        product: state.productApi.product,
        cart:state.cart.items
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail);
   