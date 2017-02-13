import { SEND_PASSWORD_RESET_TOKEN } from '../../actions';

export default (req, res, next) => {
    let email = req.body.email;

    req.store.dispatch({
        type: SEND_PASSWORD_RESET_TOKEN + '_PENDING',
        meta: { email },
    });

    req.z.resource('password_reset_tokens')
        .post({ email })
        .then(result => {
            req.store.dispatch({
                type: SEND_PASSWORD_RESET_TOKEN + '_FULFILLED',
                meta: { email },
                payload: result,
            });

            next();
        })
        .catch(err => {
            req.store.dispatch({
                type: SEND_PASSWORD_RESET_TOKEN + '_REJECTED',
                meta: { email },
                payload: err,
            });

            next();
        });
};
