import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './src/Reducers';
const initialState = {};
const store = createStore(
    reducer, 
    initialState, 
    applyMiddleware(thunk)
);
export default store;