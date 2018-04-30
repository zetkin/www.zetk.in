import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import {
    CampaignPage,
    DashboardPage,
    GroupPage,
    LandingPage,
    LostPasswordPage,
    NotFoundPage,
    OrgPage,
    ResetPasswordPage,
    SettingsPage,
    SurveyPage,
    SurveySubmittedPage,
    VerifyEmailPage,
} from './pages';

export default (
    <Route path="/" component={ App }>
        <IndexRoute component={ LandingPage }/>
        <Route path="/register"
            component={ LandingPage } showSignUp={ true }/>
        <Route path="/verify/:code"
            component={ VerifyEmailPage }/>
        <Route path="/verify"
            component={ VerifyEmailPage }/>
        <Route path="/lost-password"
            component={ LostPasswordPage }/>
        <Route path="/reset-password"
            component={ ResetPasswordPage }/>
        <Route path="/dashboard"
            component={ DashboardPage }/>
        <Route path="/settings"
            component={ SettingsPage }/>
        <Route path="/o/:orgId"
            component={ OrgPage }/>
        <Route path="/o/:orgId/campaigns/:campaignId"
            component={ CampaignPage }/>
        <Route path="/o/:orgId/groups/:groupId"
            component={ GroupPage }/>
        <Route path="/o/:orgId/surveys/:surveyId/submitted"
            component={ SurveySubmittedPage }/>
        <Route path="/o/:orgId/surveys/:surveyId"
            component={ SurveyPage }/>
        <Route id="404" path="*"
            component={ NotFoundPage }/>
    </Route>
);
