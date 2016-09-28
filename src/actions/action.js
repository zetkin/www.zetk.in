import * as types from '.';


export function retrieveUserActions() {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.RETRIEVE_USER_ACTIONS,
            payload: {
                promise: z.resource('users', 'me', 'actions').get()
            }
        });
    };
}
