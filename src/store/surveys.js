import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


export const survey = (state, id) =>
    state.getIn(['surveys', 'surveyList', 'items', id.toString()]);


const initialState = immutable.fromJS({
    surveyList: {
        isPending: false,
        error: null,
        items: null,
    }
});

export default createReducer(initialState, {
    [types.RETRIEVE_SURVEY + '_PENDING']: (state, action) => {
        let survey = {
            id: action.meta.id.toString(),
            isPending: true,
        };

        return state
            .updateIn(['surveyList', 'items'], items => items?
                items.set(survey.id, immutable.fromJS(survey)) :
                immutable.fromJS({ [survey.id]: survey }));
    },

    [types.RETRIEVE_SURVEY + '_REJECTED']: (state, action) => {
        let survey = {
            id: action.meta.id.toString(),
            error: action.payload,
            isPending: false,
        };

        return state
            .updateIn(['surveyList', 'items'], items => items?
                items.set(survey.id, immutable.fromJS(survey)) :
                immutable.fromJS({ [survey.id]: survey }));
    },

    [types.RETRIEVE_SURVEY + '_FULFILLED']: (state, action) => {
        let survey = action.payload.data.data;
        survey.id = survey.id.toString();
        survey.isPending = false;
        survey.error = null;

        return state
            .updateIn(['surveyList', 'items'], items => items?
                items.set(survey.id, immutable.fromJS(survey)) :
                immutable.fromJS({ [survey.id]: survey }));
    },
});
