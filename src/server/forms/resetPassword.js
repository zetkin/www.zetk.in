import { RESET_PASSWORD } from '../../actions';


export default (req, res, next) => {
    let token = req.body.token;
    let password = req.body.password;

    let tokenFields = token.split('$');

    if (tokenFields.length == 2) {
        req.store.dispatch({
            type: RESET_PASSWORD + '_PENDING',
        });

        let data = {
            reset_code: tokenFields[1],
            new_password: password,
        };

        req.z.resource('users', tokenFields[0], 'password')
            .post(data)
            .then(result => {
                req.store.dispatch({
                    type: RESET_PASSWORD + '_FULFILLED',
                    payload: result,
                });

                next();
            })
            .catch(err => {
                req.store.dispatch({
                    type: RESET_PASSWORD + '_REJECTED',
                    payload: err,
                });

                next();
            });
    }
    else {
        res.redirect('/lost-passwod');
    }
};
