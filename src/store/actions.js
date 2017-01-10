import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


// Selector to get actionList filtered by campaign
export const campaignActionList = (state, campaignId) => {
    let list = state.getIn(['actions', 'actionList']);

    // No need to filter empty list
    if (!list.get('items')) {
        return list;
    }

    return list
        .updateIn(['items'], items => items
            .filter(item => item.getIn(['campaign', 'id']) == campaignId));
};

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
    responseList: {
        isPending: false,
        error: null,
        items: null,
    },
});

export default createReducer(initialState, {
    [types.RETRIEVE_USER_ACTIONS + '_PENDING']: (state, action) => {
        return state
            .setIn(['userActionList', 'error'], null)
            .setIn(['userActionList', 'isPending'], true);
    },

    [types.RETRIEVE_USER_ACTIONS + '_FULFILLED']: (state, action) => {
        let actions = {};
        action.payload.data.data.forEach(obj =>
            actions[obj.id] = obj);

        return state
            .setIn(['userActionList', 'error'], null)
            .setIn(['userActionList', 'isPending'], false)
            .updateIn(['userActionList', 'items'], items => items?
                items.merge(immutable.fromJS(actions)) :
                immutable.fromJS(actions));
    },

    [types.RETRIEVE_ALL_ACTIONS + '_PENDING']: (state, action) => {
        return state
            .setIn(['actionList', 'error'], null)
            .setIn(['actionList', 'isPending'], true);
    },

    [types.RETRIEVE_ALL_ACTIONS + '_FULFILLED']: (state, action) => {
        let actions = {};
        action.payload.forEach(res => {
            let orgId = res.meta.org.id;
            res.data.data.forEach(obj =>
                actions[obj.id] = Object.assign(obj, {
                    org_id: orgId
                }));
        });

        return state
            .setIn(['actionList', 'error'], null)
            .setIn(['actionList', 'isPending'], false)
            .updateIn(['actionList', 'items'], items => items?
                items.merge(immutable.fromJS(actions)) :
                immutable.fromJS(actions));
    },

    [types.RETRIEVE_CAMPAIGN_ACTIONS + '_PENDING']: (state, action) => {
        return state
            .setIn(['actionList', 'error'], null)
            .setIn(['actionList', 'items'], null)
            .setIn(['actionList', 'isPending'], true);
    },

    [types.RETRIEVE_CAMPAIGN_ACTIONS + '_FULFILLED']: (state, action) => {
        // Add org_id to action objects
        let actions = {};
        action.payload.data.data.forEach(obj =>
            actions[obj.id] = Object.assign(obj, {
                org_id: action.meta.orgId
            }));

        return state
            .setIn(['actionList', 'error'], null)
            .setIn(['actionList', 'isPending'], false)
            .updateIn(['actionList', 'items'], items => items?
                items.merge(immutable.fromJS(actions)) :
                immutable.fromJS(actions));
    },

    [types.RETRIEVE_USER_RESPONSES + '_PENDING']: (state, action) => {
        return state
            .setIn(['responseList', 'error'], null)
            .setIn(['responseList', 'isPending'], true);
    },

    [types.RETRIEVE_USER_RESPONSES + '_FULFILLED']: (state, action) => {
        let responses = {};
        action.payload.data.data.forEach(obj =>
            responses[obj.action_id.toString()] = obj);

        return state
            .setIn(['responseList', 'error'], null)
            .setIn(['responseList', 'isPending'], false)
            .updateIn(['responseList', 'items'], items => items?
                items.merge(immutable.fromJS(responses)) :
                immutable.fromJS(responses));
    },

    [types.UPDATE_ACTION_RESPONSE + '_FULFILLED']: (state, action) => {
        let actionId = action.meta.actionId.toString();
        if (action.meta.responseBool) {
            let response = immutable.fromJS({
                ...action.payload.data.data,
                action_id: actionId,
            });

            return state
                .updateIn(['responseList', 'items'], items => items?
                    items.set(actionId, response) :
                    immutable.toJS({ [actionId]: response }));
        }
        else {
            return state
                .deleteIn(['responseList', 'items', actionId]);
        }
    },
});
