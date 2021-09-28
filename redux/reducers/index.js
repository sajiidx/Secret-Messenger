
import { combineReducers } from 'redux';
import { user } from './logic';
import { store } from './gui';

const Reducers = combineReducers({
    user,
    store
});

export default Reducers;