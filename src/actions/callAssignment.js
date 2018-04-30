import * as types from '.';


export function retrieveUserAssignments() {
    return ({ dispatch, z }) => {
        let today = new Date().format('{yyyy}-{MM}-{dd}');
        let filters = [
            ['start_date', '<=', today],
            ['end_date', '>=', today],
        ];

        dispatch({
            type: types.RETRIEVE_USER_ASSIGNMENTS,
            payload: {
                promise: z.resource('users', 'me', 'call_assignments')
                    .get(null, null, filters)
            }
        });
    };
}
