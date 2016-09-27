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

import polyfills from '../utils/polyfills';
import App from '../components/App';
import { configureStore } from '../store';
import IntlReduxProvider from '../components/IntlReduxProvider';


window.onload = function() {
    Z.configure({
        host: 'api.' + process.env.ZETKIN_DOMAIN,
        port: 80,
        ssl: false
    });

    addLocaleData([
        ...svLocaleData,
    ]);

    let ticket = cookie.get('apiTicket');
    if (ticket) {
        Z.setTicket(JSON.parse(ticket));
    }

    let stateElem = document.getElementById('App-initialState');
    let stateJson = stateElem.innerText || stateElem.textContent;
    let initialState = immutable.Map(JSON.parse(stateJson));

    let store = configureStore(initialState, Z);
    let props = { initialState, }

    ReactDOM.render(React.createElement(IntlReduxProvider, { store: store },
        React.createElement(App, props)), document);
};
