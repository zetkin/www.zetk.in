import React from 'react';
import cx from 'classnames';
import { FormattedMessage as Msg } from 'react-intl';

import Link from '../../misc/FormattedLink';
import CampaignFilterList from './CampaignFilterList';
import PropTypes from '../../../utils/PropTypes';


export default class CampaignFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            viewCampaignsMode: 'contracted',
            viewLocationsMode: 'contracted',
            viewActivitiesMode: 'contracted',
        }
    }
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
        let num = undefined;

        num = Object.keys(campaigns).length;
        if (num > 1) {
            let c = [];

            c.push(
                <Link key="campaignLink"
                    className="CampaignFilter-toggle"
                    msgId="campaignForm.filter.campaigns.label"
                    msgValues={{ num }}
                    onClick={ this.onClickViewCampaigns.bind(this) }/>,
                <CampaignFilterList key="campaignFilter"
                    options={ campaigns }
                    selectedIds={ this.props.selectedCampaigns }
                    onChange={ this.onChange.bind(this, 'campaigns') }
                    />
            );
            let classes = cx('CampaignFilter-item', {
                contracted: this.state.viewCampaignsMode === 'contracted',
                expanded: this.state.viewCampaignsMode === 'expanded',
            });

            c = [ <div className={ classes }> { c } </div> ];

            filters.push(c);
        }

        num = Object.keys(locations).length;
        if (num > 1) {
            let l = [];

            l.push(
                <Link key="locationLink"
                    className="CampaignFilter-toggle"
                    msgId="campaignForm.filter.locations.label"
                    msgValues={{ num }}
                    onClick={ this.onClickViewLocations.bind(this) }/>,
                <CampaignFilterList key="locationFilter"
                    options={ locations }
                    selectedIds={ this.props.selectedLocations }
                    onChange={ this.onChange.bind(this, 'locations') }
                    />,
            );

            let classes = cx('CampaignFilter-item', {
                contracted: this.state.viewLocationsMode === 'contracted',
                expanded: this.state.viewLocationsMode === 'expanded',
            });

            l = [ <div className={ classes }> { l } </div> ];

            filters.push(l);
        }

        num = Object.keys(activities).length;
        if (num > 1) {
            let a = [];

            a.push(
                 <Link key="activitiesLink"
                    className="CampaignFilter-toggle"
                    msgId="campaignForm.filter.activities.label"
                    msgValues={{ num }}
                    onClick={ this.onClickViewActivities.bind(this) }/>,
                <CampaignFilterList key="activityFilter"
                    options={ activities }
                    selectedIds={ this.props.selectedActivities }
                    onChange={ this.onChange.bind(this, 'activities') }
                    />
            );

            let classes = cx('CampaignFilter-item', {
                contracted: this.state.viewActivitiesMode === 'contracted',
                expanded: this.state.viewActivitiesMode === 'expanded',
            });

            a = [ <div className={ classes }> { a } </div> ];

            filters.push(a);
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

    onClickViewCampaigns(ev) {
        this.setState({
            viewCampaignsMode: (this.state.viewCampaignsMode === 'contracted')?
                'expanded' : 'contracted',
        });
    }

    onClickViewLocations(ev) {
        this.setState({
            viewLocationsMode: (this.state.viewLocationsMode === 'contracted')?
                'expanded' : 'contracted',
        });
    }

    onClickViewActivities(ev) {
        this.setState({
            viewActivitiesMode: (this.state.viewActivitiesMode === 'contracted')?
                'expanded' : 'contracted',
        });
    }


    onChange(type, selected) {
        if (this.props.onChange) {
            this.props.onChange(type, selected);
        }
    }
}
