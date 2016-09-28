import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

import { retrieveAllCampaigns } from '../../actions/campaign';
import { retrieveUserActions } from '../../actions/action';

import ActionList from './ActionList';
import CampaignList from './CampaignList';
import PropTypes from '../../utils/PropTypes';


const mapStateToProps = state => ({
    campaignList: state.getIn(['campaigns', 'campaignList']),
    userActionList: state.getIn(['actions', 'userActionList']),
});

@connect(mapStateToProps)
export default class Dashboard extends React.Component {
    static propTypes = {
        userActionList: PropTypes.complexList,
    };

    componentDidMount() {
        if (!this.props.userActionList.get('items')) {
            this.props.dispatch(retrieveUserActions());
        }

        if (!this.props.campaignList.get('items')) {
            this.props.dispatch(retrieveAllCampaigns());
        }
    }

    render() {
        let actionList = this.props.userActionList;
        let campaignList = this.props.campaignList;

        return (
            <div className="Dashboard">
                <div className="Dashboard-campaigns">
                    <Msg tagName="h2" id="dashboard.campaigns.h"/>
                    <CampaignList campaignList={ campaignList }/>
                </div>
                <div className="Dashboard-events">
                    <Msg tagName="h2" id="dashboard.events.h"/>
                    <ActionList actionList={ actionList }/>
                </div>
                <div className="Dashboard-assignments">
                    <Msg tagName="h2" id="dashboard.assignments.h"/>
                </div>
            </div>
        );
    }
}
