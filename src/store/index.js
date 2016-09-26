import { compose, applyMiddleware, createStore } from 'redux';
import { createReducer } from 'redux-create-reducer';
import { combineReducers } from 'redux-immutable';
import { intlReducer } from 'react-intl-redux';
import promiseMiddleware from 'redux-promise-middleware';

let message = createReducer('Hello world', {
    SET_MESSAGE: (state, action) => action.message,
});

const appReducer = combineReducers({
    message,
    intl: intlReducer,
});

export const configureStore = (initialState, z) => {
    let thunkWithZ = store => next => action => {
        if (typeof action === 'function') {
            return action({ ...store, z });
        }

        return next(action);
    };

    let middleware = [
        promiseMiddleware(),
        thunkWithZ,
    ];

    let devTools = f => f;
    if (typeof window === 'object' && window.devToolsExtension) {
        devTools = window.devToolsExtension();
    }

    let createWithMiddleware = compose(
        applyMiddleware(...middleware),
        devTools,
    )(createStore);

    return createWithMiddleware(appReducer, initialState);
};
