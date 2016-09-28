import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';


export default class Dashboard extends React.Component {
    render() {
        return (
            <div className="Dashboard">
                <div className="Dashboard-campaigns">
                    <Msg tagName="h2" id="dashboard.campaigns.h"/>
                </div>
                <div className="Dashboard-events">
                    <Msg tagName="h2" id="dashboard.events.h"/>
                </div>
                <div className="Dashboard-assignments">
                    <Msg tagName="h2" id="dashboard.assignments.h"/>
                </div>
            </div>
        );
    }
}
