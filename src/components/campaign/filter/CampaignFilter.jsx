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
                <CampaignFilterList key="campaignFilter"
                    options={ campaigns }
                    headerMsg="campaignForm.filter.campaigns.h"
                    selectedIds={ this.props.selectedCampaigns }
                    onChange={ this.onChange.bind(this, 'campaigns') }
                    />
            );
        }

        if (Object.keys(locations).length > 1) {
            filters.push(
                <CampaignFilterList key="locationFilter"
                    options={ locations }
                    headerMsg="campaignForm.filter.locations.h"
                    selectedIds={ this.props.selectedLocations }
                    onChange={ this.onChange.bind(this, 'locations') }
                    />
            );
        }

        if (Object.keys(activities).length > 1) {
            filters.push(
                <CampaignFilterList key="activityFilter"
                    options={ activities }
                    headerMsg="campaignForm.filter.activities.h"
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
