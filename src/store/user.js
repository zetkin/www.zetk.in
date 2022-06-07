import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


const initialState = immutable.fromJS({
    data: null,
});


export default createReducer(initialState, {
    [types.SET_USER_DATA]: (state, action) => {
        return state
            .set('data', immutable.fromJS(action.payload));
    },
    [types.UPDATE_USER_LANG + '_FULFILLED']: (state, action) => {
        location.reload();

        return state;
    },
    [types.UPDATE_USER_EMAIL + '_FULFILLED']: (state, action) => {
        return state
            .setIn(['data', 'email'], action.payload.data.data.email)
            .set('changed', Date.now())
            .set('isChangePending', false)
            .set('changeError', false);
    },
    [types.UPDATE_USER_EMAIL + '_REJECTED']: (state, action) => {
        return state
            .set('isChangePending', false)
            .set('changeError', true);
    },
    [types.UPDATE_USER_EMAIL + '_PENDING']: (state, action) => {
        return state
            .set('isChangePending', true)
    },
    [types.RESET_EMAIL_CHANGED]: (state, action) => {
        return state
            .set('changed', null);
    },
});
