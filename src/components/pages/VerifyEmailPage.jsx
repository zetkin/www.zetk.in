import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg, injectIntl } from 'react-intl';

import SimplePageBase from './SimplePageBase';


const mapStateToProps = state => ({
    user: state.get('user'),
});

@connect(mapStateToProps)
@injectIntl
export default class VerifyEmailPage extends SimplePageBase {
    constructor(props) {
        super(props);
    }

    renderContent() {
        let formatMsg = this.props.intl.formatMessage;
        let buttonLabel = formatMsg({ id: 'pages.verify.submitButton' });

        return (
            <div className="VerifyEmailPage">
                <Msg tagName="h1" id="pages.verify.h1"/>
                <Msg tagName="p" id="pages.verify.p0"/>
                <Msg tagName="p" id="pages.verify.p1"/>
                <form method="post">
                    <textarea name="code"
                        placeholder="abc123de45fg67h8jkl901"/>
                    <input type="submit" value={ buttonLabel }/>
                </form>
            </div>
        );
    }
}
