import immutable from 'immutable';
import { connect } from 'react-redux';
import React from 'react';

import ActionForm from './ActionForm';
import LoadingIndicator from '../misc/LoadingIndicator';
import PropTypes from '../../utils/PropTypes';
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
export default class CampaignForm extends React.Component {
    static propTypes = {
        actionList: PropTypes.complexList.isRequired,
    };

    componentDidMount() {
        // TODO: Don't load in this component
        //       The component will be shared with other app and should not
        //       be in any way directly connected to store.

        if (!this.props.actionList.get('items')) {
            this.props.dispatch(retrieveAllActions());
        }

        if (!this.props.responseList.get('items')) {
            this.props.dispatch(retrieveUserResponses());
        }
    }

    render() {
        let listComponent = null;
        let responseList = this.props.responseList;
        let userActionList = this.props.userActionList;
        let actionList = this.props.actionList;

        let isPending = actionList.get('isPending')
            || userActionList.get('isPending')
            || responseList.get('isPending');

        if (isPending) {
            return <LoadingIndicator/>
        }
        else if (actionList.get('error')) {
            // TODO: Proper error message
            return <span>ERROR!</span>;
        }
        else if (actionList.get('items') && userActionList.get('items')
            && responseList.get('items')) {

            let actionsByDay = actionList.get('items').groupBy(action => {
                let startTime = Date.create(action.get('start_time'),
                    { fromUTC: true, setUTC: true });
                return startTime.format('{yyyy}{MM}{dd}')
            });

            // Sort by date
            actionsByDay = actionsByDay.sortBy((val, key) => key);

            let dayComponents = actionsByDay.toList().map((actions, key) => {
                // TODO: Do more logic to group actions as shifts et c
                let actionComponents = actions.map(action => {
                    let response = !!responseList.get('items').find(item =>
                        item.get('action_id') == action.get('id'));

                    let booked = !!userActionList.get('items').find(item =>
                        item.get('id') == action.get('id'));

                    return (
                        <li key={ action.get('id') }
                            className="CampaignForm-action">
                            <ActionForm action={ action }
                                isBooked={ booked } response={ response }
                                onChange={ this.onActionChange.bind(this) }/>
                        </li>
                    );
                });

                return (
                    <li className="CampaignForm-day" key={ key }>
                        <h4>{ key }</h4>
                        <ul className="CampaignForm-actions">
                            { actionComponents }
                        </ul>
                    </li>
                );
            });

            return (
                <div className="CampaignForm">
                    <ul className="CampaignForm-days">
                        { dayComponents }
                    </ul>
                </div>
            );
        }
        else {
            return null;
        }
    }

    onActionChange(action, checked) {
        this.props.dispatch(updateActionResponse(action, checked));
    }
}
