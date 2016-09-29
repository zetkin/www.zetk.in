import React from 'react';


export default (props) => {
    let action = props.action;
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

    return (
        <div className="ActionForm">
            <h3>
                <span className="ActionForm-activity">{ activity }</span>
                <span className="ActionForm-time">{ timeLabel }</span>
            </h3>
            { infoText }

            <input type="checkbox" className="ActionForm-checkbox"
                id={ id } name={ id }/>
            <label className="ActionForm-checkboxLabel"
                htmlFor={ id }/>
        </div>
    );
};
