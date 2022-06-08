import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import CookieNotice from "../common/misc/CookieNotice";
import Footer from './Footer';
import Header from './header/Header';
import { campaign } from '../store/campaigns';
import { organization } from '../store/orgs';


@injectIntl
@connect(state => ({ fullState: state }))
export default class App extends React.Component {
    componentDidMount() {
        if (location.hostname.indexOf('dev.zetkin.org') >= 0
            && process.env.NODE_ENV == 'production') {
            let msg = this.props.intl.formatMessage(
                { id: 'misc.environmentWarning.message' });

            if (confirm(msg)) {
                location = '//www.zetk.in' + location.pathname;
            }
        }
    }

    render() {
        let path = this.props.location.pathname;
        let stateJson = JSON.stringify(this.props.fullState);
        let showContinueButton = (path == '/' || path == '/register');

        let header;

        if (path != '/' && path != '/register') {
            header = (
                <Header
                    currentPath={ this.props.location.pathname }
                    showContinueButton={ showContinueButton }/>
            );
        }

        let url = 'http://www.' + process.env.ZETKIN_DOMAIN + path;
        let title = 'Zetkin';
        let desc = 'Zetkin '
        let imageUrl = 'http://www.' + process.env.ZETKIN_DOMAIN
            + '/static/images/social_image.jpg';

        if (this.props.params.orgId) {
            let org = organization(this.props.fullState, this.props.params.orgId);
            if (org) {
                title = org.get('title') + ' | ' + title;
            }
        }

        if (this.props.params.campaignId) {
            const c = campaign(this.props.fullState, this.props.params.campaignId);
            if (c && c.get('title')) {
                title = c.get('title') + ' | ' + title;
                desc = c.get('info_text');
            }
        }

        return (
            <html>
                <head>
                    <meta name="viewport"
                        content="width=device-width, initial-scale=1"/>
                    <script src="https://use.typekit.net/tqq3ylv.js"></script>
                    <script>{"try{Typekit.load({ async: true })}catch(e){}"}</script>
                    <title>{ title }</title>
                    <script src="/static/main.js"></script>
                    <link rel="stylesheet" href="/static/css/style.css"/>
                    <script type="text/javascript"
                          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCih1zeZELzFJxP2SFkNJVDLs2ZCT_y3gY&libraries=visualization,geometry"/>
                    <link rel="icon" type="image/png"
                        href="/static/images/favicon.png"/>
                    <meta property="og:url"                content={ url } />
                    <meta property="og:title"              content={ title } />
                    <meta property="og:description"        content={ desc } />
                    <meta property="og:image"              content={ imageUrl } />
                </head>
                <body>
                    { header }
                    <div className="App-content">
                        { this.props.children }
                    </div>
                    <Footer />
                    <script type="text/json"
                        id="App-initialState"
                        dangerouslySetInnerHTML={{ __html: stateJson }}/>
                    <CookieNotice />
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
