import * as types from '.';

export function setUserData(data) {
    return {
        type: types.SET_USER_DATA,
        payload: data,
    };
}

export function changePassword(oldPassword, newPassword) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.CHANGE_PASSWORD,
            payload: {
                promise: z.resource('users', 'me', 'password').post({
                    my_password: oldPassword,
                    new_password: newPassword,
                }),
            }
        });
    };
}

export function resetPasswordChanged() {
    return {
        type: types.RESET_PASSWORD_CHANGED,
    };
}