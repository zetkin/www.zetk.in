import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


const initialState = immutable.fromJS({
    campaignList: {
        isPending: false,
        error: null,
        items: null,
    }
});

export default createReducer(initialState, {
    '@@INIT': (state, action) => {
        return immutable.fromJS(state);
    },

    [types.RETRIEVE_ALL_CAMPAIGNS + '_PENDING']: (state, action) => {
        return state
            .setIn(['campaignList', 'error'], null)
            .setIn(['campaignList', 'isPending'], true);
    },

    [types.RETRIEVE_ALL_CAMPAIGNS + '_FULFILLED']: (state, action) => {
        let campaigns = action.payload.reduce((arr, org) => {
            // Add org_id to campaigns
            let orgId = org.meta.org.id;
            let orgCampaigns = org.data.data
                .map(campaign =>
                    Object.assign({}, campaign, { org_id: orgId }));

            return arr.concat(orgCampaigns);
        }, []);

        return state
            .setIn(['campaignList', 'error'], null)
            .setIn(['campaignList', 'isPending'], false)
            .setIn(['campaignList', 'items'], immutable.fromJS(campaigns));
    },

    [types.RETRIEVE_CAMPAIGN + '_FULFILLED']: (state, action) => {
        if (!state.getIn(['campaignList', 'items'])) {
            state = state.setIn(['campaignList', 'items'], immutable.List());
        }

        return state
            .updateIn(['campaignList', 'items'], items => items
                // TODO: Don't just push. Could create duplicates
                .push(immutable.fromJS(action.payload.data.data))
            );
    },
});
