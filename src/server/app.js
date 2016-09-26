import auth from 'express-zetkin-auth';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';

import { configureStore } from '../store';
import App from '../components/App';


const authOpts = {
    loginUrl: process.env.ZETKIN_LOGIN_URL,
    app: {
        id: process.env.ZETKIN_APP_ID,
        key: process.env.ZETKIN_APP_KEY,
    }
};

const app = express();

if (process.env.NODE_ENV !== 'production') {
    // When not in production, redirect requests for the main JS file to the
    // Webpack dev server running on localhost.
    // TODO: Configure dev server using environment variables?
    app.get('/static/main.js', function(req, res) {
        res.redirect(303, 'http://localhost:8080/static/main.js');
    });
}

app.use('/static/', express.static(
    path.join(__dirname, '../../static'),
    { fallthrough: false }));

app.use(cookieParser());
app.use(auth.initialize(authOpts));
app.get('/', auth.callback(authOpts));
app.get('/logout', auth.logout(authOpts));

app.use(function(req, res, next) {
    req.store = configureStore(undefined, req.z);

    renderReactPage(App, req, res);
});

function renderReactPage(Component, req, res) {
    try {
        var PageFactory = React.createFactory(Component);
        var props = {
            initialState: req.store.getState(),
            path: req.path,
        };

        var html = ReactDOMServer.renderToString(
            React.createElement(Provider, { store: req.store },
                PageFactory(props)));

        res.send(html);
    }
    catch (err) {
        throw err; // TODO: Better error handling
    }
}

export default app;
