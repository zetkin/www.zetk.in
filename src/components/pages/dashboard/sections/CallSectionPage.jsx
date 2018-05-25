import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

import { retrieveUserAssignments } from '../../../../actions/callAssignment';

import Button from '../../../../common/misc/Button';
import SectionPage from './SectionPage';

import AssignmentList from '../../../dashboard/AssignmentList';
import ConnectionList from '../../../misc/ConnectionList';

const mapStateToProps = state => ({
    assignmentList: state.getIn(['callAssignments', 'assignmentList']),
});


@connect(mapStateToProps)
export default class CallSectionPage extends SectionPage {

    renderSectionContent(data) {

        let assignmentList = this.props.assignmentList;
        let assignments = assignmentList.get('items');

        return [
            <div className="CallSectionPage-assignments"
                key="connected">
                <Msg tagName="h3"
                    id="pages.dashboardPage.section.call.assignments.title"
                    />
                <Msg tagName="p"
                    id="pages.dashboardPage.section.call.assignments.desc"
                    values={{ count: (assignments? assignments.size : 0) }} />
                <AssignmentList assignmentList={ assignmentList }/>
            </div>
        ];
    }

    getSectionTitle(data) {
        return "pages.dashboardPage.section.call.title";
    }

    getSectionDesc(data) {
        return <Msg tagName="p"
                    id="pages.dashboardPage.section.call.desc" />;
    }
}
