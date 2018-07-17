import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import cx from 'classnames';
import ImPropTypes from 'react-immutable-proptypes';

import { register } from '../../actions/register';

import LoadingIndicator from "../../common/misc/LoadingIndicator";

const mapStateToProps = state => ({
    register: state.get('register'),
});

@connect(mapStateToProps)
@injectIntl
export default class SignUpForm extends React.Component {
    static propTypes = {
        orgItem: ImPropTypes.map
    };

    constructor(props) {
        super(props);

        this.state = {
            firstName: props.register.getIn(['errorMeta', 'firstName']) || '',
            lastName: props.register.getIn(['errorMeta', 'lastName']) || '',
            email: props.register.getIn(['errorMeta', 'email']) || '',
            phone: props.register.getIn(['errorMeta', 'phone']) || '',
            privacyChecked: true
        };
    }

    componentDidMount() {
        this.setState({
            privacyChecked: false,
            focused: false,
        });
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
        const { orgItem } = this.props;
        const { privacyChecked } = this.state;
        const error = register.get('error');
        let errorEl;
        const buttonLabel = orgItem ? msg('submitButtonOrg') : msg('submitButton');
        const privacyLabel = orgItem  ? msg('privacyCheckOrg', {org: orgItem.get("title")}) : msg('privacyCheck');

        if (error) {
            let errorMessage
            let errorAction

            if (error == 'privacy') {
                errorMessage = msg('error.privacy');
            }
            else if (error.get('httpStatus') == 409) {
                const values = register.get('data').toJS();
                errorMessage = msg('error.exists', values);
                errorAction = (
                    <a className="SignUpForm-errorAction"
                        href="/dashboard">
                        { msg('error.login') }
                        </a>
                    );
            }
            else if (error.get('httpStatus') == 400) {
                errorMessage = msg('error.invalid')
            }

            errorEl = (
                <div className="SignUpForm-error">
                    <div className="SignUpForm-errorMessage">
                        { errorMessage }
                    </div>
                    { errorAction }
                </div>
            );
        }

        let classes = cx('SignUpForm', {
            'focused': this.state.focused,
        });

        if (register.get('isPending')) {
            return <LoadingIndicator/>;
        }
        else {
            return (
            <form method="post"
                className={ classes }
                onSubmit={ this.onSubmit.bind(this) }
                onFocus={ this.onFocus.bind(this) }>
                <h2 className="SignUpForm-title">{ msg('title') }</h2>
                { errorEl }

                <label className="SignUpForm-hiddenLabel" htmlFor="email">{ msg('email') }</label>
                <input className="SignUpForm-textInput" name="email"
                    defaultValue={ this.state.email }
                    placeholder={ msg('email') }
                    autoComplete="off"/>

                <div className="SignUpForm-extraFields">
                <label className="SignUpForm-hiddenLabel" htmlFor="fn">{ msg('firstName') }</label>
                <input className="SignUpForm-textInput" name="fn"
                    defaultValue={ this.state.firstName }
                    placeholder={ msg('firstName') }/>

                <label className="SignUpForm-hiddenLabel" htmlFor="ln">{ msg('lastName') }</label>
                <input className="SignUpForm-textInput" name="ln"
                    defaultValue={ this.state.lastName }
                    placeholder={ msg('lastName') }/>

                <label className="SignUpForm-hiddenLabel" htmlFor="phone">{ msg('phone') }</label>
                <input className="SignUpForm-textInput" name="phone"
                    defaultValue={ this.state.phone }
                    placeholder={ msg('phone') }/>

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
                    onChange={ this.onPrivacyChange.bind(this) }
                    />

                <label className="SignUpForm-checkboxLabel" htmlFor="privacy">{ privacyLabel }</label>
                <a className="SignUpForm-privacyLink" href={ msg('privacyLink.href') }>{ msg('privacyLink.title') }</a>
                </div>
                <input className="SignUpForm-submitButton"
                    type="submit"
                    value={ buttonLabel }
                    disabled={!privacyChecked}/>
            </form>
        )
        }

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

    onPrivacyChange(ev) {
        this.setState({
            privacyChecked: ev.target.checked,
        })
    }

    onFocus(ev) {
        this.setState({
            focused: !this.props.focused,
        })
    }

    onSubmit(ev){
        ev.preventDefault();
        let orgId = this.props.orgItem ? this.props.orgItem.get("id") : null;

        this.props.dispatch(register(
            ev.target.fn.value,
            ev.target.ln.value,
            ev.target.email.value,
            ev.target.phone.value,
            ev.target.password.value,
            orgId,
        ));
    }
}
