import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';


export default function ResponseWidget(props) {
    if (props.isBooked) {
        return (
            <div className="ResponseWidget">
                <Msg id="campaignForm.action.booked"/>
            </div>
        );
    }
    else {
        let action = props.action;
        let id = action.get('id');

        // Include meta-data about org and previous (current) state in the
        // form data for when form is submitted without javascript. The
        // POST handler uses id.org, id.prev and id.response to figure out
        // the correct API requests.
        return (
            <div className="ResponseWidget">
                <input key="org" type="hidden" name={ id + '.org' }
                    value={ action.get('org_id') }/>
                <input key="prev" type="hidden" name={ id + '.prev' }
                    value={ props.response? 'on' : 'off' }/>
                <input key="checkbox" type="checkbox"
                    className="ResponseWidget-checkbox"
                    onChange={ props.onChange.bind(this, action) }
                    checked={ props.response }
                    id={ id } name={ id + '.res' }/>
                <label key="label" className="ResponseWidget-checkboxLabel"
                    htmlFor={ id }>
                    <Msg id="campaignForm.action.yesLabel"/>
                </label>
            </div>
        );
    }
};
