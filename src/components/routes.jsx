import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import {
    CampaignPage,
    DashboardPage,
    LandingPage
} from './pages';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ LandingPage }/>
        <Route path="/register"
            component={ LandingPage } showSignUp={ true }/>
        <Route path="/dashboard"
            component={ DashboardPage }/>
        <Route path="/o/:orgId/campaigns/:campaignId"
            component={ CampaignPage }/>
    </Route>
);
