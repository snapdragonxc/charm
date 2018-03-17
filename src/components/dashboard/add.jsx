'use strict'
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getProduct, addProduct } from '../../actions/productActions.jsx';
import { getCategories } from '../../actions/categoryActions.jsx';
import history from '../../history.jsx';
import { Router, Route, Switch, Link } from 'react-router-dom';

const fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
];
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
            img:'blank.jpg',
            imgUrl: ''
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
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.imgName == 'blank.jpg'){
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
        // set product
        var product = {
            name: this.state.name,
            description: this.state.description,
            category: (this.state.category === "none")? '' : this.state.category,
            price: this.state.price,
            saleprice: this.state.saleprice,
            img: this.state.img,
            inventory: this.state.inventory
        }
        // set image
        var productData = new FormData();
        var file = this.fileInput.files[0];   
        productData.append("imgUploader", file);
        productData.append("name", product.name);
        productData.append("description", product.description);
        productData.append("category", product.category);
        productData.append("price", product.price);
        productData.append("saleprice", product.saleprice);
        productData.append("inventory", product.inventory);
        // post product
        this.props.addProduct(productData);          
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
        this.props.history.goBack();
    }
    handleImageSubmit(event) {
        event.preventDefault();
        var curFiles = this.fileInput.files;
        if(curFiles.length === 0) {           
            console.log('No files currently selected for upload');
            return;            
        } else {            
            if(this.validFileType(curFiles[0])) {
                var img = curFiles[0].name;
                var fileSize =  this.getFileSize(curFiles[0].size);
                var imgUrl = window.URL.createObjectURL(curFiles[0]);                
                this.setState({ imgUrl: imgUrl, img: img});

            } else {
                console.log('Not a valid file type');                    
                return;
            }               
        }
    }    
    validFileType(file) {
        for(var i = 0; i < fileTypes.length; i++) {
            if(file.type === fileTypes[i]) {
                  return true;
            }
        }
        return false;
    }
    getFileSize(number) {
        if(number < 1024) {
            return number + 'bytes';
        } else if(number > 1024 && number < 1048576) {
            return (number/1024).toFixed(1) + 'KB';
        } else if(number > 1048576) {
            return (number/1048576).toFixed(1) + 'MB';
        }
    } 
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
                                
                                <img src={ this.state.imgUrl } alt="" width='385' height='385'/>
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
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        product: state.productApi.product,
        categories: state.categoryApi.categories,
        authenticated: state.auth.status
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit);

/*<img src={ this.imgFolder + this.props.imageUrl } alt="" width='385' height='385'/>*/