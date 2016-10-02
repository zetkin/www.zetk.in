import React from 'react';
import { connect } from 'react-redux';

import CampaignForm from '../campaign/CampaignForm';
import { campaignActionList } from '../../store/actions';
import {
    retrieveCampaignActions,
    updateActionResponse,
    retrieveUserResponses,
    retrieveUserActions,
} from '../../actions/action';


const mapStateToProps = (state, props) => ({
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

        if (!this.props.userActionList.get('items')) {
            this.props.dispatch(retrieveUserActions());
        }

        if (!this.props.responseList.get('items')) {
            this.props.dispatch(retrieveUserResponses());
        }
    }

    render() {
        return (
            <div className="CampaignPage">
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
