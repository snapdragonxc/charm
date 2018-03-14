import React, { Component } from 'react';
/* <--- USED BY UP/DOWN COUNTERS FOR QTY ---> */
function Spinner(props){    
    return (
        <span className="widget-spinner">
            <span className="widget-spinner-sub" onClick={ (event) => props.sub(event) }>-</span>                
            <input type="number" value={ props.qty } onChange={ (event) => props.handleChange(event) } />                
            <span className="widget-spinner-add" onClick={ (event) => props.add(event) }>+</span>            
        </span>);
}
export default Spinner;