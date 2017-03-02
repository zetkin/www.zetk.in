import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


const initialState = immutable.fromJS({
    seen: false,
    dismissed: false,
});


export default createReducer(initialState, {
    [types.SET_HELP_SEEN]: (state, action) => {
        return state
            .set('seen', action.payload);
    },

    [types.SET_HELP_DISMISSED]: (state, action) => {
        return state
            .set('dismissed', action.payload);
    },
});
