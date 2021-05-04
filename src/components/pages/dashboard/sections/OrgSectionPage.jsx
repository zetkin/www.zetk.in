import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

import Button from '../../../../common/misc/Button';
import SectionPage from './SectionPage';

import ConnectionList from '../../../misc/ConnectionList';
import { followOrganization, unfollowOrganization } from '../../../../actions/org';

const mapStateToProps = state => ({
    orgList: state.getIn(['orgs', 'followingList']),
});


@connect(mapStateToProps)
export default class OrgSectionPage extends SectionPage {

    renderSectionContent(data) {

        return [
            <div className="OrgSectionPage-connected" key="connected">
                <Msg tagName="h3"
                    id="pages.dashboardPage.section.organizations.connectedOrgs.title"
                    />
                <Msg tagName="p"
                    id="pages.dashboardPage.section.organizations.connectedOrgs.desc"
                    values={{ count: this.props.orgList.get('items').size  }} />
                <ConnectionList
                    connectionList={ this.props.orgList }
                    onUpdateFollow={ this.onConnectionListUpdateFollow.bind(this) }
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

    onConnectionListUpdateFollow(org, follow) {
        if(follow) {
            this.props.dispatch(followOrganization(org));
        } else {
            this.props.dispatch(unfollowOrganization(org));
        }
    }
}
