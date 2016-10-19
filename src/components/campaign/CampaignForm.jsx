import immutable from 'immutable';
import { injectIntl } from 'react-intl';
import React from 'react';

import ActionForm from './ActionForm';
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

            let actionsByDay = actionList.get('items').groupBy(action => {
                let startTime = Date.create(action.get('start_time'),
                    { fromUTC: true, setUTC: true });
                return startTime.format('{yyyy}{MM}{dd}')
            });

            // Sort by date
            actionsByDay = actionsByDay.sortBy((val, key) => key);

            let dayComponents = actionsByDay.toList().map((actions, key) => {
                // TODO: Do more logic to group actions as shifts et c
                let actionComponents = actions.toList().map(action => {
                    let response = !!responseList.get('items').find(item =>
                        item.get('action_id') == action.get('id'));

                    let booked = !!userActionList.get('items').find(item =>
                        item.get('id') == action.get('id'));

                    let classes = cx('CampaignForm-action', { booked });

                    return (
                        <li key={ action.get('id') }
                            className={ classes }>
                            <ActionForm action={ action }
                                isBooked={ booked } response={ response }
                                onChange={ this.onActionChange.bind(this) }/>
                        </li>
                    );
                });

                // Use date from first action on day
                let action = actions.toList().get(0);
                let startTime = Date.create(action.get('start_time'),
                    { fromUTC: true, setUTC: true });
                let date = startTime.format('{dd}/{MM}')

                return (
                    <li className="CampaignForm-day" key={ key }>
                        <div className="CampaignForm-date">{ date }</div>
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

            return (
                <div className="CampaignForm">
                    <form method="post" action="/forms/actionResponse">
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

    onActionChange(action, checked) {
        if (this.props.onResponse) {
            this.props.onResponse(action, checked);
        }
    }
}
