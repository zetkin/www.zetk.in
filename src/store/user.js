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
    [types.UPDATE_USER + '_FULFILLED']: (state, action) => {
        return state;
    },
});
