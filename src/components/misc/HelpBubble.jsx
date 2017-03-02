import cx from 'classnames';
import React from 'react';
import { FormattedMessage as Msg, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import FormattedLink from '../../common/misc/FormattedLink';
import { setHelpSeen, setHelpDismissed } from '../../actions/help';


const mapStateToProps = state => ({
    seen: state.getIn(['help', 'seen']),
    dismissed: state.getIn(['help', 'dismissed']),
});

@injectIntl
@connect(mapStateToProps)
export default class HelpBubble extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            dismissing: false,
        };
    }

    componentDidMount() {
        if (!this.props.seen) {
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

                this.props.dispatch(setHelpSeen());
            }, 8500);
        }
    }

    render() {
        if (this.props.dismissed) {
            return null;
        }

        let classes = cx('HelpBubble', {
            dismissing: this.state.dismissing,
            expanded: !this.state.dismissing && this.state.expanded,
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
        // A very simple dismiss animation is implemented
        // in CSS using the .dismissing class.
        this.setState({
            dismissing: true,
        });

        setTimeout(() => {
            this.props.dispatch(setHelpDismissed());
        }, 200);
    }
}
