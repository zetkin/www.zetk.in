import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

import { retrieveUserActions } from '../../actions/action';

import ActionList from './ActionList';
import PropTypes from '../../utils/PropTypes';


const mapStateToProps = state => ({
    userActionList: state.getIn(['actions', 'userActionList']),
});

@connect(mapStateToProps)
export default class Dashboard extends React.Component {
    static propTypes = {
        userActionList: PropTypes.complexList,
    };

    componentDidMount() {
        this.props.dispatch(retrieveUserActions());
    }

    render() {
        let actionList = this.props.userActionList;

        return (
            <div className="Dashboard">
                <div className="Dashboard-campaigns">
                    <Msg tagName="h2" id="dashboard.campaigns.h"/>
                </div>
                <div className="Dashboard-events">
                    <Msg tagName="h2" id="dashboard.events.h"/>
                    <ActionList actionList={ actionList }/>
                </div>
                <div className="Dashboard-assignments">
                    <Msg tagName="h2" id="dashboard.assignments.h"/>
                </div>
            </div>
        );
    }
}
