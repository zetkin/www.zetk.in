import React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import cx from 'classnames';
import ImPropTypes from 'react-immutable-proptypes';

import { register } from '../../actions/register';

import LoadingIndicator from "../../common/misc/LoadingIndicator";

const countryCodes = {
    AD: 376, AE: 971, AF: 93, AL: 355, AM: 374, AO: 244, AR: 54, AT: 43, AU: 61,
    AW: 297, AZ: 994, BA: 387, BD: 880, BE: 32, BF: 226, BG: 359, BH: 973,
    BI: 257, BJ: 229, BL: 590, BN: 673, BO: 591, BQ: 599, BR: 55, BT: 975,
    BW: 267, BY: 375, BZ: 501, CA: 1, CC: 61, CD: 243, CF: 236, CG: 242, CH: 41,
    CI: 225, CK: 682, CL: 56, CM: 237, CN: 86, CO: 57, CR: 506, CU: 53, CV: 238,
    CW: 599, CX: 61, CY: 357, CZ: 420, DE: 49, DJ: 253, DK: 45, DZ: 213,
    EC: 593, EE: 372, EG: 20, EH: 212, ER: 291, ES: 34, ET: 251, FI: 358,
    FJ: 679, FK: 500, FM: 691, FO: 298, FR: 33, GA: 241, GB: 44, GE: 995,
    GF: 594, GH: 233, GI: 350, GL: 299, GM: 220, GN: 224, GP: 590, GQ: 240,
    GR: 30, GT: 502, GW: 245, GY: 592, HK: 852, HN: 504, HR: 385, HT: 509,
    HU: 36, ID: 62, IE: 353, IL: 972, IN: 91, IO: 246, IQ: 964, IR: 98,
    IS: 354, IT: 39, JO: 962, JP: 81, KE: 254, KG: 996, KH: 855, KI: 686,
    KM: 269, KP: 850, KR: 82, KW: 965, KZ: 7, LA: 856, LB: 961, LI: 423,
    LK: 94, LR: 231, LS: 266, LT: 370, LU: 352, LV: 371, LY: 218, MA: 212,
    MC: 377, MD: 373, ME: 382, MF: 590, MG: 261, MH: 692, MK: 389, ML: 223,
    MM: 95, MN: 976, MO: 853, MQ: 596, MR: 222, MT: 356, MU: 230, MV: 960,
    MW: 265, MX: 52, MY: 60, MZ: 258, NA: 264, NC: 687, NE: 227, NF: 672,
    NG: 234, NI: 505, NL: 31, NO: 47, NP: 977, NR: 674, NU: 683, NZ: 64,
    OM: 968, PA: 507, PE: 51, PF: 689, PG: 675, PH: 63, PK: 92, PL: 48, PM: 508,
    PN: 870, PS: 970, PT: 351, PW: 680, PY: 595, QA: 974, RE: 262, RO: 40,
    RS: 381, RU: 7, RW: 250, SA: 966, SB: 677, SC: 248, SD: 249, SE: 46, SG: 65,
    SH: 290, SI: 386, SJ: 47, SK: 421, SL: 232, SM: 378, SN: 221, SO: 252,
    SR: 597, SS: 211, ST: 239, SV: 503, SX: 599, SY: 963, SZ: 268, TD: 235,
    TG: 228, TH: 66, TJ: 992, TK: 690, TL: 670, TM: 993, TN: 216, TO: 676,
    TR: 90, TV: 688, TW: 886, TZ: 255, UA: 380, UG: 256, UM: 1, US: 1, UY: 598,
    UZ: 998, VA: 379, VE: 58, VN: 84, VU: 678, WF: 681, WS: 685, YE: 967,
    YT: 262, ZA: 27, ZM: 260, ZW: 263,
};

const mapStateToProps = state => ({
    register: state.get('register'),
});

@connect(mapStateToProps)
@injectIntl
export default class SignUpForm extends React.Component {
    static propTypes = {
        formAction: React.PropTypes.string,
        orgItem: ImPropTypes.map
    };

    constructor(props) {
        super(props);

        this.state = {
            firstName: props.register.getIn(['errorMeta', 'firstName']) || '',
            lastName: props.register.getIn(['errorMeta', 'lastName']) || '',
            email: props.register.getIn(['errorMeta', 'email']) || '',
            phone: props.register.getIn(['errorMeta', 'phone']) || '+',
            password: '',
            privacyChecked: true
        };
    }

    componentDidMount() {
        this.setState({
            withJavascript: true,
            privacyChecked: false,
            focused: false,
            phone: this.state.phone === '+' ? '' : this.state.phone,
        });
    }

    componentWillReceiveProps(nextProps) {
        const cr = this.props.register;
        const nr = nextProps.register;

        if (cr.get('isPending') && !nr.get('isPending') && nr.get('errorMeta')) {
            this.setState({
                firstName: nr.getIn(['errorMeta', 'firstName']) || '',
                lastName: nr.getIn(['errorMeta', 'lastName']) || '',
                email: nr.getIn(['errorMeta', 'email']) || '',
                phone: nr.getIn(['errorMeta', 'phone']) || '',
            });
        }
    }

