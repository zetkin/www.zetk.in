import React from 'react';
import { connect } from 'react-redux';

import CampaignForm from '../../common/campaignForm/CampaignForm';
import Dashboard from '../dashboard/Dashboard';
import Welcome from '../misc/Welcome';
import {
    retrieveAllActions,
    updateActionResponse,
    retrieveUserResponses,
} from '../../actions/action';


const mapStateToProps = state => ({
    actionList: state.getIn(['actions', 'actionList']),
    responseList: state.getIn(['actions', 'responseList']),
    userActionList: state.getIn(['actions', 'userActionList']),
    hasMemberships: !!state.getIn(['orgs', 'membershipList', 'items']).size,
});


@connect(mapStateToProps)
export default class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(retrieveAllActions());
        this.props.dispatch(retrieveUserResponses());
    }

    render() {
        let content;

        if (this.props.hasMemberships) {
            content = [
                <Dashboard key="dashboard"/>,
                <CampaignForm key="campaignForm"
                    redirPath={ this.props.location.pathname }
                    actionList={ this.props.actionList }
                    responseList={ this.props.responseList }
                    userActionList={ this.props.userActionList }
                    onResponse={ this.onResponse.bind(this) }/>,
            ];
        }
        else {
            content = (
                <Welcome/>
            );
        }

        return (
            <div className="DashboardPage">
                { content }
            </div>
        );
    }

    onResponse(action, checked) {
        this.props.dispatch(updateActionResponse(action, checked));
    }
}
