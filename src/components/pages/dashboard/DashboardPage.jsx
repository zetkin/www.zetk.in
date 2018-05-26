import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import CampaignForm from '../../../common/campaignForm/CampaignForm';
import DashboardHero from './DashboardHero';
import Welcome from '../../misc/Welcome';

import OrgSectionPage from './sections/OrgSectionPage';
import CallSectionPage from './sections/CallSectionPage';
import CampaignSectionPage from './sections/CampaignSectionPage';
import {
    retrieveAllActions,
    updateActionResponse,
    retrieveUserResponses,
} from '../../../actions/action';


const mapStateToProps = state => ({
    actionList: state.getIn(['actions', 'actionList']),
    responseList: state.getIn(['actions', 'responseList']),
    userActionList: state.getIn(['actions', 'userActionList']),
    hasMemberships: !!state.getIn(['orgs', 'membershipList', 'items']).size, // error when logged out
});


@withRouter
@connect(mapStateToProps)
export default class DashboardPage extends React.Component {
    componentDidMount() {
        this.props.dispatch(retrieveAllActions());
        this.props.dispatch(retrieveUserResponses());
    }

    render() {
        let content;
        let section;

        if (this.props.params.section == 'campaign' || !this.props.params.section) {
            section = <CampaignSectionPage
                redirPath={ this.props.location.pathname } />;
        }
        else if (this.props.params.section == 'call') {
            section = <CallSectionPage />;
        }
        else if (this.props.params.section == 'organizations') {
            section = <OrgSectionPage />;
        }

        if (this.props.hasMemberships) {
            content = [
                <DashboardHero key="hero"
                    selectedSection={ this.props.params.section }
                    onClickSignUp={ this.onClickSignUp.bind(this) }
                    />,
                <section key="section" id="DashboardPage-section">
                    { section }
                </section>,
            ];
        }
        else {
            content = (
                <Welcome/>
            );
        }

        return (
            <div className="DashboardPage">
                { content }
            </div>
        );
    }

    onClickSignUp(ev) {
        ev.preventDefault();

        this.props.router.push('/dashboard/campaign');

        const target = document.getElementById('DashboardPage-section');
        const rect = target.getBoundingClientRect();
        const scrollTop = window.scrollY + rect.top;
        const duration = 400;

        const animatedScrollTo = require('animated-scrollto');
        animatedScrollTo(document.body, scrollTop, duration);
        animatedScrollTo(document.documentElement, scrollTop, duration);
    }
}
