import { connect } from 'react-redux';
import cx from 'classnames';
import { FormattedMessage as Msg, injectIntl } from 'react-intl';
import React from 'react';

import { register } from '../../../actions/register';
import FormattedLink from '../../../common/misc/FormattedLink';


const mapStateToProps = state => ({
    register: state.get('register'),
    user: state.get('user'),
});

@connect(mapStateToProps)
@injectIntl
export default class SignUpSplash extends React.Component {
    static propTypes = {
        showForm: React.PropTypes.bool,
        onSignUp: React.PropTypes.func,
    };

    render() {
        let store = this.props.register;
        let content;

        if (this.props.showForm && store.get('isComplete')) {
            let values = store.get('data').toJS();

            content = (
                <div className="SignUpSplash-done">
                    <Msg tagName="h1" id="pages.landing.splash.done.h1"
                        values={ values }/>
                    <Msg tagName="h2" id="pages.landing.splash.done.h2"
                        values={ values }/>
                </div>
            );
        }
        else if (this.props.showForm && this.props.user.get('data')) {
            let domain = process.env.ZETKIN_DOMAIN;
            let userData = this.props.user.get('data');
            let firstName = userData.get('first_name');
            let lastName = userData.get('last_name');
            let userId = this.props.user.getIn(['data', 'id']);
            let avatarDomain = '//api.' + domain;
            let logoutUrl = '//www.' + domain + '/logout';
            let avatarSrc = avatarDomain + '/v1/users/' + userId + '/avatar';
            let avatarStyle = {backgroundImage: 'url("' + avatarSrc + '")'}

            // Trying to register while already logged in
            content = (
                <div className="SignUpSplash-authenticated">
                    <div className="SignUpSplash-avatar"
                        style={ avatarStyle }/>
                    <Msg tagName="h1"
                        id="pages.landing.splash.authenticated.h1"
                        values={{ firstName, lastName }}/>
                    <Msg tagName="p"
                        id="pages.landing.splash.authenticated.p"/>
                    <FormattedLink href="/"
                        className="SignUpSplash-cancelLink"
                        msgId="pages.landing.splash.authenticated.cancelLink"/>
                    <FormattedLink href={ logoutUrl }
                        className="SignUpSplash-logoutLink"
                        msgId="pages.landing.splash.authenticated.logoutLink"/>
                </div>
            );
        }
        else if (this.props.showForm) {
            let msg = (id, values) => this.props.intl.formatMessage({
                id: 'pages.landing.splash.form.' + id }, values);

            let error = store.get('error');
            let errorMessage;
            if (error) {
                if (error.httpStatus == 409) {
                    let values = store.get('data').toJS();

                    errorMessage = (
                        <div className="SignUpSplash-error">
                            <Msg id="pages.landing.splash.form.error.exists"
                            values={ values }/>
                        </div>
                    );
                }
                else if (error.httpStatus == 400) {
                    errorMessage = (
                        <div className="SignUpSplash-error">
                            <Msg id="pages.landing.splash.form.error.invalid"/>
                        </div>
                    );
                }
            }

            content = (
                <form method="post"
                    className="SignUpSplash-form"
                    onSubmit={ this.onSubmit.bind(this) }>
                    <Msg tagName="h1" id="pages.landing.splash.form.h1"/>
                    { errorMessage }
                    <label htmlFor="fn">{ msg('firstName') }</label>
                    <input name="fn" placeholder={ msg('firstName') }/>
                    <label htmlFor="ln">{ msg('lastName') }</label>
                    <input name="ln" placeholder={ msg('lastName') }/>
                    <label htmlFor="email">{ msg('email') }</label>
                    <input name="email" placeholder={ msg('email') }/>
                    <label htmlFor="password">{ msg('password') }</label>
                    <input type="password" name="password"
                        placeholder={ msg('password') }/>
                    <input type="submit" value={ msg('submitButton') }/>
                </form>
            );
        }
        else {
            let infoHref = this.props.intl.formatMessage(
                { id: 'pages.landing.splash.infoLink.href' });

            content = [
                <Msg key="h1" tagName="h1" id="pages.landing.splash.h1"/>,
                <Msg key="h2" tagName="h2" id="pages.landing.splash.h2"/>,
                <div key="actions" className="SignUpSplash-actions">
                    <FormattedLink href="/register"
                        msgId="pages.landing.splash.signUpLink"/>
                    <FormattedLink href={ infoHref }
                        msgId="pages.landing.splash.infoLink.text"/>
                </div>,
            ];
        }

        let classes = cx('SignUpSplash', {
            'SignUpSplash-withForm': this.props.showForm,
        });

        return (
            <div className={ classes }>
                <div className="SignUpSplash-content">
                    { content }
                </div>
                <div key="caption" className="SignUpSplash-imageCaption">
                    <Msg tagName="p" id="pages.landing.splash.caption"/>
                </div>
            </div>
        );
    }

    onSubmit(ev) {
        ev.preventDefault();

        this.props.dispatch(register(
            ev.target.fn.value,
            ev.target.ln.value,
            ev.target.email.value,
            ev.target.password.value,
        ));
    }
}
