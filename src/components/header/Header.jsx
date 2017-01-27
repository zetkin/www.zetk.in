import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';
import React from 'react';

import Button from '../../common/misc/Button';
import Logo from './Logo';
import UserContinueButton from './UserContinueButton';
import UserMenu from '../../common/misc/userMenu/UserMenu';


const mapStateToProps = state => ({
    user: state.get('user'),
    orgs: state.get('orgs'),
    assignments: state.get('callAssignments'),
});

@connect(mapStateToProps)
export default class Header extends React.Component {
    static propTypes = {
        showContinueButton: React.PropTypes.bool,
    };

    render() {
        let loginUrl = '//login.' + process.env.ZETKIN_DOMAIN
            + '/login?redirPath=/dashboard&appId=' + process.env.ZETKIN_APP_ID;

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

            let membership = this.props.orgs.getIn(['membershipList', 'items']);

            let isOfficial = membership.filter(item => item.get('role') != null);

            if (isOfficial.size > 0) {
                let organizeUrl = '//organize.' + process.env.ZETKIN_DOMAIN + '/';

                organizeLink = (
                    <Button href={ organizeUrl } labelMsg="header.organize"
                        className="Header-navLink linkOrganize"/>
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
