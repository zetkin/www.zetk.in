import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';
import { connect } from 'react-redux';

import OrgAvatar from '../misc/OrgAvatar';
import FormattedLink from '../../common/misc/FormattedLink';
import SimplePageBase from './SimplePageBase';


const mapStateToProps = (state, props) => {
    let orgId = props.params.orgId;
    let orgItem = state.getIn(['orgs', 'orgList', 'items', orgId]);

    if (!orgItem) {
        let orgList = state.getIn(['orgs', 'orgList', 'items']);
        if (orgList) {
            orgItem = orgList.find(org => org.get('slug') == orgId);
        }
    }

    let isMember = false;
    let membershipItems = state.getIn(['orgs', 'membershipList', 'items']);
    if (membershipItems && orgItem) {
        isMember = !!membershipItems.find(m =>
            m.getIn(['organization', 'id']) == orgItem.get('id'));
    }

    let isAuthenticated = !!state.getIn(['user', 'data']);

    return {
        orgItem,
        isMember,
        isAuthenticated,
    }
};


@connect(mapStateToProps)
export default class OrgPage extends SimplePageBase {
    renderContent() {
        if (this.props.orgItem) {
            let org = this.props.orgItem;
            let connectLink = null;

            if (this.props.isMember) {
                connectLink = (
                    <Msg id="pages.orgPage.connect.alreadyConnected"/>
                );
            }
            else if (this.props.isAuthenticated) {
                let connectHref = '/o/' + org.get('id') + '/connect';
                connectLink = (
                    <FormattedLink href={ connectHref } forceRefresh={ true }
                        msgId="pages.orgPage.connect.connectLink"
                        msgValues={{ org: org.get('title') }}
                        />
                );
            }
            else {
                let loginUrl = '//login.' + process.env.ZETKIN_DOMAIN
                    + '/login?redirPath=/o/' + org.get('id')
                    + '&appId=' + process.env.ZETKIN_APP_ID;

                connectLink = (
                    <FormattedLink msgId="pages.orgPage.connect.login"
                        href={ loginUrl } forceRefresh={ true }
                        />
                );
            }

            return [
                <div key="header" className="OrgPage-header">
                    <OrgAvatar orgId={ org.get('id') }/>
                    <div className="OrgPage-info">
                        <h1>{ org.get('title') }</h1>
                        { connectLink }
                    </div>
                </div>,
            ];
        }
        else {
            return null;
        }
    }
}
