import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import {
    CampaignPage,
    DashboardPage,
    LandingPage,
    SettingsPage,
    VerifyEmailPage,
} from './pages';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ LandingPage }/>
        <Route path="/register"
            component={ LandingPage } showSignUp={ true }/>
        <Route path="/verify"
            component={ VerifyEmailPage }/>
        <Route path="/dashboard"
            component={ DashboardPage }/>
        <Route path="/settings"
            component={ SettingsPage }/>
        <Route path="/o/:orgId/campaigns/:campaignId"
            component={ CampaignPage }/>
    </Route>
);
