import * as types from '.';


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

export function sendPasswordResetToken(email) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.SEND_PASSWORD_RESET_TOKEN,
            meta: { email },
            payload: {
                promise: z.resource('password_reset_tokens').post({ email })
            }
        });
    };
}

export function setPasswordResetToken(token) {
    return {
        type: types.SET_PASSWORD_RESET_TOKEN,
        payload: { token },
    };
}

export function clearLostPasswordState() {
    return {
        type: types.CLEAR_LOST_PASSWORD_STATE,
    };
}

export function resetPassword(newPassword) {
    return ({ dispatch, getState, z }) => {
        let token = getState().getIn(['password', 'resetToken']);
        let tokenFields = token.split('$');

        dispatch({
            type: types.RESET_PASSWORD,
            payload: {
                promise: z.resource('users', tokenFields[0], 'password').post({
                    reset_code: tokenFields[1],
                    new_password: newPassword,
                })
            }
        });
    };
}
