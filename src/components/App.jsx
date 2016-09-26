import { connect } from 'react-redux';
import React from 'react';

import { LandingPage } from './pages';


@connect(state => ({ message: state.get('message') }))
export default class App extends React.Component {
    render() {
        var debugPanel = null;

        return (
            <html>
                <head>
                    <title>Hello</title>
                    <script src="/static/main.js"></script>
                    <link rel="stylesheet" href="/static/css/style.css"/>
                    <link rel="icon" type="image/png"
                        href="/static/img/favicon.png"/>
                </head>
                <body>
                    <LandingPage />
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
