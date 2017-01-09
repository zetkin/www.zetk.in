import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


const initialState = immutable.fromJS({
    isPending: false,
    data: null,
});


export default createReducer(initialState, {
    '@@INIT': (state, action) => {
        return immutable.fromJS(state);
    },

    [types.SET_USER_DATA]: (state, action) => {
        return state
            .set('data', immutable.fromJS(action.payload));
    },
    
    [types.CHANGE_PASSWORD + '_PENDING']: (state, action) => {
        return state
            .set('passwordPending', true);
    },
    
    [types.CHANGE_PASSWORD + '_FULFILLED']: (state, action) => {
        return state
            .set('passwordChanged', Date.now())
            .set('passwordPending', false);
    },
    
    [types.CHANGE_PASSWORD + '_REJECTED']: (state, action) => {
        return state
            .set('passwordPending', false)
            .set('passwordError', true);
    },
    
    [types.RESET_PASSWORD_CHANGED]: (state, action) => {
        return state
            .set('passwordChanged', false)
            .set('passwordError', false);
    },
});