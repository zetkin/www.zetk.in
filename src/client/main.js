import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { appState, finalCreateStore } from '../reducers';
import App from '../components/App';


window.onload = function() {
    const store = finalCreateStore(appState);

    ReactDOM.render(React.createElement(Provider, { store },
        React.createElement(App)), document);
}
