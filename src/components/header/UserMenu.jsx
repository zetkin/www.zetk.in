import React from 'react';
import ImPropTypes from 'react-immutable-proptypes';
import cx from 'classnames';

import FormattedLink from '../../common/misc/FormattedLink';

export default class UserContinueButton extends React.Component {
    static propTypes = {
        user: ImPropTypes.map.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            dropDownOpen: false,
            mouseOutTimer: null,
        };
    }

    toggleDropDown () {
        this.setState({
            dropDownOpen: !this.state.dropDownOpen,
        });
    }

    render() {
        const userData = this.props.user;
        const dropDownOpen = this.state.dropDownOpen;
        const firstName = userData.get('first_name');
        const lastName = userData.get('last_name');
        const userId = userData.get('id');
        const avatarDomain = '//api.' + process.env.ZETKIN_DOMAIN;
        const avatarSrc = avatarDomain + '/v1/users/' + userId + '/avatar';
        const avatarStyle = {backgroundImage: 'url("' + avatarSrc + '")'}
        const compClasses = cx('UserMenu', { 'UserMenu-expanded': dropDownOpen });
        const logoutUrl = '//www.' + process.env.ZETKIN_DOMAIN + '/logout';
        let dropDown = null;

        if (dropDownOpen) {
            dropDown = <ul className="UserMenu-dropDown">
                <li><FormattedLink className="UserMenu-logout" href={logoutUrl} msgId="header.user.logout">log out</FormattedLink></li>
            </ul>
        }

        return (
            <div className={compClasses} onClick={this.toggleDropDown.bind(this)}>
                <div className="UserMenu-user">
                    <div className="UserMenu-avatar" style={avatarStyle}></div>
                    <div className="UserMenu-name">
                        { firstName + ' ' + lastName }
                    </div>
                </div>
                { dropDown }
            </div>
        );
    }
}
