import { createReducer } from 'redux-create-reducer';
import immutable from 'immutable';

import * as types from '../actions';


// Selector for a single campaign
export const campaign = (state, id) =>
    state.getIn(['campaigns', 'campaignList', 'items', id.toString()]);


const initialState = immutable.fromJS({
    campaignList: {
        isPending: false,
        error: null,
        items: null,
    }
});

export default createReducer(initialState, {
    [types.RETRIEVE_ALL_CAMPAIGNS + '_PENDING']: (state, action) => {
        return state
            .setIn(['campaignList', 'error'], null)
            .setIn(['campaignList', 'isPending'], true);
    },

    [types.RETRIEVE_ALL_CAMPAIGNS + '_FULFILLED']: (state, action) => {
        let campaigns = {};
        action.payload.forEach(res => {
            let orgId = res.meta.org.id;

            res.data.data
                .forEach(campaign => {
                    // Add organization ID to campaign objects
                    campaigns[campaign.id] = Object.assign(campaign, {
                        org_id: orgId
                    });
                });
        });

        return state
            .setIn(['campaignList', 'error'], null)
            .setIn(['campaignList', 'isPending'], false)
            .updateIn(['campaignList', 'items'], items => items?
                items.merge(immutable.fromJS(campaigns)) :
                immutable.fromJS(campaigns));
    },

    [types.RETRIEVE_CAMPAIGN + '_PENDING']: (state, action) => {
        let campaign = {
            id: action.meta.campaignId.toString(),
            org_id: action.meta.orgId.toString(),
            isPending: true,
        };

        return state
            .updateIn(['campaignList', 'items'], items => items?
                items.set(campaign.id, immutable.fromJS(campaign)) :
                immutable.fromJS({ [campaign.id]: campaign }));
    },

    [types.RETRIEVE_CAMPAIGN + '_REJECTED']: (state, action) => {
        let campaign = {
            id: action.meta.campaignId.toString(),
            org_id: action.meta.orgId.toString(),
            error: action.payload.data,
            isPending: false,
        };

        return state
            .updateIn(['campaignList', 'items'], items => items?
                items.set(campaign.id, immutable.fromJS(campaign)) :
                immutable.fromJS({ [campaign.id]: campaign }));
    },

    [types.RETRIEVE_CAMPAIGN + '_FULFILLED']: (state, action) => {
        let campaign = action.payload.data.data;
        campaign.id = campaign.id.toString();
        campaign.org_id = action.meta.orgId;
        campaign.isPending = false;
        campaign.error = null;

        return state
            .updateIn(['campaignList', 'items'], items => items?
                items.set(campaign.id, immutable.fromJS(campaign)) :
                immutable.fromJS({ [campaign.id]: campaign }));
    },
});
