import { compose, applyMiddleware, createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import immutable from 'immutable';
import promiseMiddleware from 'redux-promise-middleware';

import actions from './actions';
import callAssignments from './callAssignments';
import campaigns from './campaigns';
import groups from './groups';
import help from './help';
import intl from './intl';
import orgs from './orgs';
import password from './password';
import register from './register';
import surveys from './surveys';
import user from './user';


const appReducer = combineReducers({
    actions,
    callAssignments,
    campaigns,
    groups,
    help,
    intl,
    orgs,
    password,
    register,
    surveys,
    user,
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
        devTools = window.devToolsExtension({
            deserializeState: state => immutable.fromJS(state)
        });
    }

    let createWithMiddleware = compose(
        applyMiddleware(...middleware),
        devTools,
    )(createStore);

    return createWithMiddleware(appReducer, initialState);
};
