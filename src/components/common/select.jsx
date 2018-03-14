'use strict'
import React from 'react';
/* <--- USED BY DASHBOARD IN SELECTING FEATURED PRODUCTS ---> */
function SelectWidget(props){
    var options = props.items.map(function(item, index){
        return ( <option key={ index } value={ item._id }>{ item.name }</option> );
    })
    return(
        <select className="select-widget" value={ props.value } onChange={ props.handleChange } >
            <option  value={ -1 }>{ 'none set' }</option>
            { options }
        </select>);
}
export default SelectWidget;
