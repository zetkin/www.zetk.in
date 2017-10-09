import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';
import { connect } from 'react-redux';

import FormattedLink from '../../common/misc/FormattedLink';
import SimplePageBase from './SimplePageBase';


const mapStateToProps = (state, props) => {
    let orgId = props.params.orgId;
    let orgItem = state.getIn(['orgs', 'orgList', 'items', orgId]);

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

            const avatarDomain = '//api.' + process.env.ZETKIN_DOMAIN;
            const avatarSrc = avatarDomain + '/v1/orgs/' + org.get('id') + '/avatar';

            return [
                <div key="header" className="OrgPage-header">
                    <img key="avatar"
                        className="OrgPage-avatar"
                        src={ avatarSrc } title={ org.get('title') }
                        />
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
