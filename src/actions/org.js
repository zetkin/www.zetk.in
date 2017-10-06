import * as types from '.';


export function retrieveOrganization(slugOrId) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.RETRIEVE_ORGANIZATION,
            payload: {
                promise: z.resource('orgs', slugOrId).get(),
            },
        });
    };
}

export function retrieveUserMemberships() {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.RETRIEVE_USER_MEMBERSHIPS,
            payload: {
                promise: z.resource('users', 'me', 'memberships').get()
            }
        });
    };
}