    renderComplete(intl, register, msg){
        const values = register.get('data').toJS();

        return(
            <div className="SignUpForm-done">
                <h2 className="SignUpForm-title">
                    { msg('done.title', values) }</h2>
                <p className="SignUpForm-subtitle">
                    { msg('done.subtitle') }</p>
            </div>
        );
    }

    renderForm(intl, register, msg){
        const { orgItem } = this.props;
        const { privacyChecked } = this.state;
        const error = register.get('error');
        let errorEl;
        const buttonLabel = orgItem ?
            msg('submitButtonOrg') : msg('submitButton');
        const privacyLabel = orgItem  ?
            msg('privacyCheckOrg', {org: orgItem.get("title")}) :
            msg('privacyCheck');

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
            'withJavascript': this.state.withJavascript,
        });

        if (register.get('isPending')) {
            return <LoadingIndicator/>;
        }
        else {
            return (
            <form method="post" action={ this.props.formAction || '' }
                className={ classes }
                onSubmit={ this.onSubmit.bind(this) }
                onFocus={ this.onFormFocus.bind(this) }>
                <h2 className="SignUpForm-title">{ msg('title') }</h2>
                <p className="SignUpForm-info">{ msg('info') }</p>
                { errorEl }

                <div className="SignUpForm-textBox">
                    <label className="SignUpForm-hiddenLabel" htmlFor="email">
                        { msg('email') }</label>
                    <input className="SignUpForm-textInput" name="email"
                        placeholder={ msg('email') }
                        autoComplete="off"
                        value={ this.state.email }
                        onChange={ e => this.onChange('email', e) }/>
                </div>

                <div className="SignUpForm-extraFields">
                    <div className="SignUpForm-textBox">
                    <label className="SignUpForm-hiddenLabel" htmlFor="fn">
                        { msg('firstName') }</label>
                    <input className="SignUpForm-textInput" name="fn"
                        value={ this.state.firstName }
                        placeholder={ msg('firstName') }
                        onChange={ e => this.onChange('firstName', e) }/>
                </div>

                <div className="SignUpForm-textBox">
                    <label className="SignUpForm-hiddenLabel" htmlFor="ln">
                        { msg('lastName') }</label>
                    <input className="SignUpForm-textInput" name="ln"
                        value={ this.state.lastName }
                        placeholder={ msg('lastName') }
                        onChange={ e => this.onChange('lastName', e) }/>
                </div>

                <div className="SignUpForm-textBox">
                    <label className="SignUpForm-hiddenLabel" htmlFor="phone">
                        { msg('phone') }</label>
                    <input className="SignUpForm-textInput" name="phone"
                        type="tel"
                        placeholder={ msg('phone') }
                        value={ this.state.phone }
                        onFocus={ this.onPhoneFocus.bind(this) }
                        onBlur={ this.onPhoneBlur.bind(this) }
                        onChange={ e => this.onChange('phone', e) }/>
                </div>

                <div className="SignUpForm-textBox">
                    <label className="SignUpForm-hiddenLabel" htmlFor="password">
                        { msg('password') }</label>
                    <input className="SignUpForm-textInput" name="password"
                        type="password"
                        placeholder={ msg('password') }
                        onChange={ e => this.onChange('password', e) }/>
                </div>

                <input className="SignUpForm-checkbox"
                    name="privacy"
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    onChange={ e => this.onChange('privacy', e) }
                    />

                <label className="SignUpForm-checkboxLabel" htmlFor="privacy">
                    { privacyLabel }</label>
                <a className="SignUpForm-privacyLink" href=
                    { msg('privacyLink.href') }>
                        { msg('privacyLink.title') }</a>
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

    onFormFocus(ev) {
        this.setState({
            focused: true,
        })
    }

    onPhoneFocus(ev) {
        let { phone } = this.state;

        if (phone) {
            return;
        }

        this.setState({
            phone: this.defaultPhonePrefix(),
        });
    }
    onPhoneBlur(ev) {
        let { phone } = this.state;

        if (phone === '+' || phone === this.defaultPhonePrefix()) {
            this.setState({
                phone: '',
            });
        }
    }

    onChange(name, event) {
        let key = name;
        let value = event.target.value;

        if (name === 'phone') {
            value = this.cleanPhone(value)
        } else if (name === 'privacy') {
            key = 'privacyChecked';
            value = event.target.checked;
        }

        this.setState({
            [key]: value,
        })
    }

    onSubmit(ev){
        ev.preventDefault();
        let orgId = this.props.orgItem ? this.props.orgItem.get("id") : null;

        let phone = this.state.phone;

        if (phone === this.defaultPhonePrefix()) {
            phone = '';
        }

        this.props.dispatch(register(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            phone,
            this.state.password,
            orgId,
        ));
    }

    defaultPhonePrefix() {
        let prefix = '+';

        const orgItem = this.props.orgItem;
        if (orgItem) {
            const country = orgItem.get('country');
            const countryCode = countryCodes[country];

            if (countryCode) {
                prefix += countryCode;
            }
        }

        return prefix;
    }

    cleanPhone(value) {
        value = value || '';

        const startsWithZero = /^0/.test(value);

        // remove non-numbers
        value = (value.match(/\d/g) || []).join('')

        // remove leading zeroes
        value = value.replace(/^0+/, '')

        // add prefix
        if (startsWithZero) {
            value = this.defaultPhonePrefix() + value;
        } else {
            value = '+' + value
        }

        return value;
    }
}
