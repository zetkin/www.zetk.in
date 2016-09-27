import { FormattedMessage as Msg } from 'react-intl';
import React from 'react';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router';


@injectIntl
export default class SignUpSplash extends React.Component {
    render() {
        let content;

        if (this.props.showForm) {
            let msg = id => this.props.intl.formatMessage({
                id: 'pages.landing.splash.form.' + id });

            content = (
                <form method="post"
                    className="SignUpSplash-form"
                    onSubmit={ this.onSubmit.bind(this) }>
                    <Msg tagName="h1" id="pages.landing.splash.form.h1"/>
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

        return (
            <div className="SignUpSplash">
                { content }
            </div>
        );
    }

    onSubmit(ev) {
        ev.preventDefault();

        let data = {
            first_name: ev.target.fn.value,
            last_name: ev.target.ln.value,
            email: ev.target.email.value,
            password: ev.target.password.value,
        };

        // TODO: Submit to API
        console.log(data);
    }
}
