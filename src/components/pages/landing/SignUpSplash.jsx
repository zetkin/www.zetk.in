import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage as Msg } from 'react-intl';


export default class SignUpSplash extends React.Component {
    render() {
        return (
            <div className="SignUpSplash">
                <Msg tagName="h1" id="pages.landing.splash.h1"/>
                <Msg tagName="h2" id="pages.landing.splash.h2"/>
                <Link to="/register">
                    <Msg id="pages.landing.splash.signUpLink"/></Link>
                <Link to="/info">
                    <Msg id="pages.landing.splash.infoLink"/></Link>
                <div className="SignUpSplash-imageCaption">
                    <Msg tagName="p" id="pages.landing.splash.caption"/>
                </div>
            </div>
        );
    }
}
