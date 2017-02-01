import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';

import FormattedLink from '../../common/misc/FormattedLink';
import LoadingIndicator from '../../common/misc/LoadingIndicator';


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
        else if (assignmentList.get('items')
                && assignmentList.get('items').size > 0) {
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
            return (
                <div className="AssignmentList">
                    <Msg tagName="i" id="dashboard.assignments.none"/>
                </div>
            );
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
            <h3><a href={ callHref }>{ title }</a></h3>
            <p>
                { description }
            </p>
        </li>
    );
};
