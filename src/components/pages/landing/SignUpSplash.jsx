import { connect } from 'react-redux';
import cx from 'classnames';
import { FormattedMessage as Msg, injectIntl } from 'react-intl';
import React from 'react';

import FormattedLink from '../../../common/misc/FormattedLink';
import SignUpForm from '../../misc/SignUpForm';
import Header from '../../header/Header';
import UserContinueButton from '../../header/UserContinueButton';

const mapStateToProps = state => ({
    user: state.get('user'),
});

@connect(mapStateToProps)
@injectIntl
export default class SignUpSplash extends React.Component {

    render() {
        let content;
        if (this.props.user.get('data')) {
            content = (
                <div className="SignUpSplash-authenticated">
                    <Msg tagName="h2"
                        id="pages.landing.splash.authenticated.h2" />
                    <UserContinueButton user={ this.props.user.get('data') }/>
                </div>
            );
        }
        else {
            content = (
                <SignUpForm
                    formAction="/register"
                    />
            );
        }

        return (
            <div className="SignUpSplash">
                <div className="SignUpSplash-content">
                    <div className="SignUpSplash-contentLogo"></div>
                    { content }
                </div>
                <div className="SignUpSplash-background">
                    <Header
                        currentPath={ "/" }
                        showContinueButton={ true }/>
                    <div className="SignUpSplash-backgroundContent">
                        <div className="SignUpSplash-backgroundContentTitle">
                            <Msg key="h1" tagName="h1"
                                id="pages.landing.splash.h1"/>
                        </div>
                        <div className="SignUpSplash-backgroundContentFooter">
                            <Msg key="p" tagName="p"
                                id="pages.landing.splash.readAbout"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
