import React from 'react';
import { connect } from 'react-redux';

import CampaignForm from '../campaign/CampaignForm';
import LoadingIndicator from '../misc/LoadingIndicator';
import { campaign } from '../../store/campaigns';
import { campaignActionList } from '../../store/actions';
import { retrieveCampaign } from '../../actions/campaign';
import {
    retrieveCampaignActions,
    updateActionResponse,
    retrieveUserResponses,
    retrieveUserActions,
} from '../../actions/action';


const mapStateToProps = (state, props) => ({
    campaign: campaign(state, props.params.campaignId),
    actionList: campaignActionList(state, props.params.campaignId),
    responseList: state.getIn(['actions', 'responseList']),
    userActionList: state.getIn(['actions', 'userActionList']),
});


@connect(mapStateToProps)
export default class CampaignPage extends React.Component {
    componentDidMount() {
        let orgId = this.props.params.orgId;
        let campaignId = this.props.params.campaignId;

        this.props.dispatch(retrieveCampaignActions(orgId, campaignId));

        if (!this.props.campaign) {
            this.props.dispatch(retrieveCampaign(orgId, campaignId));
        }

        if (!this.props.userActionList.get('items')) {
            this.props.dispatch(retrieveUserActions());
        }

        if (!this.props.responseList.get('items')) {
            this.props.dispatch(retrieveUserResponses());
        }
    }

    render() {
        let campaign = this.props.campaign;
        let campaignInfo = <LoadingIndicator />;
        if (campaign) {
            campaignInfo = [
                <h2 key="title">{ campaign.get('title') }</h2>,
                <p key="infoText">
                    { campaign.get('info_text') }
                </p>
            ];
        }

        return (
            <div className="CampaignPage">
                <div className="CampaignPage-info">
                    { campaignInfo }
                </div>
                <CampaignForm
                    redirPath={ this.props.location.pathname }
                    // TODO: Don't use full action list
                    actionList={ this.props.actionList }
                    responseList={ this.props.responseList }
                    userActionList={ this.props.userActionList }
                    onResponse={ this.onResponse.bind(this) }/>
            </div>
        );
    }

    onResponse(action, checked) {
        this.props.dispatch(updateActionResponse(action, checked));
    }
}
