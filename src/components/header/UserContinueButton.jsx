import { FormattedMessage as Msg } from 'react-intl';
import React from 'react';
import ImPropTypes from 'react-immutable-proptypes';

import Button from '../misc/Button';
import UserMenu from './UserMenu';


export default class UserContinueButton extends React.Component {
    static propTypes = {
        user: ImPropTypes.map.isRequired,
    };

    render() {
        return (
            <div className="UserContinueButton">
                <UserMenu user={ this.props.user }/>
                <Button className="UserContinueButton-button" href="/dashboard"
                    labelMsg="header.user.continue"/>
                <div className="UserContinueButton-wrongUser">
                    <Msg className="UserContinueButton-wrongUserMessage"
                        id="header.user.wrongUser"/>
                    <a href="/logout" className="UserContinueButton-logout">
                        <Msg id="header.user.logout"/>
                    </a>
                </div>
            </div>
        );
    }
}
