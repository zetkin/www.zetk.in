import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';

import Link from '../misc/FormattedLink';



export default class AssignmentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maxVisible: 3,
        };
    }

    render() {
        let assignmentList = this.props.assignmentList;

        if (assignmentList.get('isPending')) {
            // TODO: Proper loading indicator
            return <span>LOADING!</span>;
        }
        else if (assignmentList.get('error')) {
            // TODO: Proper error message
            return <span>ERROR!</span>;
        }
        else if (assignmentList.get('items')) {
            let moreLink;
            let maxVisible = this.state.maxVisible;
            let assignments = assignmentList.get('items');

            if (maxVisible && assignments.size > maxVisible) {
                let numExtra = assignments.size - maxVisible;
                assignments = assignments.slice(0, maxVisible);

                moreLink = (
                    <Link msgId="dashboard.events.more"
                        msgValues={{ numExtra }}
                        onClick={ this.onClickMore.bind(this) }/>
                );
            }

            return (
                <div className="AssignmentList">
                    <ul>
                    { assignments.map(item => (
                        <AssignmentListItem key={ item.get('id') }
                            assignment={ item }/>
                    ))}
                    </ul>
                    { moreLink }
                </div>
            );
        }
        else {
            return null;
        }
    }

    onClickMore(ev) {
        this.setState({
            maxVisible: undefined,
        });
    }
}

const AssignmentListItem = props => {
    let assignment = props.assignment;
    let title = assignment.get('title');
    let description = assignment.get('description');
    let href = '/call-assignments/' + assignment.get('id');

    return (
        <li className="AssignmentListItem">
            <h3>{ title }</h3>
            <p>
                { description }
            </p>
            <Link href={ href }
                msgId="dashboard.assignments.startCalling"/>
        </li>
    );
};
