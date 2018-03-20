'use strict'
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateCart, getCart, deleteCartItem } from '../actions/cartActions.jsx';
import Spinner from './common/spinner.jsx';

import clientConfig from '../clientConfig.jsx';

/* Paypal start */
let PayPalButton = paypal.Button.driver('react', { React, ReactDOM });
class PaymentBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            env: 'sandbox', //'production',//  
            locale: 'en_AU',
            style: {
                size: 'responsive',
                color: 'gold',
                shape: 'rect',
                label: 'checkout'
            },
            client: {
                sandbox:    clientConfig.paypalSandboxID,
                production: clientConfig.paypalProductionID
            },
            commit: true
        };
    }
    payment(data, actions) {
        var list = this.props.cart.map(function(item, index){
            return {
                price: item.price.toFixed(2),
                quantity: item.qty,
                name: item.name,
                description: item.description,
                currency: 'AUD'
            }
        });
        var total = this.props.total;
        return actions.payment.create({
            transactions: [
                {
                    amount: { total: total, currency: 'AUD' },
                    item_list: { items: list }
                }]
        });
    }
    onAuthorize(data, actions) {
        var callback = this.props.callback;
        return actions.payment.execute().then(function(paymentData) {
            // Show a success page to the buyer
            callback();
        });
    }
    render() {
        return (
            <PayPalButton
                commit={ this.state.commit }
                env={ this.state.env }
                client={ this.state.client }
                style= { this.state.style }
                payment={ (data, actions) => this.payment(data, actions) }
                onAuthorize={ (data, actions) => this.onAuthorize(data, actions) }
            />
        );
    }
}
/* Paypal end */
class Cart extends Component {
    constructor(props){
        super(props);
        //this.state = {value: 1, max: 10, min: 1}    
        this.state = {message: 'Your cart is empty'}    
        this.handleChange = this.handleChange.bind(this); // To prevent ReactJS warning message if omitted
        this.subFunction = this.subFunction.bind(this);
        this.addFunction = this.addFunction.bind(this);
        this.onPay = this.onPay.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.maxQty = 10;
        this.minQty = 1;
    }
    componentDidMount() {
        this.props.getCart();
    }
    handleChange(event) {} // To prevent ReactJS warning message if omitted
    onDelete(event, _id){
        // console.log('delete called');
        event.preventDefault();        
        const cart = this.props.cart;
        // Determine at which index in array is the item to be deleted
        const indexToDelete = cart.findIndex(
            function(item){
                return item._id === _id;
            }
        )
        //use slice to remove the item at the specified index
        var cartAfterDelete = [...cart.slice(0, indexToDelete), ...cart.slice(indexToDelete + 1)]
        this.props.deleteCartItem(cartAfterDelete);
    }     

