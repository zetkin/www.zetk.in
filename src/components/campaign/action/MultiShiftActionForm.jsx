import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';

import PropTypes from '../../../utils/PropTypes';
import ActionFormTitle from './ActionFormTitle';
import ActionFormLocation from './ActionFormLocation';
import ActionFormTime from './ActionFormTime';
import ResponseWidget from './ResponseWidget';


export default class MultiShiftActionForm extends React.Component {
    static propTypes = {
        actions: PropTypes.array.isRequired,
        bookings: PropTypes.array.isRequired,
        responses: PropTypes.array.isRequired,
    };

    render() {
        let actions = this.props.actions;

        let shiftItems = actions.map(action => {
            let id = action.get('id');
            let startTime = Date.create(action.get('start_time'),
                { fromUTC: true, setUTC: true });
            let endTime = Date.create(action.get('end_time'),
                { fromUTC: true, setUTC: true });

            // TODO: Find nice way to localize this
            let timeLabel = startTime.format('{HH}:{mm}')
                + ' - ' + endTime.format('{HH}:{mm}');

            let isBooked = this.props.bookings
                .indexOf(action.get('id').toString()) >= 0;
            let response = this.props.responses
                .indexOf(action.get('id').toString()) >= 0;

            return (
                <li key={ timeLabel }
                    className="MultiShiftActionForm-shiftItem">
                    <ActionFormTime time={ timeLabel } />
                    <ResponseWidget action={ action }
                        isBooked={ isBooked } response={ response }
                        onChange={ this.onChange.bind(this) }/>
                </li>
            );
        });

        return (
            <div className="MultiShiftActionForm">
                <ActionFormTitle
                    title={ actions[0].getIn(['activity', 'title']) } />
                <ActionFormLocation
                    location={ actions[0].getIn(['location', 'title']) } />
                <ul className="MultiShiftactionForm-shifts">
                    { shiftItems }
                </ul>
            </div>
        );
    }

    onChange(action, ev) {
        if (this.props.onChange) {
            this.props.onChange(action, ev.target.checked);
        }
    }
}
