export default (req, res, next) => {
    let form = req.body;
    let orgId = req.params.orgId;
    let surveyId = req.params.surveyId;
    let state = req.store.getState();

    let signature = null;
    if (state.getIn(['user', 'data'])) {
        signature = 'user';
    }

    let responses = {};

    for (let name in form) {
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
                responses[q_id].options = form[name].map(o => parseInt(o));
            }
            else {
                responses[q_id].options = [ parseInt(form[name]) ];
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
