import React from 'react';
import cx from 'classnames';
import { FormattedMessage as Msg } from 'react-intl';

import CampaignFilterList from './CampaignFilterList';
import PropTypes from '../../../utils/PropTypes';


export default class CampaignFilter extends React.Component {
    static propTypes = {
        actions: PropTypes.list.isRequired,
        selectedActivities: PropTypes.array.isRequired,
        selectedCampaigns: PropTypes.array.isRequired,
        selectedLocations: PropTypes.array.isRequired,
        onChange: PropTypes.func,
    };

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
                    selectedIds={ this.props.selectedCampaigns }
                    onChange={ this.onChange.bind(this, 'campaigns') }
                    />
            );
        }

        if (Object.keys(locations).length > 1) {
            filters.push(
                <Msg key="locationHeader" tagName="h4"
                    id="campaignForm.filter.locations.h"/>,
                <CampaignFilterList key="locationFilter"
                    options={ locations }
                    selectedIds={ this.props.selectedLocations }
                    onChange={ this.onChange.bind(this, 'locations') }
                    />
            );
        }

        if (Object.keys(activities).length > 1) {
            filters.push(
                <Msg key="activityHeader" tagName="h4"
                    id="campaignForm.filter.activities.h"/>,
                <CampaignFilterList key="activityFilter"
                    options={ activities }
                    selectedIds={ this.props.selectedActivities }
                    onChange={ this.onChange.bind(this, 'activities') }
                    />
            );
        }

        let classes = cx('CampaignFilter', this.props.className);

        return (
            <div className={ classes }>
                <Msg tagName="h3"
                    id="campaignForm.filter.h"/>
                { filters }
            </div>
        );
    }

    onChange(type, selected) {
        if (this.props.onChange) {
            this.props.onChange(type, selected);
        }
    }
}
