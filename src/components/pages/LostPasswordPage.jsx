import React from 'react';
import { injectIntl, FormattedMessage as Msg } from 'react-intl';
import { connect } from 'react-redux';

import Button from '../../common/misc/Button';
import LoadingIndicator from '../../common/misc/LoadingIndicator';
import {
    sendPasswordResetToken,
    clearLostPasswordState,
} from '../../actions/password';


const mapStateToProps = state => ({
    email: state.getIn(['password', 'sendTokenEmail']),
    error: state.getIn(['password', 'sendTokenError']),
    isPending: state.getIn(['password', 'sendTokenPending']),
});


@injectIntl
@connect(mapStateToProps)
export default class LostPasswordPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: ''
        }
    }

    render() {
        let content, errorMessage = null;
        let error = this.props.error;

        if (error) {
            let type = 'undefined';
            switch (error.httpStatus) {
                case 404:
                    type = 'unknownUser';
                    break;
            }

            errorMessage = (
                <p className="LostPasswordPage-error">
                    <Msg id={ 'pages.lostPassword.errors.' + type }/>
                </p>
            );
        }

        if (this.props.isPending) {
            content = (
                <LoadingIndicator/>
            );
        }
        else if (this.props.email) {
            content = (
                <div>
                    <Msg tagName="p" id="pages.lostPassword.after.p"
                        values={{ email: this.props.email }}/>
                    <Button labelMsg="pages.lostPassword.after.retryButton"
                        href="/lost-password"
                        onClick={ this.onClickRetry.bind(this) }/>
                </div>
            );
        }
        else {
            let submitLabel = this.props.intl.formatMessage(
                { id: 'pages.lostPassword.before.submitButton' });

            content = (
                <div>
                    <Msg tagName="p" id="pages.lostPassword.before.p"/>
                    { errorMessage }
                    <form method="post" onSubmit={ this.onSubmit.bind(this) }>
                        <input type="email" name="email"
                            value={ this.state.email }
                            onChange={ this.onChangeEmail.bind(this) }/>

                        <input type="submit" value={ submitLabel }/>
                    </form>
                </div>
            );
        }

        return (
            <div className="LostPasswordPage">
                <Msg tagName="h1" id="pages.lostPassword.h"/>
                { content }
            </div>
        );
    }

    onChangeEmail(ev) {
        this.setState({
            email: ev.target.value
        });
    }

    onSubmit(ev) {
        ev.preventDefault();

        this.props.dispatch(sendPasswordResetToken(this.state.email));
    }

    onClickRetry(ev) {
        ev.preventDefault();
        this.props.dispatch(clearLostPasswordState());
    }
}
