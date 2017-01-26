import { FormattedMessage as Msg, injectIntl } from 'react-intl';
import React from 'react';

import FormattedLink from '../../../common/misc/FormattedLink';


@injectIntl
export default class FoundationIntro extends React.Component {
    render() {
        let infoHref = this.props.intl.formatMessage(
            { id: 'pages.landing.foundation.infoLink.href' });

        return (
            <div className="FoundationIntro">
                <Msg id="pages.landing.foundation.h1" tagName="h2"/>
                <Msg id="pages.landing.foundation.h2" tagName="h3"/>
                <Msg id="pages.landing.foundation.paragraph" tagName="p"/>
                <FormattedLink href={ infoHref }
                    msgId="pages.landing.foundation.infoLink.text"/>
            </div>
        );
    }
}
