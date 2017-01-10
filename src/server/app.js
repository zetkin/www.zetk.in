import auth from 'express-zetkin-auth';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import url from 'url';
import { match, RouterContext } from 'react-router';

import App from '../components/App';
import IntlReduxProvider from '../components/IntlReduxProvider';
import { loadLocaleHandler } from './locale';
import formEndpoints from './forms';
import preloader from './preloader';
import routes from '../components/routes';


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
        // TODO: Configure dev server using environment variables?
        app.get('/static/main.js', function(req, res) {
            res.redirect(303, 'http://localhost:8081/static/main.js');
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

    app.use('/forms', auth.validate(authOpts), formEndpoints);

    app.get('/l10n', loadLocaleHandler());

    app.get('/dashboard', auth.validate(authOpts));

    app.use(preloader(messages));

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
                res.redirect('/welcome');
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

            res.send(html);
        });
    }
    catch (err) {
        throw err; // TODO: Better error handling
    }
}
