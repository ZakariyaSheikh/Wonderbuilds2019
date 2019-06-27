import {createStore, combineReducers, applyMiddleware} from 'redux';
import reducers from '../reducers';

import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

const persistedState = {cartReducer: {products: [], quantity: 0}};

if (localStorage.getItem('cartState')) {
    Object.assign(persistedState.cartReducer, JSON.parse(localStorage.getItem('cartState')))
}

console.log('persistedState', persistedState)
if (localStorage.getItem('userState')) {
    if (JSON.parse(localStorage.getItem('userState'))) {
        Object.assign(persistedState, {sessionReducer: JSON.parse(localStorage.getItem('userState'))})
    }
}

const reducer = combineReducers(reducers);

const store = createStore(reducer, persistedState, composeWithDevTools(applyMiddleware(thunkMiddleware)));

store.subscribe(() => {
    localStorage.setItem('cartState', JSON.stringify(store.getState().cartReducer));
    localStorage.setItem('userState', JSON.stringify(store.getState().sessionReducer));
});

export default store;