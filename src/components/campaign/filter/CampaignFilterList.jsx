import React from 'react';
import cx from 'classnames';
import { FormattedMessage as Msg } from 'react-intl';

import Link from '../../misc/FormattedLink';


export default class CampaignFilterList extends React.Component {
    static propTypes = {
        options: React.PropTypes.object.isRequired,
        selectedIds: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            viewMode: 'contracted',
        };
    }

    render() {
        let options = this.props.options;
        let items = Object.keys(options).map(key => {
            let classes = cx('CampaignFilterList-item', {
                selected: this.props.selectedIds.indexOf(key) >= 0,
            });

            return (
                <li key={ key }
                    className={ classes }
                    onClick={ this.onClickItem.bind(this, key) }>
                    { options[key] }
                </li>
            );
        });

        let classes = cx('CampaignFilterList', {
            contracted: this.state.viewMode === 'contracted',
            expanded: this.state.viewMode === 'expanded',
        });

        let count = Object.keys(options).length;

        return (
            <div className={ classes }>
                <Link key="campaignLink"
                    className="CampaignFilterList-toggle"
                    msgId={ this.props.headerMsg }
                    msgValues={{ count }}
                    onClick={ this.onClickToggle.bind(this) }/>

                <ul className="CampaignFilterList-list">
                    { items }
                </ul>
            </div>
        );
    }

    onClickItem(key) {
        if (this.props.onChange) {
            let selectedIds = this.props.selectedIds;
            let index = selectedIds.indexOf(key);

            if (index >= 0) {
                selectedIds = selectedIds
                    .slice(0, index)
                    .concat(selectedIds.slice(index + 1));
            }
            else {
                selectedIds = selectedIds.concat([ key ]);
            }

            this.props.onChange(selectedIds);
        }
    }

    onClickToggle(ev) {
        this.setState({
            viewMode: (this.state.viewMode === 'contracted')?
                'expanded' : 'contracted',
        });
    }
}
