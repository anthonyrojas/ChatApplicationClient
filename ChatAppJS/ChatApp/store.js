import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './src/Reducers';
const initialState = {};
const middleware = [thunk];
const store = createStore(
    reducer, 
    initialState, 
    applyMiddleware(...middleware)
);
export default store;