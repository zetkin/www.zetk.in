import React from 'react';
import { FormattedMessage as Msg, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
// import { FormattedMessage as Msg } from 'react-intl';

import {
    changePassword,
    resetPasswordChanged,
} from '../../actions/password';

const mapStateToProps = state => ({
    passwordStore: state.get('password'),
});

@connect(mapStateToProps)
@injectIntl
export default class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
        };
    }

    render() {
        const passwordPending = this.props.passwordStore.get('isChangePending');
        const passwordChanged = this.props.passwordStore.get('changed');
        const passwordError = this.props.passwordStore.get('changeError');
        let msg = null;

        if (passwordChanged) {
            if (passwordError) {
                msg = <p className="SettingsPage-msg-error" id="pages.settings.password.error">Wrong password</p>
            }
            else {
                msg = <p className="SettingsPage-msg-success" id="pages.settings.password.success">Password changed</p>
                setTimeout( () => {
                    this.props.dispatch(resetPasswordChanged());
                }, 10000);
            }
        }

        let submitLabel = this.props.intl.formatMessage(
            { id: 'pages.settings.password.submitButton' });

        let submitEnabled = (this.state.oldPassword.length
            && this.state.newPassword.length >= 6
            && !passwordPending);

        return (
            <div className="SettingsPage">
                <Msg tagName="h1" id="pages.settings.h"/>
                <Msg tagName="h2" id="pages.settings.password.h"/>
                { msg }
                <form onSubmit={ this.onSubmitPassword.bind(this) }>
                    <ul>
                        <li>
                            <label htmlFor="old_pwd">
                                <Msg id="pages.settings.password.oldPassword"/>
                            </label>
                            <input type="password" id="old_pwd"
                                onChange={ this.onChangeOldPwd.bind(this) }
                                value={ this.state.oldPassword }/>
                        </li>
                        <li>
                            <label htmlFor="new_pwd">
                                <Msg id="pages.settings.password.newPassword"/>
                            </label>
                            <input type="password" id="new_pwd"
                                onChange={ this.onChangeNewPwd.bind(this) }
                                value={ this.state.newPassword }/>
                        </li>
                    </ul>
                    <input type="submit"
                        value={ submitLabel }
                        disabled={ !submitEnabled }/>
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

        if (this.props.passwordStore.get('changed')) {
            this.props.dispatch(resetPasswordChanged());
        }
    }

    onChangeOldPwd(ev) {
        this.setState({
            oldPassword: ev.target.value
        });

        if (this.props.passwordStore.get('changed')) {
            this.props.dispatch(resetPasswordChanged());
        }
    }
}
