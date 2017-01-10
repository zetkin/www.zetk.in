import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';

export const organization = (state, id) =>
    state.getIn(['orgs', 'orgList', 'items', id.toString()]);

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
    [types.RETRIEVE_USER_MEMBERSHIPS + '_PENDING']: (state, action) => {
        return state
            .setIn(['orgList', 'error'], null)
            .setIn(['orgList', 'isPending'], true)
            .setIn(['membershipList', 'error'], null)
            .setIn(['membershipList', 'isPending'], true);
    },

    [types.RETRIEVE_USER_MEMBERSHIPS + '_FULFILLED']: (state, action) => {
        let memberships = {};
        let orgs = {};

        action.payload.data.data.forEach(membership => {
            orgs[membership.organization.id] = membership.organization;
            memberships[membership.organization.id] = membership;
        });

        return state
            .setIn(['membershipList', 'error'], null)
            .setIn(['membershipList', 'isPending'], false)
            .setIn(['orgList', 'error'], null)
            .setIn(['orgList', 'isPending'], false)
            .updateIn(['orgList', 'items'], items => items?
                items.merge(immutable.fromJS(orgs)) :
                immutable.fromJS(orgs))
            .updateIn(['membershipList', 'items'], items => items?
                items.merge(immutable.fromJS(memberships)) :
                immutable.fromJS(memberships));
    },

    [types.RETRIEVE_ALL_ACTIONS + '_FULFILLED']: (state, action) => {
        let orgs = {};
        action.payload.forEach(res =>
            orgs[res.meta.org.id] = res.meta.org);

        return state
            .setIn(['orgList', 'error'], null)
            .setIn(['orgList', 'isPending'], false)
            .updateIn(['orgList', 'items'], items => items?
                items.merge(immutable.fromJS(orgs)) :
                immutable.fromJS(orgs));
    }
});
