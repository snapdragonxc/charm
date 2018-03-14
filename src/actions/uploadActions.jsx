'use strict'
import Axios from 'axios';
// <--- RESET ACTION --->
// reset the image in the store to blank after upload
export function resetImage(payload) {
    return {
          type: 'RESET_IMAGE'          
    };           
};
// <--- CREATE ACTION --->
export function uploadImage(file){

    console.log('file-upload', file);
    return function(dispatch){
        Axios.post('/api/upload', file).then(function(response){
            // console.log('Success', response.data);
            var fileName = response.data.toString();
            dispatch({
                type: 'UPLOAD_IMAGE',
                payload: fileName
            });                
        }).catch(function(err){
             console.log(err);
            if(err.response.status == 401) {
                // authorisation access error
                dispatch({
                    type: 'AUTHORISATION_FAILURE',
                    name: ''
                })
            }
        })
    }
};
// <--- DELETE ACTION --->
export function deleteImage(name){
    return function(dispatch){
        Axios.delete('/api/upload/' + name).then(function(response){
            dispatch({
                type: 'DELETE_IMAGE'
            });
        }).catch(function(err){
            // console.log(err);
            if(err.response.status == 401) {
                // authorisation access error
                dispatch({
                    type: 'AUTHORISATION_FAILURE',
                    name: ''
                })
            }
        })
    }
};
  