// <--- NAV EVENT REDUCER --->
export function navReducer( nav = {event: false}, action ) { // state is relative to parent, i.e. auth is a relative state    
    switch ( action.type ){   
        case 'NAV_EVENT':
            return  { event: action.trigger};
        default:             
            return nav;
    }
};
