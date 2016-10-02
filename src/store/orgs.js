import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


const initialState = immutable.fromJS({
    orgList: {
        isPending: false,
        error: null,
        items: null,
    },
    membershipList: {
        isPending: false,
        error: null,
        items: null,
    },
});

export default createReducer(initialState, {
    '@@INIT': (state, action) => {
        return immutable.fromJS(state);
    },

    [types.RETRIEVE_USER_MEMBERSHIPS + '_PENDING']: (state, action) => {
        return state
            .setIn(['membershipList', 'error'], null)
            .setIn(['membershipList', 'isPending'], true);
    },

    [types.RETRIEVE_USER_MEMBERSHIPS + '_FULFILLED']: (state, action) => {
        let orgs = action.payload.data.data;

        return state
            .setIn(['membershipList', 'error'], null)
            .setIn(['membershipList', 'isPending'], false)
            .setIn(['membershipList', 'items'], immutable.fromJS(orgs));
    },

    [types.RETRIEVE_ALL_ACTIONS + '_FULFILLED']: (state, action) => {
        // TODO: Merge instead of replacing?
        let orgs = action.payload.map(res => res.meta.org);
        return state
            .setIn(['orgList', 'error'], null)
            .setIn(['orgList', 'isPending'], false)
            .setIn(['orgList', 'items'], immutable.fromJS(orgs));
    }
});
