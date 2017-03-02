import cx from 'classnames';
import React from 'react';
import { FormattedMessage as Msg, injectIntl } from 'react-intl';

import FormattedLink from '../../common/misc/FormattedLink';


@injectIntl
export default class HelpBubble extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
        };
    }

    componentDidMount() {
        // Open after half a second
        setTimeout(() => {
            this.setState({
                expanded: true,
            });
        }, 500);

        // Close again after eight more seconds
        setTimeout(() => {
            this.setState({
                expanded: false,
            });
        }, 8500);
    }

    render() {
        let classes = cx('HelpBubble', {
            expanded: this.state.expanded,
        });

        let p = this.props.intl.formatMessage({ id: 'misc.helpBubble.p' });
        let docsHref = this.props.intl.formatMessage(
            { id: 'misc.helpBubble.docsButton.href' });

        return (
            <div className={ classes }>
                <div className="HelpBubble-content">
                    <Msg tag="h2" id="misc.helpBubble.h"/>
                    <p dangerouslySetInnerHTML={{ __html: p }}/>
                    <div className="HelpBubble-buttons">
                        <FormattedLink className="HelpBubble-closeButton"
                            msgId="misc.helpBubble.closeButton"
                            onClick={ this.onCloseClick.bind(this) }
                            />
                        <FormattedLink className="HelpBubble-docsButton"
                            msgId="misc.helpBubble.docsButton.text"
                            href={ docsHref } target="_blank"
                            />
                    </div>
                </div>
            </div>
        );
    }

    onCloseClick() {
        // TODO: Close and store in cookie
    }
}
