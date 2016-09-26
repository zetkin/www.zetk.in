/**
 * This is the main entry point of the client-side instance of the application.
 * The server will have already rendered the HTML and prepared initial dataset
 * in the App-initialState script element.
*/
import cookie from 'cookie-cutter';
import immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Z from 'zetkin';

import polyfills from '../utils/polyfills';
import App from '../components/App';
import { configureStore } from '../store';


window.onload = function() {
    Z.configure({
        host: 'api.' + process.env.ZETKIN_DOMAIN,
        port: 80,
        ssl: false
    });

    let ticket = cookie.get('apiTicket');
    if (ticket) {
        Z.setTicket(JSON.parse(ticket));
    }

    /* TODO: Uncomment when initial state is in DOM
    let stateElem = document.getElementById('App-initialState');
    let stateJson = stateElem.innerText || stateElem.textContent;
    let initialState = JSON.parse(stateJson);
    */let initialState = immutable.Map();

    let store = configureStore(initialState, Z);
    let props = { initialState, }

    ReactDOM.render(React.createElement(Provider, { store: store },
        React.createElement(App, props)), document);
};
