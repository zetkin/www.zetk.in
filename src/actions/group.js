import * as types from '.';


export function retrieveGroup(orgId, groupId) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.RETRIEVE_GROUP,
            meta: { orgId, groupId },
            payload: {
                promise: z.resource('orgs', orgId,
                    'groups', groupId).get()
            }
        });
    };
}

export function retrieveGroupMembers(orgId, groupId) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.RETRIEVE_GROUP_MEMBERS,
            meta: { orgId, groupId },
            payload: {
                promise: z.resource('orgs', orgId,
                    'groups', groupId, 'members').get()
            }
        });
    };
}
