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
    console.log('actions---upload Doodle');
    console.log('doodleFile', doodleFile);

    const options = {
        method: 'POST',
        body: bodyData,

    }

    console.log('Attempting to upload doodle');
    return fetch(`${BACKEND.ADDRESS}/doodle/upload`, options)
        .then(response =>  response.json())
        .then( json => {
            console.log('doodle upload success');
            dispatch({ type: DOODLE.UPLOAD_SUCCESS, });
        })
        .catch(error => {
            console.log('doodle upload failure')
            dispatch({ type: DOODLE.UPLOAD_ERROR, error });
        })
    
    // const config = {
    //     method: 'post',
    //     url: `${BACKEND.ADDRESS}/doodle`,
    //     data: bodyData,
    // }
    // return ( 
    //     axios(config)
    //         .then(response => {
    //             console.log(response);
    //             dispatch({ type: DOODLE.UPLOAD_SUCCESS, });
    //         })
    //         .catch(error => {
    //             dispatch({ type: DOODLE.UPLOAD_ERROR, error });
    //         })
    // )
};
