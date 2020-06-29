import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';

export const organization = (state, id) => {
    let items = state.getIn(['orgs', 'orgList', 'items']);
    if (items) {
        return items.get(id.toString()) || items.find(o => o.get('slug') == id.toString());
    }
    else return null;
}

const initialState = immutable.fromJS({
    orgList: {
        isPending: false,
        error: null,
        items: null,
    },
    recommendedOrgsList: {
        isPending: true,
        error: null,
        itmes: null,
    },
    membershipList: {
        isPending: false,
        error: null,
        items: null,
    },
});

export default createReducer(initialState, {
    [types.RETRIEVE_ORGANIZATION + '_FULFILLED']: (state, action) => {
        let org = action.payload.data.data;
        org.id = org.id.toString();

        return state
            .setIn(['orgList', 'error'], null)
            .setIn(['orgList', 'isPending'], false)
            .updateIn(['orgList', 'items'], items => items?
                items.set(org.id, immutable.fromJS(org)) :
                immutable.fromJS({ [org.id]: org }));
    },

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
            orgs[membership.organization.id.toString()] = membership.organization;
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

    [types.DELETE_USER_MEMBERSHIP + '_FULFILLED']: (state, action) => {
        let orgId = action.meta.orgId;

        return state
            .updateIn(['membershipList', 'items'], items => items
                .filter(item => item.getIn(['organization', 'id']) != orgId));
    },

    [types.RETRIEVE_ALL_ACTIONS + '_FULFILLED']: (state, action) => {
        let orgs = {};
        action.payload.forEach(res =>
            orgs[res.meta.org.id.toString()] = res.meta.org);

        return state
            .setIn(['orgList', 'error'], null)
            .setIn(['orgList', 'isPending'], false)
            .updateIn(['orgList', 'items'], items => items?
                items.merge(immutable.fromJS(orgs)) :
                immutable.fromJS(orgs));
    },

    [types.RETRIEVE_RECOMMENDED_ORGANIZATIONS + '_PENDING']: (state, action) => {
        return state
            .setIn(['recommendedOrgsList', 'error'], null)
            .setIn(['recommendedOrgsList', 'isPending'], true);
    },

    [types.RETRIEVE_RECOMMENDED_ORGANIZATIONS + '_REJECTED']: (state, action) => {
        return state
            .setIn(['recommendedOrgsList', 'error'], action.payload)
            .setIn(['recommendedOrgsList', 'isPending'], false);
    },

    [types.RETRIEVE_RECOMMENDED_ORGANIZATIONS + '_FULFILLED']: (state, action) => {
        let orgs = {};

        action.payload.data.data.forEach(org => {
            orgs[org.id.toString()] = org;
        });

        return state
            .setIn(['recommendedOrgsList', 'error'], null)
            .setIn(['recommendedOrgsList', 'isPending'], false)
            .updateIn(['recommendedOrgsList', 'items'], items => items?
                items.merge(immutable.fromJS(orgs)) :
                immutable.fromJS(orgs));
    },
    [types.FOLLOW_ORGANIZATION + '_FULFILLED']: (state, action) => {
        const [k, v] = state.get(['membershipList', 'items']).findEntry(value => value.getIn(['organization','id']) == orgId);
        return state
            .setIn(['membershipList', 'items', k, 'follow'], true);
    },
    [types.UNFOLLOW_ORGANIZATION + '_FULFILLED']: (state, action) => {
        const [k, v] = state.getIn(['membershipList', 'items']).findEntry(value => value.getIn(['organization','id']) == orgId);
        return state
            .setIn(['membershipList', 'items', k, 'follow'], false);
    }
});
