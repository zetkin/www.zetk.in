import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


const initialState = immutable.fromJS({
    isChangePending: false,
});


export default createReducer(initialState, {
    [types.CHANGE_PASSWORD + '_PENDING']: (state, action) => {
        return state
            .set('isChangePending', true);
    },

    [types.CHANGE_PASSWORD + '_FULFILLED']: (state, action) => {
        return state
            .set('changed', Date.now())
            .set('isChangePending', false);
    },

    [types.CHANGE_PASSWORD + '_REJECTED']: (state, action) => {
        return state
            .set('isChangePending', false)
            .set('changeError', true);
    },

    [types.RESET_PASSWORD_CHANGED]: (state, action) => {
        return state
            .set('changed', null)
            .set('isChangeComplete', false)
            .set('changeError', false);
    },

    [types.SEND_PASSWORD_RESET_TOKEN + '_PENDING']: (state, action) => {
        return state
            .set('sendTokenPending', true)
            .set('sendTokenEmail', null);
    },

    [types.SEND_PASSWORD_RESET_TOKEN + '_FULFILLED']: (state, action) => {
        return state
            .set('sendTokenError', null)
            .set('sendTokenPending', false)
            .set('sendTokenEmail', action.meta.email);
    },

    [types.SEND_PASSWORD_RESET_TOKEN + '_REJECTED']: (state, action) => {
        return state
            .set('sendTokenError', action.payload)
            .set('sendTokenPending', false);
    },

    [types.SET_PASSWORD_RESET_TOKEN]: (state, action) => {
        return state
            .set('resetToken', action.payload.token);
    },

    [types.CLEAR_LOST_PASSWORD_STATE]: (state, action) => {
        return state
            .set('reset', null)
            .set('sendTokenError', null)
            .set('sendTokenEmail', null)
            .set('sendTokenPending', false);
    },

    [types.RESET_PASSWORD + '_FULFILLED']: (state, action) => {
        return state
            .set('reset', Date.now());
    },
});
