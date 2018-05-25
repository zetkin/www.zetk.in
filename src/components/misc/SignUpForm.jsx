import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { register } from '../../actions/register';

import LoadingIndicator from "../../common/misc/LoadingIndicator";

const mapStateToProps = state => ({
    register: state.get('register'),
});

@connect(mapStateToProps)
@injectIntl
export default class SignUpForm extends React.Component {
    static propTypes = {
        orgId: React.PropTypes.number
    };

    constructor() {
        super();
        this.state = {
            privacyChecked: false
        }
    }
    
    onSubmit(ev){
        ev.preventDefault();
        console.log('submit');

        this.props.dispatch(register(
            ev.target.fn.value,
            ev.target.ln.value,
            ev.target.email.value,
            ev.target.password.value,
            this.props.orgId,
        ));
    }

    togglePrivacyCheck() {
        this.setState({privacyChecked: !this.state.privacyChecked})
    }

    renderComplete(intl, register, msg){
        const values = register.get('data').toJS();

        return(
            <div className="SignUpForm-done">
                <h2 className="SignUpForm-title">{ msg('done.title', values) }</h2>
                <p className="SignUpForm-subtitle">{ msg('done.subtitle') }</p>
            </div>
        );
    }

    renderForm(intl, register, msg){
        const { privacyChecked } = this.state;
        const error = register.get('error');
        let errorEl;
        const buttonLabel = this.props.orgId ? msg('submitButtonOrg') : msg('submitButton');
        let submitButton = (
            <input className="SignUpForm-submitButton"
                type="submit"
                value={ buttonLabel }
                disabled={!privacyChecked}/>
        );

        if (register.get('isPending')) {
            submitButton = <LoadingIndicator/>
        }

        if (error) {
            let errorMessage

            if (error.httpStatus == 409) {
                const values = register.get('data').toJS();
                errorMessage = msg('error.exists', values);
            }
            else if (error.httpStatus == 400) {
                errorMessage = msg('error.invalid')
            }

            errorEl = (
                <div className="SignUpForm-error">
                    { errorMessage }
                </div>
            );
        }
        return (
            <form method="post"
                className="SignUpForm"
                onSubmit={ this.onSubmit.bind(this) }>
                <h2 className="SignUpForm-title">{ msg('title') }</h2>
                { errorEl }
                <label className="SignUpForm-hiddenLabel" htmlFor="fn">{ msg('firstName') }</label>
                <input className="SignUpForm-textInput" name="fn" placeholder={ msg('firstName') }/>

                <label className="SignUpForm-hiddenLabel" htmlFor="ln">{ msg('lastName') }</label>
                <input className="SignUpForm-textInput" name="ln" placeholder={ msg('lastName') }/>

                <label className="SignUpForm-hiddenLabel" htmlFor="email">{ msg('email') }</label>
                <input className="SignUpForm-textInput" name="email" placeholder={ msg('email') }/>

                <label className="SignUpForm-hiddenLabel" htmlFor="password">{ msg('password') }</label>
                <input className="SignUpForm-textInput"
                    type="password"
                    name="password"
                    placeholder={ msg('password') }/>

                <input className="SignUpForm-checkbox"
                    name="privacy"
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    checked={privacyChecked}
                    onChange={this.togglePrivacyCheck.bind(this)}/>
                <label className="SignUpForm-checkboxLabel" htmlFor="privacy">{ msg('privacyCheck') }</label>
                <a className="SignUpForm-privacyLink" href="http://zetkin.org/privacy">{ msg('privacyLink') }</a>

                { submitButton }
            </form>
        )
    }

    render(){
        const { intl, register } = this.props;
        const msg = (id, values) => intl.formatMessage({
            id: 'misc.signup.' + id }, values);

        if (register.get('isComplete')) {
            return this.renderComplete(intl, register, msg);
        }
        return this.renderForm(intl, register, msg);
    }
}
