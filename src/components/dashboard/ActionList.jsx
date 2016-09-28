import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';


export default class ActionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            maxVisible: 4,
        };
    }

    render() {
        let actionList = this.props.actionList;

        if (actionList.get('isPending')) {
            // TODO: Proper loading indicator
            return <span>LOADING!</span>;
        }
        else if (actionList.get('error')) {
            // TODO: Proper error message
            return <span>ERROR!</span>;
        }
        else if (actionList.get('items')) {
            let actions = actionList.get('items');

            if (this.state.maxVisible) {
                actions = actions.slice(0, this.state.maxVisible);
            }

            return (
                <div className="ActionList">
                    <ul>
                    { actions.map(item => (
                        <ActionItem key={ item.get('id') }
                            action={ item }/>
                    ))}
                    </ul>
                </div>
            );
        }
        else {
            return null;
        }
    }
}

const ActionItem = props => {
    let action = props.action;
    let startTime = action.get('start_time');
    let activity = action.getIn(['activity', 'title']);

    return (
        <li>
            <FormattedDate className="ActionList-itemDate"
                month="numeric" day="numeric" value={ startTime }/>
            <FormattedTime className="ActionList-itemTime"
                hour="numeric" minute="numeric" value={ startTime }/>
            <span className="ActionList-itemActivity">{ activity }</span>
        </li>
    );
};
