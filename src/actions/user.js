import * as types from '.';


export function setUserData(data) {
    return {
        type: types.SET_USER_DATA,
        payload: data,
    };
}

export function resetEmailChanged(data) {
    return {
        type: types.RESET_EMAIL_CHANGED,
    };
}

export function updateUserEmail(email) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.UPDATE_USER_EMAIL,
            payload: z.resource('users', 'me').patch({ 'email': email }),
        });
    };
}

export function updateUserLang(lang) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.UPDATE_USER_LANG,
            payload: z.resource('users', 'me').patch({ lang }),
        });
    };
}
