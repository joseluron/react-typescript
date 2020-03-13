import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import authenticatedUser from './reducers/Authentication';
import users from './reducers/Users';

export const store = createStore(combineReducers({
    authenticatedUser,
    users
}), applyMiddleware(thunk, createLogger({})));
