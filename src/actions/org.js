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

export function followOrganization(orgId) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.FOLLOW_ORGANIZATION,
            meta: { orgId },
            payload: {
                promise: z.resource('users', 'me', 'following', orgId).put()
            }
        })
    }
}

export function unfollowOrganization(orgId) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.UNFOLLOW_ORGANIZATION,
            meta: { orgId },
            payload: {
                promise: z.resource('users', 'me', 'following', orgId).del()
            }
        })
    }
}

export function retrieveUserFollowing(orgId) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.RETRIEVE_USER_FOLLOWING,
            meta: { orgId },
            payload: {
                promise: z.resource('users', 'me', 'following').get()
            }
        })
    }
}

export function deleteUserMembership(orgId) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.DELETE_USER_MEMBERSHIP,
            meta: { orgId },
            payload: {
                promise: z.resource('users', 'me', 'memberships', orgId).del(),
            }
        });
    }
}

export function retrieveRecommendedOrganizations() {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.RETRIEVE_RECOMMENDED_ORGANIZATIONS,
            payload: {
                promise: z.resource('users', 'me', 'recommended_organizations').get()
            },
        });
    };
}
