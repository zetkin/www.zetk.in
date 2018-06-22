'use strict';

import { REGISTER } from '../../actions';


export default (req, res, next) => {
    let form = req.body;
    let data = {
        first_name: form.fn,
        last_name: form.ln,
        email: form.email,
        phone: form.phone,
        password: form.password,
    };

    let meta = {
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone,
    };

    if (form.privacy) {
        req.store.dispatch({
            type: REGISTER + '_PENDING',
            meta: meta,
        });

        req.z.resource('users')
            .post(data)
            .then(result => {
                req.store.dispatch({
                    type: REGISTER + '_FULFILLED',
                    meta: meta,
                    payload: result,
                });

                next();
            })
            .catch(err => {
                console.log('error', err);
                req.store.dispatch({
                    type: REGISTER + '_REJECTED',
                    meta: meta,
                    payload: err,
                });

                next();
            })
    }
    else {
        req.store.dispatch({
            type: REGISTER + '_REJECTED',
            meta: meta,
            payload: 'privacy',
        });

        next();
    }
};
