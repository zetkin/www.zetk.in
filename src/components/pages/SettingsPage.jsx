import React from 'react';
import { connect } from 'react-redux';
// import { FormattedMessage as Msg } from 'react-intl';

import {
    changePassword,
    resetPasswordChanged,
} from '../../actions/user';

const mapStateToProps = state => ({
    userStore: state.get('user'),
});

@connect(mapStateToProps)
export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
        };
    }

    render() {
        const passwordPending = this.props.userStore.get('passwordPending');
        const passwordChanged = this.props.userStore.get('passwordChanged');
        const passwordError = this.props.userStore.get('passwordError');
        let msg = null;

        if (passwordChanged) {
            if (passwordError) {
                msg = <p className="SettingsPage-msg-error" id="pages.settingsPage.password.error">Wrong password</p>
            }
            else {
                msg = <p className="SettingsPage-msg-success" id="pages.settingsPage.password.success">Password changed</p>
                setTimeout( () => {
                    this.props.dispatch(resetPasswordChanged());
                }, 10000);
            }
        }

        return (
            <div className="SettingsPage">
                <h1>Settings</h1>
                <h2>Change password</h2>
                { msg }
                <form onSubmit={ this.onSubmitPassword.bind(this) }>
                    <ul>
                        <li>
                            <label htmlFor="old_pwd">Old password</label>
                            <input type="password" id="old_pwd"
                                onChange={ this.onChangeOldPwd.bind(this) }
                                value={ this.state.oldPassword }/>
                        </li>
                        <li>
                            <label htmlFor="new_pwd">New password</label>
                            <input type="password" id="new_pwd"
                                onChange={ this.onChangeNewPwd.bind(this) }
                                value={ this.state.newPassword }/>
                        </li>
                    </ul>
                    <input type="submit" value="Submit" disabled={passwordPending}/>
                </form>
            </div>
        );
    }

    onSubmitPassword(ev) {
        this.props.dispatch( changePassword(
            this.state.oldPassword, this.state.newPassword)

        );

        ev.preventDefault();
    }

    onChangeNewPwd(ev) {
        this.setState({
            newPassword: ev.target.value
        });
        if (this.props.userStore.get('passwordChanged')) {
            this.props.dispatch(resetPasswordChanged());
        }
    }

    onChangeOldPwd(ev) {
        this.setState({
            oldPassword: ev.target.value
        });
        if (this.props.userStore.get('passwordChanged')) {
            this.props.dispatch(resetPasswordChanged());
        }
    }
}
