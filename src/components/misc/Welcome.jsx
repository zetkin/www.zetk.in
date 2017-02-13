import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

const mapStateToProps = state => ({
    membershipList: state.getIn(['orgs', 'membershipList']),
});

@connect(mapStateToProps)
export default class Welcome extends React.Component {

    render() {
        let membershipList = this.props.membershipList;

        if (!membershipList.get('items').size > 0) {
            return (
                <div className="Welcome">
                    <Msg tagName="h1" id="misc.welcome.header" />
                    <Msg tagName="p" id="misc.welcome.notConnected" />
                    <Msg tagName="p" id="misc.welcome.getLink" />
                </div>
            );
        }
        else {
            return null;
        }
    }
}
