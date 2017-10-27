import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

import SimplePageBase from './SimplePageBase';


const mapStateToProps = state => ({
    user: state.get('user'),
});

@connect(mapStateToProps)
export default class VerifyEmailPage extends SimplePageBase {
    constructor(props) {
        super(props);
    }

    renderContent() {
        if (this.props.routeParams.code) {
            return [
                <Msg key="h1" tagName="h1" id="pages.verify.error.h1"/>,
                <Msg key="p" tagName="p" id="pages.verify.error.p"/>,
            ];
        }
        else {
            return [
                <Msg key="h1" tagName="h1" id="pages.verify.info.h1"/>,
                <Msg key="p0" tagName="p" id="pages.verify.info.p0"/>,
                <Msg key="p1" tagName="p" id="pages.verify.info.p1"/>,
            ];
        }
    }
}
