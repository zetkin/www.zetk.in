import React from 'react';
import { connect } from 'react-redux';

import CampaignForm from '../campaign/CampaignForm';
import Dashboard from '../dashboard/Dashboard';
import {
    retrieveAllActions,
    updateActionResponse,
    retrieveUserResponses,
} from '../../actions/action';


const mapStateToProps = state => ({
    actionList: state.getIn(['actions', 'actionList']),
    responseList: state.getIn(['actions', 'responseList']),
    userActionList: state.getIn(['actions', 'userActionList']),
});


@connect(mapStateToProps)
export default class DashboardPage extends React.Component {
    componentDidMount() {
        if (!this.props.actionList.get('items')) {
            this.props.dispatch(retrieveAllActions());
        }

        if (!this.props.responseList.get('items')) {
            this.props.dispatch(retrieveUserResponses());
        }
    }

    render() {
        return (
            <div className="DashboardPage">
                <Dashboard/>
                <CampaignForm
                    redirPath={ this.props.location.pathname }
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
