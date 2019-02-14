import { PUBLIC_DOODLES } from '../actions/types';
import fetchStates from './fetchstates';

const DEFAULT_PUBLIC_DOODLES = { 
    currentIndex: null,
    endIndex: null,
    loaded: false,
    doodles: [],
}


const publicDoodles = ( state = DEFAULT_PUBLIC_DOODLES, action ) => {
    switch( action.type ){
        case PUBLIC_DOODLES.FETCH:
            return {
                ...state,
                fetchStatus: fetchStates.fetching,
            }
        case PUBLIC_DOODLES.FETCH_ERROR:
            return {
                ...state,
                fetchStatus: fetchStates.error,
                message: action.message
            }
        case PUBLIC_DOODLES.FETCH_SUCCESS:
            return {
                ...state,
                fetchStatus: fetchStates.success,
                loaded: true,
                doodles: action.doodles,
                endIndex: action.endIndex,
            }
        case PUBLIC_DOODLES.FETCH_DELETE_SUCCESS: 
            return {
                ...state,
                doodles: state.doodles.filter(doodle => doodle.id !== action.id),
            }
        case PUBLIC_DOODLES.CURRENT:
            return {
                ...state,
                currentIndex: action.index,
            }
        default: 
            return state;
    }
}

export default publicDoodles;