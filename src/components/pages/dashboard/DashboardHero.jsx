import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

import Button from '../../../common/misc/Button'
import PropTypes from '../../../utils/PropTypes';

const mapStateToProps = state => ({
    user: state.get('user'),
    campaignList: state.getIn(['campaigns', 'campaignList']),
});

@connect(mapStateToProps)
export default class DashboardHero extends React.Component {

    render() {
        let userData = this.props.user.get('data');
        let firstName = userData.get('first_name');
        let campaigns = this.props.campaignList.get('items');
        let campaignCount = campaigns.size;

        let greeting = (
            <div className="DashboardHero-greeting">
                <Msg tagName="h1" id="pages.dashboardPage.greeting.title"
                    values={{ name: firstName }}/>
                <Msg tagName="p" id="pages.dashboardPage.greeting.p"
                    values={{ count: campaignCount }}/>
                <Button key="toSignUpButton"
                    labelMsg="pages.dashboardPage.greeting.buttonLabel"
                    href="/assignments"
                    />
            </div>
        );

        return (
            <div className="DashboardHero">
                { greeting }
            </div>
        );
    }
}
