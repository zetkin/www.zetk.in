import React from 'react';
import { FormattedMessage as Msg, injectIntl } from 'react-intl';

import FormattedLink from '../common/misc/FormattedLink';


@injectIntl
export default class Footer extends React.Component {
    render() {
        let zfHref = this.props.intl
            .formatMessage({ id: 'footer.links.foundationLink.href' });

        let manualHref = this.props.intl
            .formatMessage({ id: 'footer.links.manualLink.href' });

        let privacyHref = this.props.intl
            .formatMessage({ id: 'footer.links.privacyLink.href' });

        return (
            <div className="Footer">
                <Msg tagName="p" id="footer.summary"/>
                <p>
                    <a href={ zfHref }>
                        <img className="Footer-logo"
                            alt="Zetkin Foundation"
                            src="/static/images/zf-logo-black.png"
                            />
                    </a>
                </p>
                <p className="Footer-links">
                    <FormattedLink href={ zfHref }
                        msgId="footer.links.foundationLink.text"/>
                    <FormattedLink href={ manualHref }
                        msgId="footer.links.manualLink.text"/>
                    <FormattedLink href={ manualHref }
                        msgId="footer.links.privacyLink.text"/>
                </p>
            </div>
        );
    }
}
