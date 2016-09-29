import * as types from '.';


export function retrieveAllActions() {
    return ({ dispatch, z }) => {
        // Load list of organizations, then iterate over and load actions
        // for each of the organizations.
        let promise = z.resource('orgs').get()
            .then(res => {
                let orgs = res.data.data;
                return Promise.all(orgs.map(org => (
                    z.resource('orgs', org.id, 'actions')
                        .meta({ org })
                        .get()
                )));
            });

        dispatch({
            type: types.RETRIEVE_ALL_ACTIONS,
            payload: { promise }
        });
    };
}

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
