import {combineReducers} from 'redux';
import RegisterReducers from './RegisterReducers';
import LoginReducers from './LoginReducers';
import ConversationListReducers from './ConversationListReducers';
import CreateConversationReducers from './CreateConversationReducers';
import ConversationReducers from './ConversationReducers';
//combine the reducers and export it as one
export default combineReducers({
    register: RegisterReducers,
    login: LoginReducers,
    conversations: ConversationListReducers,
    createConversations: CreateConversationReducers,
    singleConversation: ConversationReducers
});