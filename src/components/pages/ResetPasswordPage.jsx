import React from 'react';
import { injectIntl, FormattedMessage as Msg } from 'react-intl';
import { connect } from 'react-redux';

import SimplePageBase from './SimplePageBase';
import Button from '../../common/misc/Button';
import { resetPassword } from '../../actions/password';


const mapStateToProps = state => ({
    token: state.getIn(['password', 'resetToken']),
    reset: state.getIn(['password', 'reset']),
});


@injectIntl
@connect(mapStateToProps)
export default class ResetPasswordPage extends SimplePageBase {
    constructor(props) {
        super(props);

        this.state = {
            password: '',
        };
    }

    renderContent() {
        let content;

        if (this.props.reset) {
            content = [
                <Msg key="p" tagName="p"
                    id="pages.resetPassword.after.p"/>,
                <Button key="loginButton"
                    href="/login" forceRefresh={ true }
                    labelMsg="pages.resetPassword.after.loginButton"/>,
            ];
        }
        else {
            let submitLabel = this.props.intl.formatMessage(
                { id: 'pages.resetPassword.before.submitButton' });

            content = [
                <Msg key="p" tagName="p"
                    id="pages.resetPassword.before.p"/>,
                <form key="form" method="post"
                    onSubmit={ this.onSubmit.bind(this) }>
                    <input type="password" name="password"
                        value={ this.state.password }
                        onChange={ this.onChangePassword.bind(this) }/>

                    <input type="hidden" name="token"
                        value={ this.props.token }/>

                    <input type="submit" value={ submitLabel }/>
                </form>
            ];
        }

        return (
            <div className="ResetPasswordPage">
                <Msg tagName="h1" id="pages.resetPassword.h"/>
                { content }
            </div>
        );
    }

    onSubmit(ev) {
        ev.preventDefault();

        this.props.dispatch(resetPassword(this.state.password));
    }

    onChangePassword(ev) {
        this.setState({
            password: ev.target.value
        });
    }
}
