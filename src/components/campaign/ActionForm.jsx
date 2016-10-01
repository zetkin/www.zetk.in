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

        let infoText = null;
        if (action.get('info_text')) {
            infoText = (
                <p>
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
            respondWidget = [
                <input key="checkbox" type="checkbox"
                    className="ActionForm-checkbox"
                    onChange={ this.onChange.bind(this) }
                    checked={ this.props.response }
                    id={ id } name={ id }/>,
                <label key="label" className="ActionForm-checkboxLabel"
                    htmlFor={ id }/>
            ];
        }

        return (
            <div className="ActionForm">
                <h3>
                    <span className="ActionForm-activity">{ activity }</span>
                    <span className="ActionForm-time">{ timeLabel }</span>
                </h3>
                { infoText }

                { respondWidget }
            </div>
        );
    }

    onChange(ev) {
        if (this.props.onChange) {
            this.props.onChange(this.props.action, ev.target.checked);
        }
    }
};
