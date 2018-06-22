import * as types from '.';

import cookies from 'browser-cookies';


export function register(firstName, lastName, email, phone, password, orgId) {
    if (orgId) {
        let orgsToConnect;

        try {
            orgsToConnect = JSON.parse(cookies.get('orgsToConnect'));
        }
        catch(err) {
            orgsToConnect = [];
        }

        // Filter out orgId to avoid duplicates
        orgsToConnect = orgsToConnect
            .map(id => id.toString())
            .filter(id => id !== orgId);

        orgsToConnect.push(orgId)
        cookies.set('orgsToConnect',
            JSON.stringify(orgsToConnect), { expires: 1 });
    }

    return ({ dispatch, getState, z }) => {
        dispatch({
            type: types.REGISTER,
            meta: { firstName, lastName, email },
            payload: {
                promise: z.resource('users').post({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    password: password,
                })
            }
        });
    };
}
