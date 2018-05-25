import React from 'react';
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
                    />,
                <section key="section">
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
}
