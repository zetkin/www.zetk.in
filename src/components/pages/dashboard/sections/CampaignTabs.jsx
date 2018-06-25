import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as Msg } from 'react-intl';
import cx from 'classnames';

@injectIntl
export default class CampaignTabs extends React.Component {
    static propTypes = {
        tabs: React.PropTypes.object.isRequired,
        selected: React.PropTypes.string.isRequired,
        onSelect: React.PropTypes.func
    };

    render() {
        const tabs = this.props.tabs;
        const tabNames = Object.keys(this.props.tabs);

        const formatMessage = this.props.intl.formatMessage;

        return (
            <div className="CampaignTabs"
                key="tabs">
                <ul>
                    {tabNames.map(function(tab) {
                        const label = formatMessage({ id: tabs[tab] });
                        const classes = cx('CampaignTabs-' + tab, {
                            'active': (tab == this.props.selected)
                        });
                        return <li key={ tab } className={ classes }
                            onClick={ this.onTabClick.bind(this, tab) }>
                                { label }</li>
                    }, this)}
                </ul>
            </div>
        );
    }

    onTabClick(tab) {
        if (this.props.onSelect) {
            this.props.onSelect(tab);
        }
    }
}
