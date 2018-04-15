import {combineReducers} from 'redux';
import RegisterReducers from './RegisterReducers';
//combine the reducers and export it as one
export default combineReducers({
    register: RegisterReducers
});