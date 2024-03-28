export default (req, res, next) => {
    let form = req.body;
    let orgId = req.params.orgId;
    let surveyId = req.params.surveyId;
    let state = req.store.getState();

    let signature = null;
    if (form.sig == 'user' && state.getIn(['user', 'data'])) {
        signature = 'user';
    }
    else if (form.sig == 'email') {
        signature = {
            first_name: form['sig.first_name'],
            last_name: form['sig.last_name'],
            email: form['sig.email'],
        };
    }

    let responses = {};

    for (let name in form) {
        if (name.indexOf('sig') == 0) {
            continue;
        }
        else if (name.indexOf('privacy') == 0) {
            continue;
        }

        let fields = name.split('.');
        let q_id = fields[0];
        let type = fields[1];

        if (!responses.hasOwnProperty(q_id)) {
            responses[q_id] = {
                question_id: parseInt(fields[0]),
            };
        }

        if (type == 'options') {
            if (Array.isArray(form[name])) {
                responses[q_id].options = form[name].map(o => parseInt(o)).filter(id => !!id);
            }
            else {
                responses[q_id].options = [ parseInt(form[name]) ].filter(id => !!id);
            }
        }
        else if (type == 'text') {
            responses[q_id].response = form[name];
        }
    }

    let data = {
        signature,
        responses: Object.keys(responses).map(q => responses[q]),
    }

    req.z.resource('orgs', orgId, 'surveys', surveyId, 'submissions')
        .post(data)
        .then(result => {
            res.redirect('/o/' + orgId + '/surveys/' + surveyId + '/submitted');
        })
        .catch(err => {
            // TODO: Error feedback
            next();
        });
};
