/**
 *  frontend/src/actions/doodle.js
 * 
 * Overview:
 * -- This file contains the functions that components will use
 *    to dispatch doodle related actions to the store.
 */
import axios from 'axios';
import { DOODLE } from './types';
import { BACKEND } from '../config';

export const uploadDoodle = ({ title, doodleFile }) => dispatch => {
    dispatch({ type: DOODLE.UPLOAD });
    const bodyData = new FormData();
    bodyData.append('title', title);
    bodyData.append('doodleFile', doodleFile);    
    
    const config = {
        method: 'post',
        url: `${BACKEND.ADDRESS}/doodle/new`,
        data: bodyData,
        // config: { headers: {'Content-Type': `multipart/form-data; boundary=${bodyData._boundary}`}}
    }

    return ( 
        axios(config)
            .then(response => {
                console.log('response from /doodle/new endpoint:', response.data);
                dispatch({
                    type: DOODLE.UPLOAD_SUCCESS,
                    ...response.data
                })
            })
            .catch(error => {
                console.log('error response from /doodle/new endpoint:', error.data);
                dispatch({
                    type: DOODLE.UPLOAD_ERROR,
                    error  
                })
            })
    )

};

