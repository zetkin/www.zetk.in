import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

import { retrieveAllCampaigns } from '../../../../actions/campaign';
import {
    retrieveUserActions,
    updateActionResponse,
} from '../../../../actions/action';

import SectionPage from './SectionPage';

import CampaignList from './CampaignList';
import PropTypes from '../../../../utils/PropTypes';

import CampaignForm from '../../../../common/campaignForm/CampaignForm';
import CampaignTabs from './CampaignTabs';

const mapStateToProps = state => ({
    orgList: state.getIn(['orgs', 'orgList']),
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

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'planned',
        };
    }

    componentDidMount() {
        this.props.dispatch(retrieveUserActions());
        this.props.dispatch(retrieveAllCampaigns());
    }

    renderSectionContent(data) {
        let actionList = this.props.userActionList;
        let campaignList = this.props.campaignList;

        let selectedTab = this.state.selectedTab;
        let tabs = {
            'planned': 'pages.dashboardPage.section.campaign.tabs.planned',
            'signed': 'pages.dashboardPage.section.campaign.tabs.signedUp',
        };

        let scopedActionList = this.props.actionList;
        let message = null;

        let showNeedFilter = true;

        if (selectedTab !== 'planned') {
            let userActionList = this.props.userActionList;
            let responseList = this.props.responseList;

            showNeedFilter = false;

            scopedActionList = scopedActionList
                .updateIn(['items'], items => items
                    .filter(a => {
                        let id = a.get('id').toString();
                        return !!userActionList.getIn(['items', id])
                            || !!responseList.getIn(['items', id]);
                    }));

            message = (
            <div className="CampaignForm-message">
                <h2 className="CampaignForm-messageTitle signed">
                    <Msg id="campaignForm.message.yourActions.title"/>
                </h2>
                <Msg tagName="p" id="campaignForm.message.yourActions.p"
                />
            </div>
            );
        }

        return [
            <div className="CampaignSectionPage-guide"
                key="guide">
                <Msg tagName="p"
                    id="pages.dashboardPage.section.campaign.guide.p"
                />
            </div>,
            <div className="CampaignSectionPage-campaigns"
                key="campaigns">
                <Msg tagName="h3"
                    id="pages.dashboardPage.section.campaign.campaigns.title"
                    />
                <CampaignList campaignList={ campaignList }/>
            </div>,
            <CampaignTabs key="tabs"
                tabs={ tabs }
                selected={ selectedTab }
                onSelect={ this.onTabSelect.bind(this) }
            />,
            <CampaignForm key="campaignForm"
                needActivityFilter={ selectedTab !== 'signed' }
                orgList={ this.props.orgList.get('items') }
                redirPath={ this.props.redirPath }
                actionList={ scopedActionList }
                responseList={ this.props.responseList }
                userActionList={ this.props.userActionList }
                onResponse={ this.onResponse.bind(this) }
                needFilterEnabled={ showNeedFilter }
                message={ message }/>
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

    onTabSelect(tab) {
        this.setState({
            selectedTab: tab,
        });
    }
}
