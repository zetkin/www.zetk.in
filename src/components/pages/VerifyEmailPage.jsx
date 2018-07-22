import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as Msg } from 'react-intl';

import SimplePageBase from './SimplePageBase';


const mapStateToProps = state => ({
    user: state.get('user'),
});

@injectIntl
@connect(mapStateToProps)
export default class VerifyEmailPage extends SimplePageBase {
    constructor(props) {
        super(props);
    }

    renderContent() {
        const buttonLabel = this.props.intl.formatMessage(
            { id: 'pages.verify.resendButton' });

        const resendForm = (
            <form key="form" method="post" action="/verify/resend">
                <input type="submit" name="submitButton"
                    value={ buttonLabel }
                    />
            </form>
        );

        if (this.props.routeParams.code == 'resend') {
            // The code was resent by user demand
            return [
                <Msg key="h1" tagName="h1" id="pages.verify.resend.h1"/>,
                <Msg key="p" tagName="p" id="pages.verify.resend.p"/>,
            ];
        }
        else if (this.props.routeParams.code) {
            // If we made it here, that's because of an error, e.g. because the
            // code is missing or because it was invalid
            return [
                <Msg key="h1" tagName="h1" id="pages.verify.invalid.h1"/>,
                <Msg key="p" tagName="p" id="pages.verify.invalid.p"/>,
                resendForm,
            ];
        }
        else {
            // Code is missing
            return [
                <Msg key="h1" tagName="h1" id="pages.verify.missing.h1"/>,
                <Msg key="p0" tagName="p" id="pages.verify.missing.p0"/>,
                <Msg key="p1" tagName="p" id="pages.verify.missing.p1"/>,
                resendForm,
            ];
        }
    }
}
