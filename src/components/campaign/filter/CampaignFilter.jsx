import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';

import CampaignFilterList from './CampaignFilterList';
import PropTypes from '../../../utils/PropTypes';


export default class CampaignFilter extends React.Component {
    static propTypes = {
        actions: PropTypes.list.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedActivities: [],
            selectedCampaigns: [],
            selectedLocations: [],
        };
    }

    render() {
        let campaigns = {};
        let locations = {};
        let activities = {};

        this.props.actions.forEach(action => {
            let activity = action.get('activity');
            let campaign = action.get('campaign');
            let location = action.get('location');

            activities[activity.get('id')] = activity.get('title');
            campaigns[campaign.get('id')] = campaign.get('title');
            locations[location.get('id')] = location.get('title');
        });

        let filters = [];

        if (Object.keys(campaigns).length > 1) {
            filters.push(
                <Msg key="campaignHeader" tagName="h4"
                    id="campaignForm.filter.campaigns.h"/>,
                <CampaignFilterList key="campaignFilter"
                    options={ campaigns }
                    selectedIds={ this.state.selectedCampaigns }
                    onChange={ this.onChangeCampaigns.bind(this) }
                    />
            );
        }

        if (Object.keys(locations).length > 1) {
            filters.push(
                <Msg key="locationHeader" tagName="h4"
                    id="campaignForm.filter.locations.h"/>,
                <CampaignFilterList key="locationFilter"
                    options={ locations }
                    selectedIds={ this.state.selectedLocations }
                    onChange={ this.onChangeLocations.bind(this) }
                    />
            );
        }

        if (Object.keys(activities).length > 1) {
            filters.push(
                <Msg key="activityHeader" tagName="h4"
                    id="campaignForm.filter.activities.h"/>,
                <CampaignFilterList key="activityFilter"
                    options={ activities }
                    selectedIds={ this.state.selectedActivities }
                    onChange={ this.onChangeActivities.bind(this) }
                    />
            );
        }

        return (
            <div className="CampaignFilter">
                <Msg tagName="h3"
                    id="campaignForm.filter.h"/>
                { filters }
            </div>
        );
    }

    onChangeActivities(selected) {
        this.setState({
            selectedActivities: selected,
        });
    }

    onChangeCampaigns(selected) {
        this.setState({
            selectedCampaigns: selected,
        });
    }

    onChangeLocations(selected) {
        this.setState({
            selectedLocations: selected,
        });
    }
}
