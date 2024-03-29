/**
 * This is the main entry point of the client-side instance of the application.
 * The server will have already rendered the HTML and prepared initial dataset
 * in the App-initialState script element.
*/
import cookie from 'cookie-cutter';
import immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import Z from 'zetkin';
import { addLocaleData } from 'react-intl';
import svLocaleData from 'react-intl/locale-data/sv';
import daLocaleData from 'react-intl/locale-data/da';
import nnLocaleData from 'react-intl/locale-data/nn';
import deLocaleData from 'react-intl/locale-data/de';
import { Router, browserHistory } from 'react-router';

import polyfills from '../utils/polyfills';
import { configureStore } from '../store';
import IntlReduxProvider from '../components/IntlReduxProvider';
import routes from '../components/routes';


const USE_TLS = (process.env.ZETKIN_USE_TLS == '1');


window.onload = function() {
    Z.configure({
        clientId: process.env.ZETKIN_APP_ID,
        zetkinDomain: process.env.ZETKIN_DOMAIN,
        port: USE_TLS? 443 : 80,
        ssl: USE_TLS,
    });

    addLocaleData([
        ...svLocaleData,
        ...daLocaleData,
        ...deLocaleData,
        ...nnLocaleData,
    ]);

    let token = cookie.get('apiAccessToken');
    if (token) {
        Z.setAccessToken(token);
    }

    let stateElem = document.getElementById('App-initialState');
    let stateJson = stateElem.innerText || stateElem.textContent;
    let initialState = immutable.fromJS(JSON.parse(stateJson));

    let store = configureStore(initialState, Z);
    let props = {
        routes,
        history: browserHistory
    };

    ReactDOM.render(React.createElement(IntlReduxProvider, { store },
        React.createElement(Router, props)), document);
};
