import React from 'react';
import ImPropTypes from 'react-immutable-proptypes';


export default class UserContinueButton extends React.Component {
    static propTypes = {
        user: ImPropTypes.map.isRequired,
    };

    render() {
        const userData = this.props.user;
        const firstName = userData.get('first_name');
        const lastName = userData.get('last_name');
        const userId = userData.get('id');
        const avatarDomain = '//api.' + process.env.ZETKIN_DOMAIN;
        const avatarSrc = avatarDomain + '/v1/users/' + userId + '/avatar';
        const avatarStyle = {backgroundImage: 'url("' + avatarSrc + '")'}

        return (
            <div className="UserMenu">
                <div className="UserMenu-avatar" style={avatarStyle}></div>
                <div className="UserMenu-name">
                    { firstName + ' ' + lastName }
                </div>
            </div>
        );
    }
}
