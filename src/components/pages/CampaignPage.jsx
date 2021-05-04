import immutable from 'immutable';
import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';
import { connect } from 'react-redux';

import Button from '../../common/misc/Button';
import LoadingIndicator from '../../common/misc/LoadingIndicator';
import CampaignForm from '../../common/campaignForm/CampaignForm';
import { campaign } from '../../store/campaigns';
import { campaignActionList } from '../../store/actions';
import { organization } from '../../store/orgs';
import { retrieveCampaign } from '../../actions/campaign';
import {
    retrieveCampaignActions,
    updateActionResponse,
    retrieveUserResponses,
    retrieveUserActions,
} from '../../actions/action';


const mapStateToProps = (state, props) => {
    let c = campaign(state, props.params.campaignId);
    let o = organization(state, props.params.orgId);

    let isConnected = false;
    const membershipListItems = state.getIn(['orgs', 'followingList', 'items']);
    if (o && membershipListItems) {
        isConnected = !!membershipListItems.find(m =>
            m.getIn(['organization', 'id']) == o.get('id'));
    }

    return {
        campaign: c,
        organization: o,
        isAuthenticated: !!state.getIn(['user', 'data']),
        isConnected: isConnected,
        orgList: state.getIn(['orgs', 'orgList']),
        actionList: campaignActionList(state, props.params.campaignId),
        responseList: state.getIn(['actions', 'responseList']),
        userActionList: state.getIn(['actions', 'userActionList']),
    };
}

@connect(mapStateToProps)
export default class CampaignPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedActionId: null,
        };
    }

    componentDidMount() {
        let orgId = this.props.params.orgId;
        let campaignId = this.props.params.campaignId;

        this.props.dispatch(retrieveCampaignActions(orgId, campaignId));

        if (!this.props.campaign) {
            this.props.dispatch(retrieveCampaign(orgId, campaignId));
        }

        if (this.props.isAuthenticated) {
            if (!this.props.userActionList.get('items')) {
                this.props.dispatch(retrieveUserActions());
            }

            if (!this.props.responseList.get('items')) {
                this.props.dispatch(retrieveUserResponses());
            }
        }
    }

    render() {
        let campaign = this.props.campaign;
        let campaignInfo;
        let form = null;

        if (campaign && campaign.get('isPending')) {
            campaignInfo = <LoadingIndicator />;
        }
        else if (!campaign || campaign.get('error')) {
            const infoContent = [
                <Msg key="h" tagName="h1" id="pages.campaign.notFound.h"/>,
            ];

            let loginButton = null;
            if (this.props.isConnected) {
                infoContent.push(
                    <Msg key="p" tagName="p"
                        id="pages.campaign.notFound.connected.p"/>
                );
            }
            else if (this.props.isAuthenticated && this.props.organization) {
                const org = this.props.organization.get('title');
                const connectHref = '/o/' + this.props.organization.get('id') + '/connect';

                infoContent.push(
                    <Msg key="p" tagName="p"
                        values={{ org }}
                        id="pages.campaign.notFound.auth.p"/>,
                    <Button key="button"
                        labelMsg="pages.campaign.notFound.auth.connectButton"
                        labelValues={{ org }}
                        href={ connectHref } forceRefresh={ true }
                        />,
                );
            }
            else {
                const loginHref = '/login'
                    + '?redirPath=/o/' + this.props.params.orgId
                    + '/campaigns/' + this.props.params.campaignId;

                infoContent.push(
                    <Msg key="p" tagName="p"
                        id="pages.campaign.notFound.anon.p"/>,
                    <Button key="button"
                        labelMsg="pages.campaign.notFound.anon.loginButton"
                        href={ loginHref } forceRefresh={ true }
                        />,
                );
            }

            campaignInfo = (
                <div className="CampaignPage-notFound">
                    { infoContent }
                </div>
            );
        }
        else if (campaign) {
            campaignInfo = [
                <h2 key="title">{ campaign.get('title') }</h2>,
                <span key="org" className="CampaignPage-infoOrg">
                    { this.props.organization.get('title') }
                </span>,
                <p key="infoText">
                    { campaign.get('info_text') }
                </p>
            ];

            const responseList = this.props.isAuthenticated?
                this.props.responseList : immutable.fromJS({ items: [] });

            const userActionList = this.props.isAuthenticated?
                this.props.userActionList : immutable.fromJS({ items: [] });

            form = (
                <CampaignForm
                    redirPath={ this.props.location.pathname }
                    orgList={ this.props.orgList.get('items') }
                    // TODO: Don't use full action list
                    actionList={ this.props.actionList }
                    responseList={ responseList }
                    userActionList={ userActionList }
                    needFilterEnabled={ true }
                    onResponse={ this.onResponse.bind(this) }
                    />
            );
        }

        let interstitial = null;
        if (this.state.selectedActionId) {
            if (this.props.isAuthenticated) {
                interstitial = (
                    <ConnectInterstitial
                        basePath={ this.props.location.pathname }
                        org={ this.props.organization }
                        actionId={ this.state.selectedActionId }
                        onClose={ this.onInterstitialClose.bind(this) }
                        />
                );
            }
            else {
                interstitial = (
                    <AuthInterstitial
                        basePath={ this.props.location.pathname }
                        orgId={ campaign.get('org_id') }
                        actionId={ this.state.selectedActionId }
                        onClose={ this.onInterstitialClose.bind(this) }
                        />
                );
            }
        }

        return (
            <div className="CampaignPage">
                <div className="CampaignPage-info">
                    { campaignInfo }
                </div>
                { interstitial }
                { form }
            </div>
        );
    }

    onResponse(action, checked) {
        if (this.props.isAuthenticated && this.props.isConnected) {
            this.props.dispatch(updateActionResponse(action, checked));
        }
        else {
            this.setState({
                selectedActionId: action.get('id'),
            });
        }
    }

    onInterstitialClose() {
        this.setState({
            selectedActionId: null,
        });
    }
}

