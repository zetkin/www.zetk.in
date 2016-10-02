import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';
import { Link } from 'react-router';

import FormattedLink from '../misc/FormattedLink';
import LoadingIndicator from '../misc/LoadingIndicator';


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
            return <LoadingIndicator/>
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
                    <FormattedLink msgId="dashboard.events.more"
                        msgValues={{ numExtra }}
                        onClick={ this.onClickMore.bind(this) }/>
                );
            }

            return (
                <div className="AssignmentList">
                    <ul>
                    { assignments.toList().map(item => (
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
    let infoHref = '/call-assignments/' + assignment.get('id');
    let callHref = '//call.' + process.env.ZETKIN_DOMAIN
            + '/assignments/' + assignment.get('id') + '/call';

    return (
        <li className="AssignmentListItem">
            <h3><Link to={ infoHref }>{ title }</Link></h3>
            <p>
                { description }
            </p>
            <FormattedLink href={ callHref }
                msgId="dashboard.assignments.startCalling"/>
        </li>
    );
};
