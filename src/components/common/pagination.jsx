'use strict'
import React from 'react';
function Pagination(props){
    var number = props.number;
    var curPage = props.curPage;
    var onClickArrow = props.onClickArrow;
    var onClickRoute = props.onClickRoute;
    const paginationArray = [];
    var i = 0; // or use 'let'
    while ( i < number ) {
        (function(index){            // self executing function defines new var 'index' for each loop - or use 'let'
            var page = index + 1;
                paginationArray.push( 
                    <a key={ index } className={ (curPage  === page )? 'active' : '' }
                       onClick={ (event) => onClickRoute(event, page) } > { page } </a> 
               );               
        })(i);
        i++;
    }
    if( number <= 1 ){
        return (<div className="pagination"></div>);
    } else {
        return (    
            <div className="pagination">
                <a onClick={ (event) => onClickArrow(event, curPage - 1, number + 1) }>&lt;</a> 
                { paginationArray }               
                <a onClick={ (event) => onClickArrow(event, curPage + 1, number + 1) }>&gt;</a>
            </div>);
    }
}
export default Pagination;
  