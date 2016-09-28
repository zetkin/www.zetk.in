import React from 'react';
import ImPropTypes from 'react-immutable-proptypes';


export default class UserContinueButton extends React.Component {
    static propTypes = {
        user: ImPropTypes.map.isRequired,
    };

    render() {
        let userData = this.props.user;
        let firstName = userData.get('first_name');
        let lastName = userData.get('last_name');

        return (
            <div className="UserMenu">
                { firstName + ' ' + lastName }
            </div>
        );
    }
}
