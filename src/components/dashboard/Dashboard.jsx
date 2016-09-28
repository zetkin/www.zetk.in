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
        if (!this.props.userActionList.get('items')) {
            this.props.dispatch(retrieveUserActions());
        }

        if (!this.props.campaignList.get('items')) {
            this.props.dispatch(retrieveAllCampaigns());
        }

        if (!this.props.assignmentList.get('items')) {
            this.props.dispatch(retrieveUserAssignments());
        }
    }

    render() {
        let actionList = this.props.userActionList;
        let assignmentList = this.props.assignmentList;
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
                    <AssignmentList assignmentList={ assignmentList }/>
                </div>
            </div>
        );
    }
}
