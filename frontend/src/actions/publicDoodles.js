import { PUBLIC_DOODLES } from './types';
import { BACKEND } from '../config';
import axios from 'axios';


/**
 * The api will return an array of doodle objects
 * [
 *  {
 *    id: number,
 *    postDate: timestamp,
 *    filePath: string,
 *    title: string,
 *  },
 *  ....
 * ]
 */
export const fetchPublicDoodles = () => dispatch => {
    dispatch({ type: PUBLIC_DOODLES.FETCH });
    return axios.get(`${BACKEND.ADDRESS}/doodle`)
        .then(({ data }) => {
            dispatch({ 
                type: PUBLIC_DOODLES.FETCH_SUCCESS, 
                doodles: data,
                endIndex: data.length -1,
            });
        })
        .catch(error => {
            console.log('super error');
            dispatch({ type: PUBLIC_DOODLES.FETCH_ERROR, message: error.message })
        });
}


export const setCurrentIndex = (index) => {
    return { type:  PUBLIC_DOODLES.CURRENT, index }
}


export const deleteDoodle = (doodleId) => dispatch => {
    dispatch({ type: PUBLIC_DOODLES.FETCH });
    return axios.delete(`${BACKEND.ADDRESS}/doodle/${doodleId}`)
        .then(({data}) => {
            console.log(data);
            dispatch({ type: PUBLIC_DOODLES.FETCH_DELETE_SUCCESS, id: data.id });
        })
        .catch(error => {
            dispatch({ type: PUBLIC_DOODLES.FETCH_ERROR, message: error.message });
        });
}




/** this old method was used to retrive only some of the comics at a time */
// const fetchPublicDragons = () => dispatch => {
//     dispatch({ type: PUBLIC_DOODLES.FETCH });
//     const url = `${BACKEND.ADDRESS}/doodle/?per=${per}&page=1`;
//     return fetch(url)
//         .then(response => response.json())
//         .then(json => {
//             const doodles = json.doodles;
//             const outOfDoodles = doodles.length < per;
//             if (outOfDoodles) {
//                 dispatch({ type: PUBLIC_DOODLES.END });
//                 /** TODO finish connecting doodles to the store */
//             } 
//         })
// }
