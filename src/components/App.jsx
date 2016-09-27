import { connect } from 'react-redux';
import React from 'react';

import Header from './header/Header';
import { LandingPage } from './pages';


@connect(state => ({ message: state.get('message') }))
export default class App extends React.Component {
    render() {
        let stateJson = JSON.stringify(this.props.initialState);
        var debugPanel = null;

        return (
            <html>
                <head>
                    <title>Zetkin</title>
                    <script src="/static/main.js"></script>
                    <link rel="stylesheet" href="/static/css/style.css"/>
                    <link rel="icon" type="image/png"
                        href="/static/img/favicon.png"/>
                </head>
                <body>
                    <Header/>
                    <LandingPage />
                    <script type="text/json"
                        id="App-initialState"
                        dangerouslySetInnerHTML={{ __html: stateJson }}/>
                </body>
            </html>
        );
    }

    onClick() {
        const dispatch = this.props.dispatch;
        const msg = (this.props.message == 'Hello world!')?
            'Goodbye world' : 'Hello world!';

        dispatch(setMessage(msg));
    }

    static contextTypes = {
        store: React.PropTypes.object.isRequired
    }
}
