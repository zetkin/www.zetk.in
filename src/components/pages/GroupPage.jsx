import React from 'react';
import { injectIntl, FormattedMessage as Msg } from 'react-intl';
import { connect } from 'react-redux';
import cx from 'classnames';

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
        memberList: state.getIn(['groups', 'membersByGroup', props.params.groupId.toString()]),
    };
}

@connect(mapStateToProps)
@injectIntl
export default class GroupPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            memberFilter: '',
        };
    }

    componentDidMount() {
        let orgId = this.props.params.orgId;
        let groupId = this.props.params.groupId;

        if (!this.props.group) {
            this.props.dispatch(retrieveGroup(orgId, groupId));
            this.props.dispatch(retrieveGroupMembers(orgId, groupId));
        }
    }

    render() {
        let group = this.props.group;
        let groupInfo;
        let memberContent = null;

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
                </p>,
            ];

            const memberList = this.props.memberList;

            if (memberList && memberList.get('isPending')) {
                memberContent = <LoadingIndicator/>;
            }
            else if (memberList && memberList.get('items')) {
                let items = memberList.get('items').toList();

                if (this.state.memberFilter) {
                    const filter = this.state.memberFilter.toLowerCase();

                    items = items.filter(item => {
                        const name = item.get('first_name') + ' ' + item.get('last_name');

                        if (name.toLowerCase().indexOf(filter) >= 0) {
                            return true;
                        }

                        if (item.get('email') && item.get('email').toLowerCase().indexOf(filter) >= 0) {
                            return true;
                        }

                        if (item.get('phone')) {
                            const phone = item.get('phone').replace(/\D/, '');

                            if (phone.indexOf(filter) >= 0) {
                                return true;
                            }
                        }

                        return false;
                    });
                }

                items = items.sort((i0, i1) => {
                    const n0 = i0.get('first_name') + ' ' + i0.get('last_name');
                    const n1 = i1.get('first_name') + ' ' + i1.get('last_name');
                    if (n0 < n1) { return -1; }
                    if (n0 > n1) { return 1; }
                    return 0;
                });

                let memberListItems = items.toList().map(item => {
                    const name = item.get('first_name') + ' ' + item.get('last_name');
                    const isManager = item.get('role') == 'manager';

                    let email = item.get('email');
                    if (email) {
                        const emailHref = 'mailto:' + email;
                        email = <a href={ emailHref }>{ email }</a>;
                    }

                    const classes = cx('GroupPage-memberListItem', {
                        manager: isManager,
                    });

                    let roleLabel = null;
                    if (isManager) {
                        roleLabel = this.props.intl.formatMessage(
                            { id: 'pages.group.members.list.managerLabel' },
                            { name: item.get('first_name') });
                    }

                    return (
                        <li key={ item.get('id') } className={ classes }>
                            <span title={ roleLabel }></span>
                            <span title={ name }>{ name }</span>
                            <span title={ item.get('email') }>{ email }</span>
                            <span title={ item.get('phone') }>{ item.get('phone') }</span>
                        </li>
                    );
                });

                memberContent = (
                    <div className="GroupPage-members">
                        <Msg tagName="h3" id="pages.group.members.h"/>
                        <div className="GroupPage-memberFilter">
                            <input
                                value={ this.state.memberFilter }
                                onChange={ this.onFilterChange.bind(this) }
                                />
                        </div>
                        <div className="GroupPage-memberList">
                            <div className="GroupPage-memberListHeader">
                                <span></span>
                                <Msg id="pages.group.members.list.name"/>
                                <Msg id="pages.group.members.list.email"/>
                                <Msg id="pages.group.members.list.phone"/>
                            </div>
                            <div className="GroupPage-memberListContent">
                                <ul>
                                    { memberListItems }
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="GroupPage">
                <div className="GroupPage-info">
                    { groupInfo }
                </div>
                { memberContent }
            </div>
        );
    }

    onFilterChange(ev) {
        this.setState({
            memberFilter: ev.target.value,
        });
    }
}
