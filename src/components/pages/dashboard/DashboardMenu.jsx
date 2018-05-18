import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as Msg } from 'react-intl';

import PropTypes from '../../../utils/PropTypes';

import DashboardMenuItem from './DashboardMenuItem';

const mapStateToProps = state => ({
    user: state.get('user'),
    campaignList: state.getIn(['campaigns', 'campaignList']),
    callAssignmentList: state.getIn(['callAssignments', 'assignmentList']),
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
        let selectedSection = this.state.selectedSection;

        let campaigningSub = this.props.intl.formatMessage(
            { id: 'pages.dashboardPage.menu.campaigning.sub' });

        let callAssignments = this.props.callAssignmentList.get('items');
        let callsSub;
        let callsDisabled = false;

        if (callAssignments.size > 0) {
            callsSub = this.props.intl.formatMessage(
                { id: 'pages.dashboardPage.menu.calls.sub' },
                { count: callAssignments.size });
        }
        else {
            callsDisabled = true;
            callsSub = this.props.intl.formatMessage(
                { id: 'pages.dashboardPage.menu.calls.none' });
        }

        let items = (
            <ul className="DashboardMenu-items">
                <DashboardMenuItem name="campaigning"
                    title= {'pages.dashboardPage.menu.campaigning.title'}
                    sub= { campaigningSub }
                    selected={ selectedSection == 'campaigning' }
                    onSelection={
                        this.onSelection.bind(this, 'campaigning') }
                />
                <DashboardMenuItem name="calls"
                    title= {'pages.dashboardPage.menu.calls.title'}
                    sub= { callsSub }
                    disabled= { callsDisabled }
                    selected={ selectedSection == 'callAssignments' }
                    onSelection={
                        this.onSelection.bind(this, 'callAssignments') }
                />
            </ul>
        );

        return (
            <div className="DashboardMenu">
                { items }
                { selectedSection }
            </div>
        );
    }

    onSelection(section) {
        this.setState({
            selectedSection: section,
        });
    }
}
