import express from 'express';


const opsRouter = express();

opsRouter.get('/:op/:paramString*?', (req, res, next) => {
    const opFunc = OPS[req.params.op];

    if (opFunc) {
        let opParams = [];

        try {
            opParams = req.params.paramString.split(',');
        }
        catch (err) {}

        opFunc(req, opParams)
            .then(() => {
                const redirUrl = req.query.onComplete || '/dashboard';
                res.redirect(307, redirUrl);
            })
            .catch(err => {
                const redirUrl = req.query.onFailure || req.query.onComplete || '/dashboard';
                res.redirect(307, redirUrl);
            });
    }
    else {
        res.status(404).end();
    }
});


const OPS = {
    actionSignup: (req, params) => {
        const [ orgId, actionId, op ] = params;

        if (orgId && actionId && op) {
            let fragment = '';
            let personId = null;

            // Retrieve list of memberships to make sure user is
            // connected to the relevant organization
            return req.z.resource('users', 'me', 'memberships')
                .get()
                .then(result => {
                    const membership = result.data.data.find(m => m.organization.id == orgId);

                    if (membership) {
                        return membership.profile.id;
                    }
                    else {
                        return req.z.resource('orgs', orgId, 'join_requests')
                            .post()
                            .then(joinResult => {
                                return joinResult.data.data.id;
                            });
                    }
                })
                .then(personId => {
                    const resource = req.z.resource('orgs', orgId, 'actions', actionId,
                        'responses', personId);

                    return (op == 'signup')? resource.put() : resource.del();
                })
        }
        else {
            return Promise.reject(false);
        }
    },
};

export default opsRouter;
