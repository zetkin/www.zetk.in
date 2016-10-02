import * as types from '.';


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
