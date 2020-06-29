import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';
import { connect } from 'react-redux';

import Button from '../../../common/misc/Button';
import OrgCard from './OrgCard';
import FormattedLink from '../../../common/misc/FormattedLink';
import OrgContent from './OrgContent';
import ConnectLink from './ConnectLink';
import { retrieveOrganization } from '../../../actions/org';


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
    let isFollowing = false;
    let membershipItems = state.getIn(['orgs', 'membershipList', 'items']);
    if (membershipItems && orgItem) {
        const membership = membershipItems.find(m =>
            m.getIn(['organization', 'id']) == orgItem.get('id'));
        isMember = !!membership;
        isFollowing = isMember ? membership.get('follow') : false;
    }

    const user = state.getIn(['user', 'data']);
    const isAuthenticated = !!user;
    
    return {
        user,
        orgItem,
        isMember,
        isFollowing,
        isAuthenticated,
    }
};


@connect(mapStateToProps)
export default class OrgPage extends React.Component {
    componentDidMount() {
        if (!this.props.orgItem) {
            this.props.dispatch(retrieveOrganization(this.props.params.orgId));
        }
    }

    render() {
        if (this.props.orgItem) {
            const {user, orgItem, isMember, isFollowing, isAuthenticated} = this.props;

            return (
                <div className="OrgPage">
                    <div key="header" className="OrgPage-header">
                        <div className="OrgPage-image"></div>
                        <div className="OrgPage-headerContainer">
                            <OrgCard orgItem={orgItem}/>
                            <div className="OrgPage-bar">
                                <ConnectLink isAuthenticated={isAuthenticated}
                                    isMember={isMember}
                                    isFollowing={isFollowing}
                                    orgItem={orgItem}
                                    />
                            </div>
                        </div>
                    </div>
                    <OrgContent isAuthenticated={isAuthenticated}
                        isMember={isMember}
                        isFollowing={isFollowing}
                        orgItem={orgItem}
                        user={user}
                        />
        
                </div>
            )
        }
        else {
            return (
                <div className="OrgPage">
                    <div className="OrgPage-notFound">
                        <Msg tagName="h2" id="pages.orgPage.notFound.h"/>
                        <Msg tagName="p" id="pages.orgPage.notFound.p"/>
                        <Button href="/" labelMsg="pages.orgPage.notFound.homeButton"/>
                    </div>
                </div>
            );
        }
    }
}
