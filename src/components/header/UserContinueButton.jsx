import { FormattedMessage as Msg } from 'react-intl';
import React from 'react';
import ImPropTypes from 'react-immutable-proptypes';

import Button from '../misc/Button';


export default class UserContinueButton extends React.Component {
    static propTypes = {
        user: ImPropTypes.map.isRequired,
    };

    render() {
        let userData = this.props.user;
        let firstName = userData.get('first_name');
        let lastName = userData.get('last_name');

        return (
            <div className="UserContinueButton">
                <div className="UserContinueButton-user">
                    { firstName + ' ' + lastName }
                </div>
                <Button href="/dashboard"
                    labelMsg="header.user.continue"/>
                <Msg className="UserContinueButton-wrongUser"
                    id="header.user.wrongUser"/>
                <a href="/logout" className="UserContinueButton-logout">
                    <Msg id="header.user.logout"/>
                </a>
            </div>
        );
    }
}
