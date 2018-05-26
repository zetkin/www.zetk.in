import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as Msg } from 'react-intl';

import PropTypes from '../../../utils/PropTypes';

import DashboardMenuItem from './DashboardMenuItem';

const mapStateToProps = state => ({
    user: state.get('user'),
    campaignList: state.getIn(['campaigns', 'campaignList']),
    callAssignmentList: state.getIn(['callAssignments', 'assignmentList']),
    orgList: state.getIn(['orgs', 'membershipList']),
    surveyList: state.getIn(['surveys', 'surveyList']),
});

@connect(mapStateToProps)
@injectIntl
export default class DashboardMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedSection: null,
        };
    }

    render() {
        let selectedSection = this.props.selectedSection || 'campaign';

        let campaigningSub = this.props.intl.formatMessage(
            { id: 'pages.dashboardPage.menu.campaign.sub' });

        let callAssignments = this.props.callAssignmentList.get('items');
        let callsSub;

        callsSub = this.props.intl.formatMessage(
            { id: 'pages.dashboardPage.menu.calls.sub' },
            { count: (callAssignments? callAssignments.size : 0) });

        let orgs = this.props.orgList.get('items');
        let orgsSub;

        orgsSub = this.props.intl.formatMessage(
            { id: 'pages.dashboardPage.menu.orgs.sub' },
            { count: (orgs? orgs.size : 0) });

        /*
        let surveys = this.props.surveyList.get('items');
        let surveysSub;

        surveysSub = this.props.intl.formatMessage(
            { id: 'pages.dashboardPage.menu.surveys.sub' },
            { count: (surveys? surveys.size : 0) });
            */

        let items = (
            <ul className="DashboardMenu-items">
                <DashboardMenuItem name="campaign"
                    title= {'pages.dashboardPage.menu.campaign.title'}
                    sub= { campaigningSub }
                    selected={ selectedSection == 'campaign' }
                    to='/dashboard/campaign'
                />
                {/*
                <DashboardMenuItem name="surveys"
                    title= {'pages.dashboardPage.menu.surveys.title'}
                    sub= { surveysSub }
                    disabled= { ((!surveys
                        || surveys.size == 0)? true : false) }
                    selected={ selectedSection == 'surveys' }
                />
                */}
                <DashboardMenuItem name="calls"
                    title= {'pages.dashboardPage.menu.calls.title'}
                    sub= { callsSub }
                    disabled= { ((!callAssignments
                        || callAssignments.size == 0)? true : false) }
                    selected={ selectedSection == 'call' }
                    to='/dashboard/call'
                />
                <DashboardMenuItem name="orgs"
                    title= {'pages.dashboardPage.menu.orgs.title'}
                    sub= { orgsSub }
                    selected={ selectedSection == 'organizations' }
                    to='/dashboard/organizations'
                />
            </ul>
        );

        return (
            <div className="DashboardMenu">
                { items }
            </div>
        );
    }
}
