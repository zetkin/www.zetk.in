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
                    <h1>Welcome to Zetkin!</h1>
                    <p>You are not yet connected to any affiliated organization.</p>
                    <p>Please contact your membership official or check you organization's website for a join link.</p>
                </div>
            );
        }
        else {
            return null;
        }
    }
}
