import { connect } from 'react-redux';
import React from 'react';

import Header from './header/Header';


@connect(state => ({ fullState: state }))
export default class App extends React.Component {
    render() {
        let path = this.props.location.pathname;
        let stateJson = JSON.stringify(this.props.fullState);
        let showContinueButton = (path == '/' || path == '/register');

        return (
            <html>
                <head>
                    <script src="https://use.typekit.net/tqq3ylv.js"></script>
                    <script>{"try{Typekit.load({ async: true })}catch(e){}"}</script>
                    <title>Zetkin</title>
                    <script src="/static/main.js"></script>
                    <link rel="stylesheet" href="/static/css/style.css"/>
                    <link rel="icon" type="image/png"
                        href="/static/img/favicon.png"/>
                </head>
                <body>
                    <Header showContinueButton={ showContinueButton }/>
                    <div className="App-content">
                        { this.props.children }
                    </div>
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
