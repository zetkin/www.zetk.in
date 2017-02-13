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
});
