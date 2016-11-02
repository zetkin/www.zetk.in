import immutable from 'immutable';
import { injectIntl } from 'react-intl';
import React from 'react';

import CampaignCalendar from './calendar/CampaignCalendar';
import CampaignFilter from './filter/CampaignFilter';
import SingleActionForm from './action/SingleActionForm';
import MultiShiftActionForm from './action/MultiShiftActionForm';
import MultiLocationActionForm from './action/MultiLocationActionForm';
import LoadingIndicator from '../misc/LoadingIndicator';
import PropTypes from '../../utils/PropTypes';
import cx from 'classnames';


@injectIntl
export default class CampaignForm extends React.Component {
    static propTypes = {
        redirPath: PropTypes.string.isRequired,
        actionList: PropTypes.complexList.isRequired,
        userActionList: PropTypes.complexList.isRequired,
        responseList: PropTypes.complexList.isRequired,
        onResponse: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            // Unknown when rendering on the server. Will be set by
            // componentDidMount(), which only executes client-side.
            browserHasJavascript: null,
            filterActivities: [],
            filterCampaigns: [],
            filterLocations: [],
        };
    }

    componentDidMount() {
        this.setState({
            browserHasJavascript: true,
        });
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

            let filteredActions = actionList.get('items');

            if (this.state.filterActivities.length) {
                let activities = this.state.filterActivities;
                filteredActions = filteredActions.filter(action => activities
                    .indexOf(action.getIn(['activity', 'id']).toString()) >= 0);
            }

            if (this.state.filterCampaigns.length) {
                let campaigns = this.state.filterCampaigns;
                filteredActions = filteredActions.filter(action => campaigns
                    .indexOf(action.getIn(['campaign', 'id']).toString()) >= 0);
            }

            if (this.state.filterLocations.length) {
                let locations = this.state.filterLocations;
                filteredActions = filteredActions.filter(action => locations
                    .indexOf(action.getIn(['location', 'id']).toString()) >= 0);
            }

            let actionsByDay = filteredActions.groupBy(action => {
                let startTime = Date.create(action.get('start_time'),
                    { fromUTC: true, setUTC: true });
                return startTime.format('{yyyy}{MM}{dd}')
            });

            // Sort by date
            actionsByDay = actionsByDay.sortBy((val, key) => key);

            let dayComponents = actionsByDay.toList().map((actions, key) => {
                let actionCompontnts = [];

                let groups = [];

                // Sort by start time
                // TODO: This should be done on server (preferrable) or in store
                actions = actions.toList().sortBy(action => action.get('start_time'));

                actions.forEach(action => {
                    let startTime = action.get('start_time');
                    let endTime = action.get('end_time');
                    let location = action.getIn(['location', 'id']);
                    let activity = action.getIn(['activity', 'id']);

                    for (let i = 0; i < groups.length; i++) {
                        let group = groups[i];

                        if (group.type === 'single') {
                            let prev = group.actions[0];
                            let prevActivity = prev.getIn(['activity', 'id']);
                            let prevLocation = prev.getIn(['location', 'id']);
                            let prevStartTime = prev.get('start_time');
                            let prevEndTime = prev.get('end_time');

                            if (activity != prevActivity) {
                                // Must be same activity
                                break;
                            }

                            if (location == prevLocation && prevEndTime == startTime) {
                                group.type = 'shifts';
                                group.activity = prevActivity;
                                group.location = prevLocation;
                                group.startTime = prevStartTime;
                                group.endTime = endTime;
                                group.actions.push(action);
                                return;
                            }
                            else if (prevStartTime == startTime && prevEndTime == endTime) {
                                group.type = 'parallel';
                                group.activity = prevActivity;
                                group.startTime = startTime;
                                group.endTime = endTime;
                                group.actions.push(action);
                                return;
                            }
                        }
                        else if (group.type === 'shifts') {
                            // If activity and location is the same, and this
                            // action starts right after the last action in the
                            // group ends, the action is a shift in this group.
                            if (group.activity == activity
                                && group.location == location
                                && group.endTime == startTime) {

                                // Add action to group and stop looking
                                group.endTime = endTime;
                                group.actions.push(action);
                                return;
                            }
                        }
                        else if (group.type === 'parallel') {
                            // If activity, startTime and endTime are the same,
                            // this action is parallel to the actions in this
                            // group and can be added.
                            if (group.activity == activity
                                && group.startTime == startTime
                                && group.endTime == endTime) {

                                // Add action to group and stop looking
                                group.actions.push(action);
                                return;
                            }
                        }
                    }

                    // No group was found, create new single
                    groups.push({
                        type: 'single',
                        actions: [ action ],
                    });
                });

                let actionComponents = groups.map(group => {
                    if (group.type === 'single') {
                        let action = group.actions[0];
                        let response = !!responseList.get('items').find(item =>
                            item.get('action_id') == action.get('id'));

                        let booked = !!userActionList.get('items').find(item =>
                            item.get('id') == action.get('id'));

                        let classes = cx('CampaignForm-action', { booked, response });

                        return (
                            <li key={ action.get('id') }
                                className={ classes }>
                                <SingleActionForm action={ action }
                                    isBooked={ booked } response={ response }
                                    onChange={ this.onActionChange.bind(this) }/>
                            </li>
                        );
                    }
                    else {
                        let actions = group.actions;
                        let onActionChange = this.onActionChange.bind(this);

                        let responses = responseList.get('items')
                            .map(item => item.get('action_id').toString())
                            .filter(id => !!actions
                                .find(a => a.get('id').toString() === id))
                            .toList()
                            .toJS();

                        let bookings = userActionList.get('items')
                            .map(item => item.get('id').toString())
                            .filter(id => !!actions
                                .find(a => a.get('id').toString() === id))
                            .toList()
                            .toJS();

                        if (group.type === 'shifts') {
                            return (
                                <li key={ actions[0].get('id') }
                                    className="CampaignForm-action">
                                    <MultiShiftActionForm actions={ actions }
                                        bookings={ bookings }
                                        responses={ responses }
                                        onChange={ onActionChange }/>
                                </li>
                            );
                        }
                        else if (group.type === 'parallel') {
                            return (
                                <li key={ actions[0].get('id') }
                                    className="CampaignForm-action">
                                    <MultiLocationActionForm actions={ actions }
                                        bookings={ bookings }
                                        responses={ responses }
                                        onChange={ onActionChange }/>
                                </li>
                            );
                        }
                    }
                });

                // Use date from first action on day
                let action = actions.toList().get(0);
                let startTime = Date.create(action.get('start_time'),
                    { fromUTC: true, setUTC: true });
                let date = startTime.format('{dd}/{MM}')
                let dateId = startTime.format('{yyyy}-{MM}-{dd}');

                return (
                    <li className="CampaignForm-day" key={ key }>
                        <div id={ dateId }
                            className="CampaignForm-date">{ date }</div>
                        <ul className="CampaignForm-actions">
                            { actionComponents }
                        </ul>
                    </li>
                );
            });

            let submitButton = null;
            if (!this.state.browserHasJavascript) {
                let submitLabel = this.props.intl.formatMessage({
                    id: 'campaignForm.submitLabel' });

                submitButton = (
                    <input type="submit" value={ submitLabel }/>
                );
            }

            let bookings = userActionList.get('items')
                .map(item => item.get('id').toString())
                .toList();

            let responses = responseList.get('items')
                .map(item => item.get('action_id').toString())
                .toList();

            let allActions = actionList.get('items').toList();

            return (
                <div className="CampaignForm">
                    <CampaignCalendar
                        className="CampaignForm-calendar"
                        actions={ allActions }
                        responses={ responses }
                        bookings={ bookings }
                        />
                    <CampaignFilter
                        className="CampaignForm-filter"
                        actions={ allActions }
                        selectedActivities={ this.state.filterActivities }
                        selectedCampaigns={ this.state.filterCampaigns }
                        selectedLocations={ this.state.filterLocations }
                        onChange={ this.onFilterChange.bind(this) }
                        />
                    <form method="post" action="/forms/actionResponse"
                        className="CampaignForm-form">
                        <ul className="CampaignForm-days">
                            { dayComponents }
                        </ul>
                        <input type="hidden" name="redirPath"
                            value={ this.props.redirPath }/>
                        { submitButton }
                    </form>
                </div>
            );
        }
        else {
            return null;
        }
    }

    onFilterChange(type, selected) {
        if (type == 'activities') {
            this.setState({ filterActivities: selected });
        }
        else if (type == 'campaigns') {
            this.setState({ filterCampaigns: selected });
        }
        else if (type == 'locations') {
            this.setState({ filterLocations: selected });
        }
    }

    onActionChange(action, checked) {
        if (this.props.onResponse) {
            this.props.onResponse(action, checked);
        }
    }
}
