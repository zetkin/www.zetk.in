import React from 'react';


export default class CampaignCalendarWeek extends React.Component {
    render() {
        return (
            <div className="CampaignCalendarWeek">
                <span className="CampaignCalendarWeek-number">
                    { this.props.week }
                </span>
                <ul className="CampaignCalendarWeek-days">
                    { this.props.children }
                </ul>
            </div>
        );
    }
}
