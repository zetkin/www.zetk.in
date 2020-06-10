import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

import Button from '../../../../common/misc/Button';
import SectionPage from './SectionPage';

import ConnectionList from '../../../misc/ConnectionList';
import { deleteUserMembership, updateUserMembership } from '../../../../actions/org';

const mapStateToProps = state => ({
    orgList: state.getIn(['orgs', 'membershipList']),
    hasMemberships: !!state.getIn(['orgs', 'membershipList', 'items']).size,
});


@connect(mapStateToProps)
export default class OrgSectionPage extends SectionPage {

    renderSectionContent(data) {

        let orgs = this.props.orgList.get('items');

        return [
            <div className="OrgSectionPage-connected" key="connected">
                <Msg tagName="h3"
                    id="pages.dashboardPage.section.organizations.connectedOrgs.title"
                    />
                <Msg tagName="p"
                    id="pages.dashboardPage.section.organizations.connectedOrgs.desc"
                    values={{ count: (orgs? orgs.size : 0) }} />
                <ConnectionList
                    connectionList={ this.props.orgList }
                    onDisconnect={ this.onConnectionListDisconnect.bind(this) }
                    onFollow={ this.onConnectionListFollow.bind(this) }
                    />
            </div>,
            /*
            <div className="OrgSectionPage-find" key="find">
                <Msg tagName="h3"
                    id="pages.dashboardPage.section.organizations.findOrgs.title" />
                <Msg tagName="p"
                    id="pages.dashboardPage.section.organizations.findOrgs.desc" />
                <Button key="findOrgButton"
                    labelMsg="pages.dashboardPage.section.organizations.findOrgs.buttonLabel"
                    href="/o/"
                    />
            </div>
            */
        ];
    }

    getSectionTitle(data) {
        return "pages.dashboardPage.section.organizations.title";
    }

    getSectionDesc(data) {
        return <Msg tagName="p"
                    id="pages.dashboardPage.section.organizations.desc" />;
    }

    onConnectionListDisconnect(org) {
        this.props.dispatch(deleteUserMembership(org.get('id')));
    }

    onConnectionListFollow(org) {
        console.log('follow');
        this.props.dispatch(updateUserMembership(org.get('id'), { follow: true  }));
    }
}
