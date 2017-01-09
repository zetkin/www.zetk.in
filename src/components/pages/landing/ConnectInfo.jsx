import { FormattedMessage as Msg, injectIntl } from 'react-intl';
import React from 'react';

import FormattedLink from '../../../common/misc/FormattedLink';


@injectIntl
export default class ConnectInfo extends React.Component {
    render() {
        let applyHref = this.props.intl.formatMessage(
            { id: 'pages.landing.connect.applyLink.href' });

        return (
            <section className="ConnectInfo">
                <Msg id="pages.landing.connect.h1" tagName="h2"/>
                <Msg id="pages.landing.connect.h2" tagName="h3"/>
                <Msg id="pages.landing.connect.paragraph" tagName="p"/>
                <FormattedLink href={ applyHref }
                    msgId="pages.landing.connect.applyLink.text"/>
            </section>
        );
    }
}
