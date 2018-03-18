'use strict'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFeaturedProductsInFull } from '../actions/featuredActions.jsx';
import history from '../history.jsx';
//
var windowWidth = window.innerWidth;
const imgFolder = "/images/products/";    
class Home extends Component {
    constructor(props){
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.imgUrl = './images/front/';
        this.scaleLargeImg = 438.0/938.0;
        this.scaleSmallImg= 210.0/324.0;
        this.onResize = this.onResize.bind(this);
        this.onOrientationChange = this.onOrientationChange.bind(this);
        this.state = {
            width: 938,
            height: 438,
            imageSize: 'large',
            items : [{
                visibility: 'hidden',
                right: -1* 938,
                src: this.imgUrl + "slide1",
            },{
                visibility: 'visible',
                right: 0,
                src: this.imgUrl + "slide2"
            },{
                visibility: 'visible',
                right: 938,
                src: this.imgUrl + "slide3"
            }]
        };
        this.displayList = [{
            _id: -1,
            productUrl: "blank.jpg",
            name: "none set",
            price: 0.00
        }, {
            _id: -1,
            productUrl: "blank.jpg",
            name: "none set",
            price: 0.00
        }, {
            _id: -1,
            productUrl: "blank.jpg",
            name: "none set",
            price: 0.00
        }];
    }
    componentDidMount() {
        this.props.getFeaturedProductsInFull();
        window.addEventListener("resize", this.onResize);
        window.addEventListener('orientationchange', this.onOrientationChange); // for mobile        
        this.updateDimensions();
        this.timerID = setInterval(() => this.tick(), 5000);            
    }
    componentWillReceiveProps(nextProps){  // redux updates props and triggers a force update
        this.populateFeaturedProducts( nextProps );
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
        window.removeEventListener("resize", this.onResize);
        window.removeEventListener("orientationchange", this.onOrientationChange);
    }
    populateFeaturedProducts(nextProps){
        var displayList = this.displayList;
        for( var i = 0; i < displayList.length; i++ ){
            if( nextProps.featuredProductsInFull[i] ) { // if exist
                displayList[i]._id = nextProps.featuredProductsInFull[i]._id;                            
                displayList[i].productUrl = nextProps.featuredProductsInFull[i].img;
                displayList[i].name = nextProps.featuredProductsInFull[i].name;
                displayList[i].price = nextProps.featuredProductsInFull[i].price;
            }
        } 
    }
    onResize(){
        // Checks that window width has actually changed and it's not
        // just iOS triggering a resize event on scroll
        
        if ( window.innerWidth != windowWidth ) {
            windowWidth = window.innerWidth;
            this.updateDimensions();
        }
    }
    onOrientationChange(){
        this.updateDimensions();
    }
    updateDimensions(){
        var items = this.state.items.concat();
        var measure = document.getElementById("measure");
        var width = measure.clientWidth-2; // 2px for border
        var scale = 1, imageSize = '';
        if( width > 400 ) {
            scale = this.scaleLargeImg;
            imageSize = 'large';
        } else {
            scale = this.scaleSmallImg;
            imageSize = 'small';
        }
        var height = width * scale ;
        // reset image state
        items[0].visibility = 'hidden';
        items[0].right = -1 * width;
        items[1].visibility = 'visible';
        items[1].right = 0;
        items[2].visibility = 'visible';
        items[2].right = width;
        this.setState({width: width, height: height, imageSize: imageSize, items: items});
    }
    tick() { // used with changing banner
        var items = this.state.items.concat();             
        items.forEach( function(item){
            if(item.right == this.state.width){ // return item to end of list. Hide whilst moving
                item.right = -this.state.width;
                item.visibility = 'hidden'; 
            } else {
                item.right = item.right + this.state.width;
                item.visibility = 'visible';
            }
        }.bind(this) ); 
        this.setState({items: items});          
    }
    displayOnClick(event, _id) {
        event.preventDefault();
        this.props.history.push("/detail/" + _id);       
    }
    render(){
        var imageFile = (this.state.imageSize === 'large')?  '.jpg' : 'Small.jpg';
        const items = this.state.items.map( function(item, index){
            return(
                <div key={index} className="img-container" id="img-container" style={{right: item.right, visibility: item.visibility }} >
                    <img className="large" src={item.src + imageFile} width={this.state.width} height={this.state.height} />
                </div>
            )
        }.bind(this)); 
        //console.log(displayList);
        var that = this;
        const displays = this.displayList.map( function(display, index){
            return(
                <div  key={index} className="sm-col-span-8 lg-col-span-4 home-display-product">
                    <div className="home-display-product-img-container">
                        <span onClick={ (event) => that.displayOnClick(event, display._id ) }>
                            <img src={ imgFolder + display.productUrl } alt="none set"/>
                        </span>
                    </div>
                        <div className="home-display-product-caption">
                        <h3>{ display.name }</h3>
                        <p>{ '$' + display.price.toFixed(2) }</p>
                    </div>
                </div>
            );
        });
        return(
            <div className="home">
                <div className="clear"></div>
                    <div className="row">
                        <div className="sm-col-span-12 lg-col-span-12"><div id="measure"></div></div>
                    </div>
                    <div className="row">
                        <div className="sm-col-span-12 lg-col-span-12">
                            <div  className="home-banner" style={{height: this.state.height + "px"}}>
                                { items }
                            </div>
                        </div>
                </div>
                <div className="row">
                    <div className="home-banner-caption sm-col-span-12">
                        <h1>FASHION JEWELLERY</h1>
                        <p>Elegant, charming and beautiful jewellery for your every occasion from wedding to formal 
                        or casual events. Fast delivery from Sydney, Australia wide.</p>
                        <div className="home-banner-btn sm-col-span-12">
                            <Link to="/shop/all-items">SHOP NOW</Link>
                        </div>
                    </div>
                </div>
                <div className="clear"></div>
                <div className="row">
                    <div className="sm-col-span-12 lg-col-span-12 home-featured">
                        <h2>FEATURED PRODUCTS</h2>
                        <div className="home-featured-underline"></div>
                    </div>
                </div>
                <div className="row home-display">                          
                    { displays }
                </div>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getFeaturedProductsInFull: getFeaturedProductsInFull,
    }, dispatch)
} 
function mapStateToProps(state){
    return {
        featuredProductsInFull: state.featuredApi.featuredProductsInFull,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);