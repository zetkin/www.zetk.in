import { connect } from 'react-redux';
import React from 'react';

import Hello from './Hello';
import { setMessage } from '../actions';


@connect(state => state)
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
                    <Hello message={ this.props.message }/>
                    <button onClick={ this.onClick.bind(this) }>
                        Click to change message</button>
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
