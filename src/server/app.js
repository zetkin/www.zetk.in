import auth from 'express-zetkin-auth';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import url from 'url';
import querystring from 'querystring';
import { match, RouterContext } from 'react-router';

import App from '../components/App';
import IntlReduxProvider from '../components/IntlReduxProvider';
import { loadLocaleHandler } from './locale';
import formEndpoints from './forms';
import preloader from './preloader';
import routes from '../components/routes';
import { setPasswordResetToken } from '../actions/password';
import { setHelpSeen, setHelpDismissed } from '../actions/help';


const authOpts = {
    loginUrl: process.env.ZETKIN_LOGIN_URL,
    app: {
        id: process.env.ZETKIN_APP_ID,
        key: process.env.ZETKIN_APP_KEY,
    }
};

export default function initApp(messages) {
    const app = express();

    if (process.env.NODE_ENV !== 'production') {
        // When not in production, redirect requests for the main JS file to the
        // Webpack dev server running on localhost.
        app.get('/static/main.js', function(req, res) {
            let wpMainJs = url.format({
                hostname: req.host,
                port: process.env.WEBPACK_PORT || 81,
                pathname: '/static/main.js',
            });

            res.redirect(303, wpMainJs);
        });
    }

    app.use('/favicon.ico', (req, res) => res.status(404).end());
    app.use('/static/', express.static(
        path.join(__dirname, '../../static'),
        { fallthrough: false }));

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(auth.initialize(authOpts));
    app.get('/', auth.callback(authOpts));
    app.get('/logout', auth.logout(authOpts));

    app.get('/l10n', loadLocaleHandler());

    // Require authentication for some routes
    app.get('/dashboard', auth.validate(authOpts));
    app.get('/settings', auth.validate(authOpts));
    app.get('/o/:org_id/campaigns/:campaign_id', auth.validate(authOpts));

    app.use(preloader(messages));

    // For all routes, figure out whether to show help based on cookies
    app.use('*', (req, res, next) => {
        if ('wwwHelpSeen' in req.cookies) {
            req.store.dispatch(setHelpSeen());
        }
        if ('wwwHelpDismissed' in req.cookies) {
            req.store.dispatch(setHelpDismissed());
        }

        next();
    });

    // For some routes, require user to be anonymous
    app.get(['/lost-password', '/reset-password'], (req, res, next) => {
        let state = req.store.getState();

        if (state.getIn(['user', 'data'])) {
            res.redirect('/dashboard');
        }
        else {
            next();
        }
    });

    app.use('/reset-password', (req, res, next) => {
        if ('token' in req.query) {
            req.store.dispatch(setPasswordResetToken(req.query.token));
            next();
        }
        else {
            res.redirect('/lost-password');
        }
    });

    app.post('/o/:orgId/surveys/:surveyId', formEndpoints.survey);
    app.post('/forms/actionResponse', auth.validate(authOpts), formEndpoints.actionResponse);
    app.post('/lost-password', formEndpoints.lostPassword);
    app.post('/reset-password', formEndpoints.resetPassword);
    app.post('/register', formEndpoints.register);

    // TODO: Better way of handling 404s
    app.use('/o/:org_id/campaigns/:campaign_id', (req, res, next) => {
        let orgId = req.params.org_id;
        let campaignId = req.params.campaign_id;
        let state = req.store.getState();

        if (state.getIn(['orgs', 'orgList', 'items', orgId])
            && state.getIn(['campaigns', 'campaignList', 'items', campaignId])) {
            next();
        }
        else {
            res.status(404);
            next();
        }
    });

    app.use((req, res, next) => {
        const JOIN_QUERY_PARAM = 'connect';
        const JOIN_COOKIE_NAME = 'orgsToConnect';
        const JOIN_COOKIE_EXP = 24 * 60 * 60 * 1000;

        let query = url.parse(req.url, true).query;
        let state = req.store.getState();
        let orgs = [];

        if (JOIN_QUERY_PARAM in query) {
            orgs.push(query[JOIN_QUERY_PARAM]);
        }

        let cookieOrgsJson = req.cookies[JOIN_COOKIE_NAME];

        try {
            let cookieOrgs = JSON.parse(cookieOrgsJson);
            cookieOrgs.forEach(orgId => {
                if (orgs.indexOf(orgId) < 0) {
                    orgs.push(orgId);
                }
            });
        }
        catch (err) {}

        if (orgs.length && state.getIn(['user', 'data', 'is_verified'])) {
            // Signed in and verified, so submit join requests to any org in
            // which the user is not already a member and clear the cookie.
            let promises = orgs
                .filter(orgId =>
                    !state.getIn(['orgs', 'orgList', 'items', orgId]))
                .map(orgId =>
                    req.z.resource('orgs', orgId, 'join_requests').post());

            res.clearCookie(JOIN_COOKIE_NAME);

            Promise.all(promises)
                .then(result => {
                    res.redirect(req.path);
                })
                .catch(err => {
                    next();
                });
        }
        else {
            let orgsJson = JSON.stringify(orgs);
            let cookieOpts = {
                maxAge: JOIN_COOKIE_EXP,
            };

            res.cookie(JOIN_COOKIE_NAME, orgsJson, cookieOpts);

            if (orgs.length && JOIN_QUERY_PARAM in query) {
                delete query[JOIN_QUERY_PARAM];
                let qs = querystring.stringify(query);
                res.redirect(qs.length? req.path + '?' + qs : req.path);
            }
            else {
                next();
            }
        }
    });

    app.get('/verify', auth.validate(authOpts), function(req, res, next) {
        var query = url.parse(req.url, true).query;

        if ('code' in query) {
            let data = {
                verification_code: query.code
            };

            req.z.resource('users', 'me', 'verification_code').post(data)
                .then(function() {
                    res.redirect('/dashboard');
                })
                .catch(function(err) {
                    next();
                });
        }
        else {
            req.z.resource('/users/me').get()
                .then(function(result) {
                    var user = result.data.data;
                    if (user.is_verified) {
                        res.redirect('/dashboard');
                    }
                    else {
                        next();
                    }
                })
                .catch(function() {
                    next();
                });
        }
    });

    app.post('/verify', function(req, res, next) {
        let data = {
            verification_code: req.body.code,
        };

        req.z.resource('users', 'me', 'verification_code').post(data)
            .then(function() {
                res.redirect('/dashboard');
            })
            .catch(function(err) {
                console.log('VERI ERR', err);
                next();
            });
    });

    app.use(function(req, res, next) {
        renderReactPage(App, req, res);
    });

    return app;
}

function renderReactPage(Component, req, res) {
    try {
        match({ routes, location: req.url }, (err, redirect, props) => {
            let html = ReactDOMServer.renderToString(
                React.createElement(IntlReduxProvider, { store: req.store },
                    React.createElement(RouterContext, props)));

            if (props.routes.find(r => r.id === '404')) {
                res.status(404);
            }

            // Prepend a doctype for HTML5 and to force standards mode in legacy
            // versions of Internet Explorer (e.g. 8).
            html = '<!DOCTYPE html>' + html;
            res.send(html);
        });
    }
    catch (err) {
        throw err; // TODO: Better error handling
    }
}
