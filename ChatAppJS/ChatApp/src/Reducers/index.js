import {combineReducers} from 'redux';
import RegisterReducers from './RegisterReducers';
import LoginReducers from './LoginReducers';
//combine the reducers and export it as one
export default combineReducers({
    register: RegisterReducers,
    login: LoginReducers
});