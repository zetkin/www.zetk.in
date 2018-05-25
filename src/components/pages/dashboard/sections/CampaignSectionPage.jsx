import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

import { retrieveAllCampaigns } from '../../../../actions/campaign';
import { retrieveUserActions } from '../../../../actions/action';

import SectionPage from './SectionPage';

import ActionList from '../../../dashboard/ActionList';
import CampaignList from '../../../dashboard/CampaignList';
import PropTypes from '../../../../utils/PropTypes';

import CampaignForm from '../../../../common/campaignForm/CampaignForm';

const mapStateToProps = state => ({
    campaignList: state.getIn(['campaigns', 'campaignList']),
    actionList: state.getIn(['actions', 'actionList']),
    responseList: state.getIn(['actions', 'responseList']),
    userActionList: state.getIn(['actions', 'userActionList']),
});


@connect(mapStateToProps)
export default class CampaignSectionPage extends SectionPage {
    static propTypes = {
        userActionList: PropTypes.complexList,
    };

    componentDidMount() {
        this.props.dispatch(retrieveUserActions());
        this.props.dispatch(retrieveAllCampaigns());
    }

    renderSectionContent(data) {
        let actionList = this.props.userActionList;
        let campaignList = this.props.campaignList;

        return [
            <div className="CampaignSectionPage-bookings"
                key="bookings">
                <Msg tagName="h3"
                    id="pages.dashboardPage.section.campaign.bookings.title"
                    />
                <ActionList actionList={ actionList }/>
            </div>,
            <div className="CampaignSectionPage-campaigns"
                key="campaigns">
                <Msg tagName="h3"
                    id="pages.dashboardPage.section.campaign.campaigns.title"
                    />
                <CampaignList campaignList={ campaignList }/>
            </div>,
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

    getSectionDesc(data) {
        return <Msg tagName="p"
                    id="pages.dashboardPage.section.campaign.desc" />;
    }

    onResponse(action, checked) {
        this.props.dispatch(updateActionResponse(action, checked));
    }
}
