import { connect } from 'react-redux';
import cx from 'classnames';
import { FormattedMessage as Msg, injectIntl } from 'react-intl';
import React from 'react';

import FormattedLink from '../../../common/misc/FormattedLink';
import SignUpForm from '../../misc/SignUpForm';

const mapStateToProps = state => ({
    user: state.get('user'),
});

@connect(mapStateToProps)
@injectIntl
export default class SignUpSplash extends React.Component {
    static propTypes = {
        showForm: React.PropTypes.bool
    };

    render() {
        let content;

        if (this.props.showForm && this.props.user.get('data')) {
            let domain = process.env.ZETKIN_DOMAIN;
            let userData = this.props.user.get('data');
            let firstName = userData.get('first_name');
            let lastName = userData.get('last_name');
            let userId = this.props.user.getIn(['data', 'id']);
            let avatarDomain = '//api.' + domain;
            let logoutUrl = '//www.' + domain + '/logout';
            let avatarSrc = avatarDomain + '/users/' + userId + '/avatar';
            let avatarStyle = {backgroundImage: 'url("' + avatarSrc + '")'}

            // Trying to register while already logged in
            content = (
                <div className="SignUpSplash-authenticated">
                    <div className="SignUpSplash-avatar"
                        style={ avatarStyle }/>
                    <Msg tagName="h1"
                        id="pages.landing.splash.authenticated.h1"
                        values={{ firstName, lastName }}/>
                    <Msg tagName="p"
                        id="pages.landing.splash.authenticated.p"/>
                    <FormattedLink href="/"
                        className="SignUpSplash-cancelLink"
                        msgId="pages.landing.splash.authenticated.cancelLink"/>
                    <FormattedLink href={ logoutUrl }
                        className="SignUpSplash-logoutLink"
                        msgId="pages.landing.splash.authenticated.logoutLink"/>
                </div>
            );
        }
        else if (this.props.showForm) {
            content = <SignUpForm/>;
        }
        else {
            let infoHref = this.props.intl.formatMessage(
                { id: 'pages.landing.splash.infoLink.href' });

            content = [
                <Msg key="h1" tagName="h1" id="pages.landing.splash.h1"/>,
                <Msg key="h2" tagName="h2" id="pages.landing.splash.h2"/>,
                <div key="actions" className="SignUpSplash-actions">
                    <FormattedLink href="/register"
                        msgId="pages.landing.splash.signUpLink"/>
                    <FormattedLink href={ infoHref }
                        msgId="pages.landing.splash.infoLink.text"/>
                </div>,
            ];
        }

        let classes = cx('SignUpSplash', {
            'SignUpSplash-withForm': this.props.showForm,
        });

        return (
            <div className={ classes }>
                <div className="SignUpSplash-content">
                    { content }
                </div>
                <div key="caption" className="SignUpSplash-imageCaption">
                    <Msg tagName="p" id="pages.landing.splash.caption"/>
                </div>
            </div>
        );
    }
}
