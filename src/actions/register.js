import * as types from '.';


export function register(firstName, lastName, email, password) {
    return ({ dispatch, getState, z }) => {
        dispatch({
            type: types.REGISTER,
            meta: { firstName, lastName, email },
            payload: {
                promise: z.resource('users').post({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: password,
                })
            }
        });
    };
}
