import * as types from '.';


export function retrieveSurvey(orgId, id) {
    return ({ dispatch, z }) => {
        dispatch({
            type: types.RETRIEVE_SURVEY,
            meta: { orgId, id },
            payload: {
                promise: z.resource('orgs', orgId, 'surveys', id).get()
            }
        });
    };
}