    onPay(){   
        var cartAfterDelete = []
        this.props.deleteCartItem(cartAfterDelete);
        this.setState({message: 'Payment successful'})
    }
    subFunction(event, _id, quantity){
        // console.log('sub', _id, 'qty', quantity);
        event.preventDefault();
        if(quantity > 1){
            this.props.updateCart( _id, -1, this.props.cart);
        }
    }
    addFunction(event, _id){
        event.preventDefault();
        this.props.updateCart( _id, 1, this.props.cart);
    }
    render(){
        var imgFolder = "images/products/";
        var total = this.props.totalAmount || 0;
        var num = this.props.totalQty || 0;
        // console.log(num);
        var that = this;
        const list = this.props.cart.map(function(item, index){
            var sku = 'Sku: ' + item._id.substr(-8, 8).toUpperCase(); // for display only.
            var price = item.price.toFixed(2);
            var subTotal = item.subTotal.toFixed(2);
            return( 
                <div key={ index } className="row cart-table-body" >
                    <div className="sm-col-span-5 lg-col-span-3" >
                        <div className="cart-table-body-image-container">
                            <img src={ imgFolder + item.img } />
                        </div>
                    </div>
                    <div className="sm-col-span-7 lg-col-span-4 cart-table-body-item" >
                        <h3>{ item.name }</h3>
                        <h4>{ sku }</h4>
                        <h4>{ 'Price: $' + price }</h4>                                 
                        <a className="cart-table-body-item-delete" onClick={ (event) => that.onDelete(event, item._id) }>Remove Item</a>                        
                        <a className="cart-table-body-item-delete mobile" onClick={ (event) => that.onDelete(event, item._id) }>X</a>
                    </div>
                    <div className="sm-col-span-6 lg-col-span-3 cart-table-body-qty">                        
                        <Spinner  qty={ item.qty } sub={ (event) => that.subFunction(event, item._id,  item.qty) } add={ (event) => that.addFunction(event, item._id) } handleChange={ that.handleChange } />
                    </div>
                    <div className="sm-col-span-6 lg-col-span-2 cart-table-body-subTotal" >
                        <h3>{'$' + subTotal }</h3>
                    </div>
                    <div className="sm-col-span-12 lg-col-span-12"><div className="cart-table-divider"></div></div>
                </div>)
        });
        const Table = (props) => {   
            return (
                <form>
                    <div className="row cart-table-header">                    
                        <div className="lg-col-span-3 cart-table-header-prod">PRODUCT</div>
                        <div className="lg-col-span-4">ITEM</div>
                        <div className="lg-col-span-3 cart-table-header-qty">QUANTITY</div>
                        <div className="lg-col-span-2 cart-table-header-subTotal">TOTAL</div>
                    </div>
                    <div className="row"> 
                        <div className="sm-col-span-12 lg-col-span-12"><div className="cart-table-divider"></div></div>
                    </div>                                    
                    { props.list }
                    <div className="row cart-table-footer">
                        <div className="sm-col-span-12 lg-col-span-12">
                            <h3>Subtotal:&nbsp;&nbsp;${ props.total }</h3>
                            <h4>GST and shipping are included in total.</h4>
                        </div>
                    </div>
                </form>)          
        }
        const EmptyTable = (props) => {
            return (
                <div>
                    <div className="row"> 
                        <div className="sm-col-span-12 lg-col-span-12"><div className="cart-table-divider"></div></div>
                    </div>
                    <div className="row">
                        <div className="sm-col-span-12 lg-col-span-12">
                            <div className="cart-empty-table">
                                <h3>{ props.message }</h3>
                                <h3><a onClick={ (event) => this.props.history.goBack() }>
                                    <i className="fa fa-angle-left" aria-hidden="true"></i>&nbsp;Return</a>
                                </h3>                  
                            </div>
                        </div>
                    </div>
                </div>);
        }
        return (
            <div className="cart">                                                  
                <header className="row cart-header">
                    <div className="sm-col-span-12 lg-col-span-6"><h2>{'My Cart (' + num + ')'}</h2></div>
                    <div className="sm-col-span-12 lg-col-span-6">
                        <div className="pay-btn">
                            { ( num === 0 )? <div></div> : <PaymentBtn callback={ that.onPay } cart={this.props.cart} total={total}/> }                                
                        </div>
                    </div>
                </header>    
                { ( num === 0 )? <EmptyTable message={this.state.message} /> : <Table list={ list } total={ total } /> }                                                
                <div className="row"> 
                    <div className="sm-col-span-12 lg-col-span-12"><div className="cart-table-divider"></div></div>
                </div>
                <footer className="row cart-footer">                      
                    <div className="sm-col-span-12 lg-col-span-12">
                        <div className="pay-btn">
                            { ( num === 0 )? <div></div> : <PaymentBtn callback={ that.onPay } cart={this.props.cart} total={total}/> }    
                        </div>
                    </div>
                </footer>   
            </div>);
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCart: getCart,
        updateCart: updateCart,
        deleteCartItem: deleteCartItem
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        cart: state.cart.items,
        totalAmount: state.cart.totalAmount,
        totalQty: state.cart.totalQty
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);