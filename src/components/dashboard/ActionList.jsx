import React from 'react';


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
                        <ActionListItem key={ item.get('id') }
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

const ActionListItem = props => {
    let action = props.action;
    let activity = action.getIn(['activity', 'title']);
    let startTime = Date.create(action.get('start_time'),
        { fromUTC: true, setUTC: true });

    return (
        <li className="ActionListItem">
            <span className="ActionListItem-dateTime">
                { startTime.format('{d}/{M} {HH}:{mm}') }</span>
            <span className="ActionListItem-activity">{ activity }</span>
        </li>
    );
};
