import {combineReducers} from 'redux';
import RegisterReducers from './RegisterReducers';
import LoginReducers from './LoginReducers';
import ConversationListReducers from './ConversationListReducers';
//combine the reducers and export it as one
export default combineReducers({
    register: RegisterReducers,
    login: LoginReducers,
    conversations: ConversationListReducers 
});