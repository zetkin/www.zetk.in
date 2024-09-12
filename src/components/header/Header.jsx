import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';
import React from 'react';

import Button from '../../common/misc/Button';
import Logo from './Logo';
import UserContinueButton from './UserContinueButton';
import UserMenu from '../../common/misc/userMenu/UserMenu';
import OrganizePopup from './OrganizePopup';


const mapStateToProps = state => ({
    user: state.get('user'),
    orgs: state.get('orgs'),
    assignments: state.get('callAssignments'),
});

@connect(mapStateToProps)
export default class Header extends React.Component {
    static propTypes = {
        currentPath: React.PropTypes.string.isRequired,
        showContinueButton: React.PropTypes.bool,
    };

    render() {
        const redirPath = (this.props.currentPath == '/')?
            '/dashboard' : this.props.currentPath;

        const loginUrl = '//www.' + process.env.ZETKIN_DOMAIN
            + '/dashboard';

        let userWidget;
        let organizeLink;
        let callLink;

        let userData = this.props.user.get('data');
        let isAuthenticated = !!userData;

        if (isAuthenticated && this.props.showContinueButton) {
            userWidget = (
                <UserContinueButton user={ userData }/>
            );
        }
        else if (isAuthenticated) {
            userWidget = (
                <UserMenu user={ userData }/>
            );

            let callAssignments = this.props.assignments.getIn(['assignmentList', 'items']);

            if (callAssignments && callAssignments.size > 0) {
                let callUrl = '//call.' + process.env.ZETKIN_DOMAIN + '/';

                callLink = (
                    <Button href={  callUrl } labelMsg="header.call"
                            className="Header-navLink linkCall"/>
                );
            }

            let memberships = this.props.orgs.getIn(['followingList', 'items']);

            let isOfficial = memberships && !!memberships.find(item => item.get('role') != null);

            if (isOfficial) {
                let organizeUrl = '//organize.' + process.env.ZETKIN_DOMAIN + '/';
                let gen3Url = process.env.ZETKIN_APP_URL + '/organize/';

                organizeLink = (
                    <OrganizePopup organizeUrl={organizeUrl} gen3Url={gen3Url} />
                );
            }
        }
        else {
            userWidget = (
                <Button href={ loginUrl } labelMsg="header.login"
                    className="Header-loginButton"/>
            );
        }

        return (
            <div className="Header">
                <Logo/>
                <div className="Header-nav">
                    { userWidget }
                    { callLink }
                    { organizeLink }
                </div>
            </div>
        );
    }
}
