import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


const initialState = immutable.fromJS({
    groupList: {
        isPending: false,
        error: null,
        items: null,
    }
});

export default createReducer(initialState, {
    [types.RETRIEVE_GROUP + '_PENDING']: (state, action) => {
        let group = {
            id: action.meta.groupId.toString(),
            org_id: action.meta.orgId.toString(),
            isPending: true,
        };

        return state
            .updateIn(['groupList', 'items'], items => items?
                items.set(group.id, immutable.fromJS(group)) :
                immutable.fromJS({ [group.id]: group }));
    },

    [types.RETRIEVE_GROUP + '_REJECTED']: (state, action) => {
        let group = {
            id: action.meta.groupId.toString(),
            org_id: action.meta.orgId.toString(),
            error: action.payload.data,
            isPending: false,
        };

        return state
            .updateIn(['groupList', 'items'], items => items?
                items.set(group.id, immutable.fromJS(group)) :
                immutable.fromJS({ [group.id]: group }));
    },

    [types.RETRIEVE_GROUP + '_FULFILLED']: (state, action) => {
        let group = action.payload.data.data;
        group.id = group.id.toString();
        group.org_id = action.meta.orgId;
        group.isPending = false;
        group.error = null;

        return state
            .updateIn(['groupList', 'items'], items => items?
                items.set(group.id, immutable.fromJS(group)) :
                immutable.fromJS({ [group.id]: group }));
    },
});
