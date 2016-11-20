import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';
import React from 'react';

import Button from '../../common/misc/Button';
import Logo from './Logo';
import UserContinueButton from './UserContinueButton';
import UserMenu from './UserMenu';


@connect(state => ({ user: state.get('user') }))
export default class Header extends React.Component {
    static propTypes = {
        showContinueButton: React.PropTypes.bool,
    };

    render() {
        let loginUrl = '//login.' + process.env.ZETKIN_DOMAIN
            + '/login?redirPath=/dashboard&appId=' + process.env.ZETKIN_APP_ID;

        let userWidget;

        let userData = this.props.user.get('data');
        let isAuthenticated = !!userData;

        if (isAuthenticated && this.props.showContinueButton) {
            userWidget = (
                <UserContinueButton user={ userData }/>
            );
        }
        else if (isAuthenticated) {
            userWidget = (
                <UserMenu user={ userData }/>
            );
        }
        else {
            userWidget = (
                <Button href={ loginUrl } labelMsg="header.login"
                    className="Header-loginButton"/>
            );
        }

        return (
            <header className="Header">
                <Logo/>
                { userWidget }
            </header>
        );
    }
}
