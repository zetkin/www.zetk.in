import React from 'react';

import CampaignForm from '../campaign/CampaignForm';
import Dashboard from '../dashboard/Dashboard';


export default class DashboardPage extends React.Component {
    render() {
        return (
            <div className="DashboardPage">
                <Dashboard/>
                <CampaignForm/>
            </div>
        );
    }
}
