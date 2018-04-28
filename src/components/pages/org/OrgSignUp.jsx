import { connect } from 'react-redux';
import cx from 'classnames';
import { FormattedMessage as Msg, injectIntl } from 'react-intl';
import React from 'react';

import { register } from '../../../actions/register';

const mapStateToProps = state => ({
    register: state.get('register'),
    user: state.get('user'),
});

@connect(mapStateToProps)
@injectIntl
export default class OrgSignUp extends React.Component {
    static propTypes = {
        onSignUp: React.PropTypes.func,
    };

    render() {
        let store = this.props.register;
        let content;

        if (store.get('isComplete')) {
            let values = store.get('data').toJS();

            content = (
                <div className="OrgSignUp-done">
                    <Msg tagName="h2" id="pages.orgPage.signup.done.title"
                        values={ values }/>
                    <Msg tagName="h3" id="pages.orgPage.signup.done.subtitle"
                        values={ values }/>
                </div>
            );
        }
        else {
            const msg = (id, values) => this.props.intl.formatMessage({
                id: 'pages.orgPage.signup.' + id }, values);
    
            const error = store.get('error');
            let errorMessage;
            if (error) {
                if (error.httpStatus == 409) {
                    const values = store.get('data').toJS();
    
                    errorMessage = (
                        <div className="OrgSignUp-error">
                            <Msg id="pages.orgPage.signup.error.exists"
                            values={ values }/>
                        </div>
                    );
                }
                else if (error.httpStatus == 400) {
                    errorMessage = (
                        <div className="OrgSignUp-error">
                            <Msg id="pages.orgPage.signup.error.invalid"/>
                        </div>
                    );
                }
            }

            content = (
                <form method="post"
                className="OrgSignUp-form"
                onSubmit={ this.onSubmit.bind(this) }>
                    <Msg tagName="h2" id="pages.orgPage.signup.h1"/>
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



        return (
            <div className="OrgSignUp">
                {content}
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
            this.props.orgItem.get('id'),
        ));
    }
}
