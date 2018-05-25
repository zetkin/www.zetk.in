import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

import { retrieveAllCampaigns } from '../../actions/campaign';
import { retrieveUserActions } from '../../actions/action';
import { retrieveUserAssignments } from '../../actions/callAssignment';

import ActionList from './ActionList';
import AssignmentList from './AssignmentList';
import CampaignList from './CampaignList';
import PropTypes from '../../utils/PropTypes';


const mapStateToProps = state => ({
    campaignList: state.getIn(['campaigns', 'campaignList']),
    assignmentList: state.getIn(['callAssignments', 'assignmentList']),
    userActionList: state.getIn(['actions', 'userActionList']),
});

@connect(mapStateToProps)
export default class Dashboard extends React.Component {
    static propTypes = {
        userActionList: PropTypes.complexList,
    };

    componentDidMount() {
        this.props.dispatch(retrieveUserActions());
        this.props.dispatch(retrieveAllCampaigns());
        this.props.dispatch(retrieveUserAssignments());
    }

    render() {
        let actionList = this.props.userActionList;
        let assignmentList = this.props.assignmentList;
        let campaignList = this.props.campaignList;

        return (
            <div className="Dashboard">
                <div className="Dashboard-events">
                    <Msg tagName="h2" id="dashboard.events.h"/>
                    <ActionList actionList={ actionList }/>
                </div>
                <div className="Dashboard-campaigns">
                    <Msg tagName="h2" id="dashboard.campaigns.h"/>
                    <CampaignList campaignList={ campaignList }/>
                </div>
            </div>
        );
    }
}
