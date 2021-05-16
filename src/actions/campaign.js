import * as types from '.';


export function retrieveAllCampaigns() {
    return ({ dispatch, z }) => {
        // Load list of organizations followed, then iterate over and load
        // campaigns for each of the organizations.
        let promise = z.resource('users','me','following').get()
            .then(res => {
                let orgs = res.data.data;
                return Promise.all(orgs.map(org => (
                    z.resource('orgs', org.organization.id, 'campaigns')
                        .meta({ org: org.organization })
                        .get()
                )));
            });

        dispatch({
            type: types.RETRIEVE_ALL_CAMPAIGNS,
            payload: { promise }
        });
    };
}

export function retrieveCampaign(orgId, campaignId) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.RETRIEVE_CAMPAIGN,
            meta: { orgId, campaignId },
            payload: {
                promise: z.resource('orgs', orgId,
                    'campaigns', campaignId).get()
            }
        });
    };
}
