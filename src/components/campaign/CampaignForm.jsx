import immutable from 'immutable';
import { connect } from 'react-redux';
import React from 'react';

import ActionForm from './ActionForm';
import LoadingIndicator from '../misc/LoadingIndicator';
import PropTypes from '../../utils/PropTypes';
import { retrieveAllActions } from '../../actions/action';


const mapStateToProps = state => ({
    actionList: state.getIn(['actions', 'actionList']),
});


@connect(mapStateToProps)
export default class CampaignForm extends React.Component {
    static propTypes = {
        actionList: PropTypes.complexList.isRequired,
    };

    componentDidMount() {
        this.props.dispatch(retrieveAllActions());
    }

    render() {
        let listComponent = null;
        let actionList = this.props.actionList;

        if (actionList.get('isPending')) {
            return <LoadingIndicator/>
        }
        else if (actionList.get('error')) {
            // TODO: Proper error message
            return <span>ERROR!</span>;
        }
        else if (actionList.get('items')) {
            let actionsByDay = actionList.get('items').groupBy(action => {
                let startTime = Date.create(action.get('start_time'),
                    { fromUTC: true, setUTC: true });
                return startTime.format('{yyyy}{MM}{dd}')
            });

            // Sort by date
            actionsByDay = actionsByDay.sortBy((val, key) => key);

            let dayComponents = actionsByDay.toList().map((actions, key) => {
                let actionComponents = actions.map(action => (
                    // TODO: Do more logic to group actions as shifts et c
                    <li key={ action.get('id') }
                        className="CampaignForm-action">
                        <ActionForm action={ action }/>
                    </li>
                ));

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
}
