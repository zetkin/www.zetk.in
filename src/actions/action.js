import * as types from '.';


export function retrieveAllActions() {
    return ({ dispatch, z }) => {
        let today = new Date().format('{yyyy}-{MM}-{dd}');

        // Load list of organizations, then iterate over and load actions
        // for each of the organizations.
        let promise = z.resource('users', 'me', 'following').get()
            .then(res => {
                let orgs = res.data.data;
                return Promise.all(orgs.map(org => (
                    z.resource('orgs', org.organization.id, 'actions')
                        .meta({ org: org.organization })
                        .get(null, null, [[ 'start_time', '>', today ]])
                )));
            });

        dispatch({
            type: types.RETRIEVE_ALL_ACTIONS,
            payload: { promise }
        });
    };
}

export function retrieveCampaignActions(orgId, campaignId) {
    return ({ dispatch, z }) => {
        let today = new Date().format('{yyyy}-{MM}-{dd}');

        dispatch({
            type: types.RETRIEVE_CAMPAIGN_ACTIONS,
            meta: { orgId, campaignId },
            payload: {
                promise: z.resource('orgs', orgId,
                    'campaigns', campaignId, 'actions')
                        .get(null, null, [[ 'start_time', '>', today ]])
            }
        });
    };
}

export function retrieveUserActions() {
    return ({ dispatch, z }) => {
        let today = new Date().format('{yyyy}-{MM}-{dd}');

        dispatch({
            type: types.RETRIEVE_USER_ACTIONS,
            payload: {
                promise: z.resource('users', 'me', 'actions')
                    .get(null, null, [[ 'start_time', '>', today ]])
            }
        });
    };
}

export function retrieveUserResponses() {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.RETRIEVE_USER_RESPONSES,
            payload: {
                promise: z.resource('users', 'me', 'action_responses').get()
            }
        });
    };
}

export function updateActionResponse(action, responseBool) {
    return ({ dispatch, getState, z }) => {
        let orgId = action.get('org_id');
        let actionId = action.get('id');

        // Find user personId from list of memberships
        let membershipList = getState().getIn(['orgs', 'membershipList']);
        let membership = membershipList.get('items').find(val => (
            val.getIn(['organization', 'id']) == orgId));
        let personId = membership.getIn(['profile', 'id']);

        let resource = z.resource('orgs', orgId, 'actions', actionId,
                'responses', personId);

        dispatch({
            type: types.UPDATE_ACTION_RESPONSE,
            meta: { actionId, responseBool },
            payload: {
                // PUT or DELETE depending on whether response is yes or no
                promise: (responseBool? resource.put() : resource.del()),
            }
        });
    };
}
