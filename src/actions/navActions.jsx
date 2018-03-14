'use strict'
export function navEvent(payload) {                        
    return {
        type: 'NAV_EVENT',
        trigger: payload           
    };            
};