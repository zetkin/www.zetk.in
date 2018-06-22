import express from 'express';
import immutable from 'immutable';

import { configureStore } from '../store';
import { createLocalizeHandler } from './locale';
import { setUserData } from '../actions/user';
import { retrieveAllCampaigns } from '../actions/campaign';
import { retrieveUserAssignments } from '../actions/callAssignment';
import { retrieveCampaign } from '../actions/campaign';
import { retrieveSurvey } from '../actions/survey';
import {
    retrieveGroup,
    retrieveGroupMembers,
} from '../actions/group';
import {
    retrieveOrganization,
    retrieveUserMemberships,
} from '../actions/org';
import {
    retrieveAllActions,
    retrieveCampaignActions,
    retrieveUserActions,
    retrieveUserResponses,
} from '../actions/action';


export default (messages) => {
    const preloader = express();
    const localizeHandler = createLocalizeHandler(messages);

    preloader.use(initStore);

    // TODO: Change scope depending on URL
    preloader.use(localizeHandler());

    preloader.get('*', waitForActions(req => [
        retrieveUserMemberships(),
    ]));

    preloader.get(['/dashboard/*', '/dashboard'], waitForActions(req => [
        retrieveAllCampaigns(),
        retrieveAllActions(),
        retrieveUserActions(),
        retrieveUserAssignments(),
        retrieveUserResponses(),
    ]));

    preloader.all('/o/:orgId', waitForActions(req => [
        retrieveOrganization(req.params.orgId),
    ]));

    preloader.get('/o/:orgId/campaigns/:campaignId', waitForActions(req => [
        retrieveCampaign(req.params.orgId, req.params.campaignId),
        retrieveCampaignActions(req.params.orgId, req.params.campaignId),
        retrieveUserActions(),
        retrieveUserResponses(),
    ]));

    preloader.get('/o/:orgId/groups/:groupId', waitForActions(req => [
        retrieveGroup(req.params.orgId, req.params.groupId),
        retrieveGroupMembers(req.params.orgId, req.params.groupId),
    ]));

    preloader.get('/o/:orgId/surveys/:surveyId', waitForActions(req => [
        retrieveOrganization(req.params.orgId),
        retrieveSurvey(req.params.orgId, req.params.surveyId),
    ]));

    preloader.get('/o/:orgId/surveys/:surveyId/submitted', waitForActions(req => [
        retrieveSurvey(req.params.orgId, req.params.surveyId),
    ]));

    return preloader;
}

function initStore(req, res, next) {
    let initialState = immutable.fromJS({
        intl: {
            locale: 'en',
            messages: {},
        },
    });

    req.store = configureStore(initialState, req.z);

    req.z.resource('users', 'me').get()
        .then(apiRes => {
            console.log('Retrieved user data', apiRes);
            req.store.dispatch(setUserData(apiRes.data.data));

            if (apiRes.data.data.is_verified || req.path.substr(0, 7) == '/verify') {
                next();
            }
            else {
                // Redirect unverified users
                res.redirect('/verify');
            }
        })
        .catch(err => {
            console.log('Could not retrieve user', err);
            next();
        });
}

function waitForActions(execActions) {
    return (req, res, next) => {
        let thunksOrActions = execActions(req);
        let promises = [];

        for (let i = 0; i < thunksOrActions.length; i++) {
            let thunkOrAction = thunksOrActions[i];
            if (typeof thunkOrAction === 'function') {
                // Invoke thunk method, passing an augmented store where the
                // dispatch method has been replaced with a method that also
                // saves the dispatched action to be inspected for promises.
                thunkOrAction({
                    ...req.store,
                    z: req.z,
                    dispatch: function(action) {
                        thunkOrAction = action;
                        req.store.dispatch(thunkOrAction);
                    }
                });
            }

            if (thunkOrAction.payload && thunkOrAction.payload.promise) {
                promises.push(thunkOrAction.payload.promise);
            }
        }

        Promise.all(promises)
            .then(() => next())
            .catch(() => next());
    };
}
