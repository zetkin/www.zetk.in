import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';
import { Link } from 'react-router';

import FormattedLink from '../misc/FormattedLink';
import LoadingIndicator from '../misc/LoadingIndicator';



export default class CampaignList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maxVisible: 4,
        };
    }

    render() {
        let campaignList = this.props.campaignList;

        if (campaignList.get('isPending')) {
            return <LoadingIndicator/>
        }
        else if (campaignList.get('error')) {
            // TODO: Proper error message
            return <span>ERROR!</span>;
        }
        else if (campaignList.get('items')) {
            let moreLink;
            let maxVisible = this.state.maxVisible;
            let campaigns = campaignList.get('items');

            if (maxVisible && campaigns.size > maxVisible) {
                let numExtra = campaigns.size - maxVisible;
                campaigns = campaigns.slice(0, maxVisible);

                moreLink = (
                    <FormattedLink msgId="dashboard.events.more"
                        msgValues={{ numExtra }}
                        onClick={ this.onClickMore.bind(this) }/>
                );
            }

            return (
                <div className="CampaignList">
                    <ul>
                    { campaigns.map(item => (
                        <CampaignListItem key={ item.get('id') }
                            campaign={ item }/>
                    ))}
                    </ul>
                    { moreLink }
                </div>
            );
        }
        else {
            return null;
        }
    }

    onClickMore(ev) {
        this.setState({
            maxVisible: undefined,
        });
    }
}

const CampaignListItem = props => {
    let title = props.campaign.get('title');
    let href = '/o/' + props.campaign.get('org_id')
        + '/campaigns/' + props.campaign.get('id');

    return (
        <li className="CampaignListItem">
            <Link to={ href }>{ title }</Link>
        </li>
    );
};
