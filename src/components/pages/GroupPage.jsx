import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';
import { connect } from 'react-redux';

import LoadingIndicator from '../../common/misc/LoadingIndicator';
import { group } from '../../store/groups';
import { organization } from '../../store/orgs';
import {
    retrieveGroup,
    retrieveGroupMembers,
} from '../../actions/group';


const mapStateToProps = (state, props) => {
    let g = group(state, props.params.groupId);
    let o = g? organization(state, g.get('org_id')) : null;

    return {
        group: g,
        organization: o,
    };
}

@connect(mapStateToProps)
export default class GroupPage extends React.Component {
    componentDidMount() {
        let orgId = this.props.params.orgId;
        let groupId = this.props.params.groupId;

        if (!this.props.group) {
            this.props.dispatch(retrieveGroup(orgId, groupId));
        }
    }

    render() {
        let group = this.props.group;
        let groupInfo;

        if (group && group.get('isPending')) {
            groupInfo = <LoadingIndicator />;
        }
        else if (!group || group.get('error')) {
            groupInfo = <Msg id="pages.group.notFound.h"/>;
        }
        else if (group) {
            groupInfo = [
                <h2 key="title">{ group.get('title') }</h2>,
                <span key="org" className="GroupPage-infoOrg">
                    { this.props.organization.get('title') }
                </span>,
                <p key="infoText">
                    { group.get('description') }
                </p>
            ];
        }

        return (
            <div className="GroupPage">
                <div className="GroupPage-info">
                    { groupInfo }
                </div>
            </div>
        );
    }
}
