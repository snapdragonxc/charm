'use strict'
import React, { Component } from 'react';
var windowWidth = window.innerWidth
class About extends Component {
    constructor(props){
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.onResize = this.onResize.bind(this);
    }
    componentDidMount() {
        window.addEventListener("resize", this.onResize);
    }
    onResize(){
        // Checks that window width has actually changed and it's not
        // just iOS triggering a resize event on scroll 
        if ( window.innerWidth != windowWidth ) {
            windowWidth = window.innerWidth;
            this.updateDimensions();
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.onResize);
    }
    updateDimensions(){
        // Set column heights to be the same if on desktop. Mobile doesn't need
        var hgtArticle = document.getElementsByClassName('about-article');
        var hgtImgCont = document.getElementsByClassName('about-aside-img-container');
        var hgtImg = document.getElementsByClassName('about-aside-img');
        hgtImgCont[0].style.height = hgtImg[0].clientHeight + 'px';
        if( windowWidth > 700) {
            if ( hgtImg[0].clientHeight < hgtArticle[0].clientHeight   ) {          
                hgtImgCont[0].style.height =  hgtArticle[0].clientHeight + 'px';               
            } else {
                hgtImgCont[0].style.height = hgtImg[0].clientHeight + 'px';
            }
        }
    }
    render(){
        return (
            <div className="row about">
                <nav className="sm-col-span-12 lg-col-span-3 about-nav">
                    <h2>About</h2>
                    <div className="about-nav-divider"></div>
                </nav>
                <article className="sm-col-span-12 lg-col-span-4 about-article">                      
                    <div className="about-article-txt">
                        <p>I'm Katie Chen, the owner of Charm Accessories. Charm accessories is young, vibrant, charming and diverse. We aim to bring you high quality fashion 
                        jewellery and accessories.  We have an extensive range to cover all your options for styles, age groups 
                        and budget. We cater for all occasions: wedding, formal, party, casual and myriades more. We invite you to 
                        join us to explore our fabulous fashion collections to charm yourself.</p>
                        <p>We wish you enjoy your shopping with us.  Please do not hesitate to contact me, 
                        if you would like any assistance or if you have any questions.</p>
                        <p>Katie Chen<br/>2018</p>
                    </div>
                </article>
                <aside className="sm-col-span-12 lg-col-span-5 about-aside">
                    <div className="about-aside-img-container">
                        <img className="about-aside-img" src="./../images/front/about.jpg" onLoad={ ()=> this.updateDimensions() }/>
                    </div>
                </aside>
                  
            </div>);
    }
}
export default About;
    