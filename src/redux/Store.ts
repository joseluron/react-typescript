import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import authenticatedUser from './reducers/Authentication';

export const store = createStore(combineReducers({
    authenticatedUser
}), applyMiddleware(thunk, createLogger({})));