const ConnectInterstitial = props => {
    const signUpHref = '/ops/actionSignup/'
        + props.org.get('id')
        + ',' + props.actionId
        + ',signup'
        + '?onComplete=' + props.basePath;

    return (
        <div className="CampaignPage-interstitial">
            <div className="CampaignPage-interstitialContent">
                <Msg tagName="h1"
                    id="pages.campaign.interstitial.connect.h"
                    values={{ org: props.org.get('title') }}
                    />
                <Msg tagName="p"
                    id="pages.campaign.interstitial.connect.p"
                    values={{ org: props.org.get('title') }}
                    />
                <Button labelMsg="pages.campaign.interstitial.connect.button"
                    href={ signUpHref } forceRefresh={ true }
                    />
                <button className="CampaignPage-interstitialCloseButton"
                    onClick={ props.onClose }
                    />
            </div>
        </div>
    );
}

const AuthInterstitial = props => {
    const signUpHref = '/ops/actionSignup/'
        + props.orgId
        + ',' + props.actionId
        + ',signup'
        + '?onComplete=' + props.basePath;

    return (
        <div className="CampaignPage-interstitial">
            <div className="CampaignPage-interstitialContent">
                <div className="CampaignPage-interstitialIntro">
                    <Msg tagName="h1"
                        id="pages.campaign.interstitial.intro.h"
                        />
                    <Msg tagName="p"
                        id="pages.campaign.interstitial.intro.p"
                        />
                </div>
                <div className="CampaignPage-interstitialRegister">
                    <Msg tagName="p"
                        id="pages.campaign.interstitial.register.p"
                        />
                    <Button labelMsg="pages.campaign.interstitial.register.button"
                        href="/register"
                        />
                </div>
                <div className="CampaignPage-interstitialLogin">
                    <Msg tagName="p"
                        id="pages.campaign.interstitial.login.p"
                        />
                    <Button labelMsg="pages.campaign.interstitial.login.button"
                        href={ signUpHref } forceRefresh={ true }
                        />
                </div>
                <button className="CampaignPage-interstitialCloseButton"
                    onClick={ props.onClose }
                    />
            </div>
        </div>
    );
};
