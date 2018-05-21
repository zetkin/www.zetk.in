import React from 'react';
import { connect } from 'react-redux';

import SectionPage from './SectionPage';

import Dashboard from '../../../dashboard/Dashboard';
import CampaignForm from '../../../../common/campaignForm/CampaignForm';

const mapStateToProps = state => ({
    actionList: state.getIn(['actions', 'actionList']),
    responseList: state.getIn(['actions', 'responseList']),
    userActionList: state.getIn(['actions', 'userActionList']),
});


@connect(mapStateToProps)
export default class CampaignSectionPage extends SectionPage {

    renderSectionContent(data) {
        return [
            <Dashboard key="dashboard"/>,
            <CampaignForm key="campaignForm"
                redirPath={ this.props.redirPath }
                actionList={ this.props.actionList }
                responseList={ this.props.responseList }
                userActionList={ this.props.userActionList }
                onResponse={ this.onResponse.bind(this) }/>
        ];
    }

    getSectionTitle(data) {
        return "pages.dashboardPage.section.campaign.title";
    }

    onResponse(action, checked) {
        this.props.dispatch(updateActionResponse(action, checked));
    }
}
