'use strict';


export default (req, res, next) => {
    let form = req.body;
    console.log(JSON.stringify(form, null, ' '));
    req.z.resource('users', 'me', 'memberships').get()
        .then(res => {
            let memberships = res.data.data;

            let promises = Object.keys(form)
                .filter(key => key.indexOf('.org') > 0)
                .map(key => key.split('.')[0])
                .filter(id => {
                    let prev = form[id + '.prev'];
                    let res = form[id + '.res'] || 'off';
                    console.log(id, prev, res);
                    return res !== prev;
                })
                .map(id => {
                    let orgId = form[id + '.org'];
                    let response = form[id + '.res'];

                    let membership = memberships
                        .find(m => m.organization.id == orgId);

                    let resource = req.z.resource('orgs', orgId, 'actions', id,
                        'responses', membership.profile.id);

                    console.log(id, (response === 'on'));
                    return (response === 'on')? resource.put() : resource.del();
                });

            // TODO: Don't use Promise.all, which fails if any fails
            return Promise.all(promises);
        })
        .then(result => {
            res.redirect(form.redirPath || '/');
        })
        .catch(err => {
            res.redirect(form.redirPath || '/');
        });
};
