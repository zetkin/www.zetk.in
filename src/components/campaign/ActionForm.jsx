import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';


export default class ActionForm extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
        isBooked: React.PropTypes.bool,
        response: React.PropTypes.bool,
    };

    render() {
        let action = this.props.action;
        let activity = action.getIn(['activity', 'title']);

        let startTime = Date.create(action.get('start_time'),
            { fromUTC: true, setUTC: true });
        let endTime = Date.create(action.get('end_time'),
            { fromUTC: true, setUTC: true });

        // TODO: Find nice way to localize this
        let timeLabel = startTime.format('{HH}:{mm}')
            + ' - ' + endTime.format('{HH}:{mm}');

        let location = action.getIn(['location', 'title']);

        let infoText = null;
        if (action.get('info_text')) {
            infoText = (
                <p className="ActionForm-info">
                    { action.get('info_text') }
                </p>
            );
        }

        let id = action.get('id');

        let respondWidget = null;
        if (this.props.isBooked) {
            respondWidget = (
                <Msg id="campaignForm.action.booked"
                    className="ActionForm-booked"/>
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
                    value={ this.props.response? 'on' : 'off' }/>,
                <input key="checkbox" type="checkbox"
                    className="ActionForm-checkbox"
                    onChange={ this.onChange.bind(this) }
                    checked={ this.props.response }
                    id={ id } name={ id + '.res' }/>,
                <label key="label" className="ActionForm-checkboxLabel"
                    htmlFor={ id }>
                    <Msg id="campaignForm.action.yesLabel"/>
                </label>
            ];
        }

        return (
            <div className="ActionForm">
                <h3 className="ActionForm-title">
                    <span className="ActionForm-activity">{ activity }</span>
                </h3>
                <div className="ActionForm-location">
                    <span className="ActionForm-locationItem">{ location }</span>
                </div>
                <div className="ActionForm-time">
                    <span className="ActionForm-timeItem">{ timeLabel }</span>
                </div>

                { infoText }

                <div className="ActionForm-response">
                    { respondWidget }
                </div>
            </div>
        );
    }

    onChange(ev) {
        if (this.props.onChange) {
            this.props.onChange(this.props.action, ev.target.checked);
        }
    }
};
