/**
 * frontend/src/reducers/doodles.js
 * 
 * Overview:
 * -- This file is responsible for being handling state changes to the doodles
 *    section of the store upon actions being dispatched
 */

import { DOODLE } from '../actions/types';

const DEFAULT_DOODLE = {
    uploading: false
};

const doodle = (state = DEFAULT_DOODLE, action) => {
    switch(action.type) {
        case DOODLE.UPLOAD:
            return {
                ...state,
                uploading: true
            };
        case DOODLE.UPLOAD_SUCCESS:
            return {
                ...state,
                uploading: false,
                message: 'doodle successfully uploaded',
            };
        case DOODLE.UPLOAD_ERROR:
            return {
                ...state,
                uploading: false,
                message: 'error in the doodle upload'
            };
        default: 
            return state;
    }
}

export default doodle;