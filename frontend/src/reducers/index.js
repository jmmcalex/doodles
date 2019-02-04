import { combineReducers } from 'redux';
import account from './account';
import doodle from './doodle';
// import tags from './tags';
// import doodlesByTags from './doodleTags';


/**
 * TODO: 
 * Set up a normalized state shape for doodles, tags, and their relationship
 */
export default combineReducers({
    account,
    doodle
});
