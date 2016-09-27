import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


const initialState = immutable.fromJS({
    isComplete: false,
    isPending: false,
    data: null,
    error: null,
});

export default createReducer(initialState, {
    '@@INIT': (state, action) => {
        return immutable.fromJS(state);
    },

    [types.REGISTER + '_PENDING']: (state, action) => {
        return state
            .set('data', immutable.fromJS(action.meta))
            .set('error', null)
            .set('isPending', true);
    },

    [types.REGISTER + '_REJECTED']: (state, action) => {
        return state
            .set('isPending', false)
            .set('error', action.payload);
    },

    [types.REGISTER + '_FULFILLED']: (state, action) => {
        return state
            .set('error', null)
            .set('isPending', false)
            .set('isComplete', true);
    },
});
