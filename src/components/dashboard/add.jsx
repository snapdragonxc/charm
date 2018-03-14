'use strict'
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProduct, addProduct } from '../../actions/productActions.jsx';
import { getCategories } from '../../actions/categoryActions.jsx';
import { uploadImage, deleteImage, resetImage } from '../../actions/uploadActions.jsx';
import history from '../../history.jsx';
import { Router, Route, Switch, Link } from 'react-router-dom'
class Edit extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.subFunction = this.subFunction.bind(this);
        this.addFunction = this.addFunction.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.inventoryChange = this.inventoryChange.bind(this);
        this.state = {
            name: '',
            description: '',
            category: 'none',
            price: 0,
            saleprice: 0,
            inventory: 1,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.descriptionChange = this.descriptionChange.bind(this);
        this.priceChange = this.priceChange.bind(this);
        this.salePriceChange = this.salePriceChange.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
        this.imgFolder = "../../images/products/";
        // Image Handler
        this.handleImageSubmit = this.handleImageSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps){  // redux updates props and triggers a force update
    }
    nameChange(event) {
        this.setState({
            name: event.target.value
        });
    }    
    descriptionChange(event) {
        this.setState({
            description: event.target.value
        });
    }    
    categoryChange(event){
        this.setState({
            category: event.target.value
        });
    }
    priceChange(event) {
        var str = event.target.value.toString();
        if( str.match(/[a-z]/i) ) { // numbers only
            this.setState({ price: 0 });
        } else {
            this.setState({ price: event.target.value });
        }
    }    
    salePriceChange(event) {        
        var str = event.target.value.toString();
        if( str.match(/[a-z]/i) ) { // numbers only
            this.setState({ saleprice: 0 });
        } else {
            this.setState({ saleprice: event.target.value });
        }
    }    
    inventoryChange(event){  // to prevent reactjs warning msg
    }
    componentDidMount() {
        this.props.getCategories();
        this.props.resetImage();
    }
    handleSubmit(event) {
        event.preventDefault();
        var id = this.props.match.params.id;
        if(this.props.imageUrl == 'blank.jpg'){
            alert('image can not be empty');
            return;
        }
        if((this.state.price === '0') || (this.state.price === 0)){
            alert('price can not be zero');
            return;
        }
        if((this.state.name === '') || (this.state.name === null)){
            alert('name can not be empty');
              return;
        } 
        var imgUrl = this.props.imageUrl;
        var product = {
            _id: id,
            name: this.state.name,
            description: this.state.description,
            category: (this.state.category === "none")? '' : this.state.category,
            price: this.state.price,
            saleprice: this.state.saleprice,
            url: imgUrl,
            inventory: this.state.inventory
        }
            // console.log('add prod', product);
            this.props.addProduct(product);
            //this.props.history.push('../products');
            this.props.resetImage(); // reset image uploader
            this.props.history.goBack();
    }
    subFunction(event) {             
        event.preventDefault();
        if( (this.state.inventory - 1) === -1){
            this.setState( { inventory: 0 });    
        } else {
            this.setState( { inventory: this.state.inventory - 1 } );        
        }   
    }
    addFunction(event){
        event.preventDefault();
        if( (this.state.inventory + 1) === 100){
            this.setState( { inventory: 100 } );    
        } else {
            this.setState( { inventory: this.state.inventory + 1 } );    
        }
    }
    onCancel(event) {
        event.preventDefault();
        if(this.props.imageUrl != 'blank.jpg'){
            // else delete image from public folder
            var curImage = this.props.imageUrl;
            this.props.deleteImage(curImage);
        }
        this.props.history.goBack();
    }
    // 10th Jan 18
    handleImageSubmit(event) {
        event.preventDefault();
        // console.log( `Selected file - ${ this.fileInput.files[0].name }` );
        var data = new FormData();
        var file = this.fileInput.files[0];
        console.log('file', file);
        data.append("imgUploader", file);
        if(this.props.imageUrl == 'blank.jpg'){
            // if image blank then add new Image.
            this.props.uploadImage(data);
        } else {
            // else delete current image and add new Image.
            var curImage = this.props.imageUrl;
            this.props.deleteImage(curImage);
            this.props.uploadImage(data);
        }       
    }
    // end 10th Jan 18
    render(){
        var that = this;         
        const categoryOptions = this.props.categories.map(function(item, index){
            return(
                <option key={ index + 1 } value={ item.name }>{ item.name }</option>);
        });        
        return (
            <div className="product">
                <div className="row">
                    <header className="lg-col-span-12 product-header">                      
                        <h2>Add Product</h2>
                        <div className="clear"></div>
                        <div className="product-header-divider"></div>                                                                                              
                    </header>
                </div>
                <div className="row">
                    <form onSubmit={this.handleSubmit} id="formEdit">
                        <article className="lg-col-span-7 product-article">
                            <div className="row">
                                <div className="product-article-group lg-col-span-12">    
                                    <label>Product Name</label>                                    
                                    <input type="text" className="product-article-control" value={this.state.name} onChange={this.nameChange} />                                    
                                </div>
                                <div className="product-article-group lg-col-span-12">
                                    <label>Description</label>
                                    <textarea name="message" className="product-article-control" rows={8} value={this.state.description} onChange={this.descriptionChange} ></textarea>
                                </div>
                                <div className="product-article-group lg-col-span-12" >
                                    <label>Category</label>
                                    <select name="category" className="product-article-control" value={ this.state.category } onChange={this.categoryChange} >
                                        <option key={ 0 } value="none">none set</option>
                                        { categoryOptions }
                                    </select>
                                </div>
                                <div className="product-article-group lg-col-span-4" >
                                    <label>$ Price</label>
                                    <input type="text" className="product-article-control" value={this.state.price} onChange={this.priceChange} />
                                </div>
                                <div className="product-article-group lg-col-span-4" >
                                    <label>$ Sale Price</label>
                                    <input type="text" className="product-article-control" value={this.state.saleprice} onChange={this.salePriceChange} ></input>                         
                                </div>
                                <div className="product-article-group lg-col-span-4" >
                                    <label className="product-article-group-inventory">Inventory</label>
                                    <div className="product-article-spinner">
                                        <span className="product-article-sub" onClick={ (event) => this.subFunction(event) }>-</span>
                                            <input value={this.state.inventory} onChange={this.inventoryChange} type="number" />
                                        <span className="product-article-sub" onClick={ (event) => this.addFunction(event) }>+</span>
                                    </div>
                                </div>
                            </div>
                        </article>                                        
                        <aside className="lg-col-span-5 product-aside">                        
                            <h5 className="pull-right product-aside-btn" onClick={ () => document.getElementById('selectedFile').click()} ><i className="fa fa-plus" aria-hidden="true"></i> Add Image</h5>
                            <input id="selectedFile" type="file" ref={ input => { this.fileInput = input;} } style={{display: 'none'}} onChange={this.handleImageSubmit} />
                            <div className="pull-right product-aside-image-container">
                                <img src={ this.imgFolder + this.props.imageUrl } alt="" width='385' height='385'/>
                            </div>
                        </aside>
                    </form>
                </div>
                <div className="row">
                    <div className="lg-col-span-12 product-footer">    
                        <div className="clear"></div>
                        <div className="product-footer-divider"></div>                              
                        <button className="product-footer-btn pull-right" type="submit" form="formEdit" value="Submit">SAVE</button>
                        <button className="product-footer-btn pull-right" onClick={ (event) => this.onCancel(event) }>CANCEL</button>
                    </div>
                </div>                  
            </div>);
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getProduct: getProduct,
        addProduct: addProduct,
        getCategories: getCategories,
        uploadImage: uploadImage,
        deleteImage: deleteImage,
        resetImage: resetImage
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        product: state.productApi.product,
        categories: state.categoryApi.categories,
        imageUrl: state.uploadApi.name,
        authenticated: state.auth.status
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit);