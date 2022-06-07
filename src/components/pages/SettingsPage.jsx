import React from 'react';
import { FormattedMessage as Msg, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import ConnectionList from '../misc/ConnectionList';
import SimplePageBase from './SimplePageBase';

import { updateUserLang, updateUserEmail, resetEmailChanged } from '../../actions/user';
import { followOrganization,  unfollowOrganization } from '../../actions/org';

import {
    changePassword,
    resetPasswordChanged,
} from '../../actions/password';

const mapStateToProps = state => ({
    user: state.get('user'),
    browserLocale: state.getIn(['intl', 'browserLocale']),
    passwordStore: state.get('password'),
    connectionList: state.getIn(['orgs', 'followingList']),
});

@connect(mapStateToProps)
@injectIntl
export default class SettingsPage extends SimplePageBase {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            email: this.props.user.getIn(['data', 'email']),
        };

    }

    renderContent() {
        const passwordPending = this.props.passwordStore.get('isChangePending');
        const passwordChanged = this.props.passwordStore.get('changed');
        const passwordError = this.props.passwordStore.get('changeError');
        let passwordMsg = null;

        if (passwordChanged) {
            if (passwordError) {
                passwordMsg = <p className="SettingsPage-msg-error" id="pages.settings.password.error">Wrong password</p>
            }
            else {
                passwordMsg = <p className="SettingsPage-msg-success" id="pages.settings.password.success">Password changed</p>
                setTimeout( () => {
                    this.props.dispatch(resetEmailChanged());
                }, 10000);
            }
        }

        const emailPending = this.props.user.get('isChangePending');
        const emailChanged = this.props.user.get('changed');
        const emailError = this.props.user.get('changeError');

        let emailMsg = null;

        if (emailChanged) {
            if (passwordError) {
                emailMsg = <p className="SettingsPage-msg-error" id="pages.settings.email.error">Cannot set email</p>
            } else {
                emailMsg = <p className="SettingsPage-msg-success" id="pages.settings.email.success">Email changed</p>
                    setTimeout( () => {
                        this.props.dispatch(resetEmailChanged());
                    }, 10000);
            }
        }

        let submitPasswordLabel = this.props.intl.formatMessage(
            { id: 'pages.settings.password.submitButton' });

        let submitEmailLabel = this.props.intl.formatMessage(
            { id: 'pages.settings.email.submitButton' });

        const notVerifiedLabel = this.props.intl.formatMessage(
            { id: 'pages.settings.email.notVerified' });

        let passwordSubmitEnabled = (this.state.oldPassword.length
            && this.state.newPassword.length >= 6
            && !passwordPending);

        // Show the email settings if the email is not set (or not verifed), or if the user is logged in with level 2 authentication
        let showEmail = !this.props.user.getIn(['data', 'email'])
            || !this.props.user.getIn(['data', 'email_is_verified'])
            || this.props.user.getIn(['data', 'level']) >= 2;

        const emailSubmitEnabled = this.state.email 
            && this.state.email != this.props.user.getIn(['data', 'email']) 
            && !emailPending;
        let emailVerified = this.props.user.getIn(['data', 'email_is_verified']);
        
        let emailForm;
        if (showEmail) {
            emailForm = (
            <form onSubmit={ this.onSubmitEmail.bind(this) }>
                <ul>
                    <li>
                        <label htmlFor="new_email">
                            <Msg id="pages.settings.email.newEmail"/>
                        </label>
                        <input type="email" id="new_email"
                            onChange={ this.onChangeEmail.bind(this) }
                            value={ this.state.email }/>

                    </li>
                </ul>
                <input type="submit"
                    value={ submitEmailLabel }
                    disabled={ !emailSubmitEnabled }/>

                { !emailVerified ? 
                    <p className="notVerified">{ notVerifiedLabel }</p> : null }
            </form>);
        }
        else {
            emailForm = <Msg tagName="p" id="pages.settings.email.cannot"/>;
        }

        let lang = this.props.user.getIn(['data', 'lang']) || 'auto';
        let langOptions = [ 'auto', 'sv', 'en', 'da', 'nn' ];

        return (
            <div className="SettingsPage">
                <Msg tagName="h1" id="pages.settings.h"/>
                <Msg tagName="h2" id="pages.settings.language.h"/>
                <Msg tagName="p" id="pages.settings.language.p"/>
                <select value={ lang }
                    onChange={ this.onLangChange.bind(this) }>
                { langOptions.map(val => {
                    let label = this.props.intl.formatMessage(
                        { id: 'pages.settings.language.options.' + val },
                        { locale: this.props.browserLocale });

                    return (
                        <option key={ val } value={ val }>
                            { label }</option>
                    );
                })}
                </select>

                <Msg tagName="h2" id="pages.settings.connections.h"/>
                <Msg tagName="p" id="pages.settings.connections.intro"/>
                <ConnectionList
                    connectionList={ this.props.connectionList }
                    onUpdateFollow={ this.onConnectionListUpdateFollow.bind(this) }
                    />

                <Msg tagName="h2" id="pages.settings.email.h"/>
                { emailMsg }
                { emailForm }

                <Msg tagName="h2" id="pages.settings.password.h"/>
                { passwordMsg }
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
                        value={ submitPasswordLabel }
                        disabled={ !passwordSubmitEnabled } />
                </form>
            </div>
        );
    }

    onConnectionListUpdateFollow(org, follow) {
        if(follow) {
            this.props.dispatch(followOrganization(org));
        } else {
            this.props.dispatch(unfollowOrganization(org));
        }
    }

    onLangChange(ev) {
        let lang = ev.target.value;
        if (lang == 'auto') {
            lang = null;
        }

        this.props.dispatch(updateUserLang(lang));
    }

    onSubmitPassword(ev) {
        this.props.dispatch( changePassword(
            this.state.oldPassword, this.state.newPassword)

        );

        ev.preventDefault();
    }

    onSubmitEmail(ev) {
        this.props.dispatch( updateUserEmail(this.state.email) );

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

    onChangeEmail(ev) {
        this.setState({
            email: ev.target.value
        });
    }
}
