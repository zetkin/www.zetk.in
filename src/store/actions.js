import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


const initialState = immutable.fromJS({
    actionList: {
        isPending: false,
        error: null,
        items: null,
    },
    // TODO: Don't duplicate data?
    userActionList: {
        isPending: false,
        error: null,
        items: null,
    },
});

export default createReducer(initialState, {
    '@@INIT': (state, action) => {
        return immutable.fromJS(state);
    },

    [types.RETRIEVE_USER_ACTIONS + '_PENDING']: (state, action) => {
        return state
            .setIn(['userActionList', 'error'], null)
            .setIn(['userActionList', 'isPending'], true);
    },

    [types.RETRIEVE_USER_ACTIONS + '_FULFILLED']: (state, action) => {
        let actions = action.payload.data.data;

        return state
            .setIn(['userActionList', 'error'], null)
            .setIn(['userActionList', 'isPending'], false)
            .setIn(['userActionList', 'items'], immutable.fromJS(actions));
    },

    [types.RETRIEVE_ALL_ACTIONS + '_PENDING']: (state, action) => {
        return state
            .setIn(['actionList', 'error'], null)
            .setIn(['actionList', 'isPending'], true);
    },

    [types.RETRIEVE_ALL_ACTIONS + '_FULFILLED']: (state, action) => {
        // Reduce list of orgs with list of actions to a flat list
        // of actions with ID references to the orgs.
        let actions = action.payload.reduce((arr, org) => {
            let orgActions = org.data.data.map(a => Object.assign(a, {
                org_id: org.meta.org.id
            }));

            return arr.concat(orgActions);
        }, []);

        return state
            .setIn(['actionList', 'error'], null)
            .setIn(['actionList', 'isPending'], false)
            .setIn(['actionList', 'items'], immutable.fromJS(actions));
    }
});
