import { connect } from 'react-redux';
import cx from 'classnames';
import { FormattedMessage as Msg } from 'react-intl';
import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router';

import { register } from '../../../actions/register';


const mapStateToProps = state => ({
    register: state.get('register'),
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
        else if (this.props.showForm) {
            let msg = (id, values) => this.props.intl.formatMessage({
                id: 'pages.landing.splash.form.' + id }, values);

            let error = store.get('error');
            let errorMessage;
            if (error) {
                if (error.httpStatus == 409) {
                    let values = store.get('data').toJS();

                    errorMessage = (
                        <Msg className="SignUpSplash-error"
                            id="pages.landing.splash.form.error.exists"
                            values={ values }/>
                    );
                }
            }

            content = (
                <form method="post"
                    className="SignUpSplash-form"
                    onSubmit={ this.onSubmit.bind(this) }>
                    <Msg tagName="h1" id="pages.landing.splash.form.h1"/>
                    { errorMessage }
                    <input name="fn" placeholder={ msg('firstName') }/>
                    <input name="ln" placeholder={ msg('lastName') }/>
                    <input name="email" placeholder={ msg('email') }/>
                    <input name="password" placeholder={ msg('password') }/>
                    <input type="submit" value={ msg('submitButton') }/>
                </form>
            );
        }
        else {
            content = [
                <Msg key="h1" tagName="h1" id="pages.landing.splash.h1"/>,
                <Msg key="h2" tagName="h2" id="pages.landing.splash.h2"/>,
                <Link key="signUpLink" to="/register">
                    <Msg id="pages.landing.splash.signUpLink"/></Link>,
                <Link key="infoLink" to="/info">
                    <Msg id="pages.landing.splash.infoLink"/></Link>,
                <div key="caption" className="SignUpSplash-imageCaption">
                    <Msg tagName="p" id="pages.landing.splash.caption"/>
                </div>,
            ];
        }

        let classes = cx('SignUpSplash', {
            'SignUpSplash-withForm': this.props.showForm,
        });

        return (
            <div className={ classes }>
                { content }
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
