import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';

import PropTypes from '../../utils/PropTypes';


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

            // TODO: Remove this duplication
            //       Same as SingleActionForm and MultiLocationActionForm
            let respondWidget = null;
            if (isBooked) {
                respondWidget = (
                    <Msg id="campaignForm.action.booked"
                        className="MultiShiftActionForm-booked"/>
                );
            }
            else {
                // Include meta-data about org and previous (current) state in the
                // form data for when form is submitted without javascript. The
                // POST handler uses id.org, id.prev and id.response to figure out
                // the correct API requests.
                respondWidget = [
                    <input key="org" type="hidden" name={ id + '.org' }
                        value={ action.get('org_id') }/>,
                    <input key="prev" type="hidden" name={ id + '.prev' }
                        value={ response? 'on' : 'off' }/>,
                    <input key="checkbox" type="checkbox"
                        className="SingleActionForm-checkbox"
                        onChange={ this.onChange.bind(this, action) }
                        checked={ response }
                        id={ id } name={ id + '.res' }/>,
                    <label key="label" className="MultiShiftActionForm-checkboxLabel"
                        htmlFor={ id }>
                        <Msg id="campaignForm.action.yesLabel"/>
                    </label>
                ];
            }


            return (
                <li key={ timeLabel }
                    className="MultiShiftActionForm-shiftItem">
                    { timeLabel }
                    { respondWidget }
                </li>
            );
        });

        return (
            <div className="MultiShiftActionForm">
                <h3 className="MultiShiftActionForm-title">
                    { actions[0].getIn(['activity', 'title']) }
                </h3>
                <div className="MultiShiftactionForm-location">
                    { actions[0].getIn(['location', 'title']) }
                </div>
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
