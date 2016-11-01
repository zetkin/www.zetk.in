import React from 'react';
import cx from 'classnames';

import Link from '../../misc/FormattedLink';
import PropTypes from '../../../utils/PropTypes';
import ActionFormTitle from './ActionFormTitle';
import ActionFormLocation from './ActionFormLocation';
import ActionFormTime from './ActionFormTime';
import ResponseWidget from './ResponseWidget';


export default class MultiLocationActionForm extends React.Component {
    static propTypes = {
        actions: PropTypes.array.isRequired,
        bookings: PropTypes.array.isRequired,
        responses: PropTypes.array.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            expanded: true,
        };
    }

    componentDidMount() {
        let numBookings = this.props.bookings.length;
        let numResponses = this.props.responses.length;
        let numActions = this.props.actions.length;

        if (numBookings === 0 && (numResponses === numActions || !numResponses)
            || numBookings == numActions) {
            // All yes or all no means we can collapse
            this.setState({
                expanded: false,
            });
        }
    }

    render() {
        let actions = this.props.actions;

        let startTime = Date.create(actions[0].get('start_time'),
            { fromUTC: true, setUTC: true });
        let endTime = Date.create(actions[0].get('end_time'),
            { fromUTC: true, setUTC: true });

        // TODO: Find nice way to localize this
        let timeLabel = startTime.format('{HH}:{mm}')
            + ' - ' + endTime.format('{HH}:{mm}');

        let content;

        if (this.state.expanded) {
            let locItems = actions.map(action => {
                let id = action.get('id');
                let locLabel = action.getIn(['location', 'title']);

                let isBooked = this.props.bookings
                    .indexOf(action.get('id').toString()) >= 0;
                let response = this.props.responses
                    .indexOf(action.get('id').toString()) >= 0;

                return (
                    <li key={ locLabel }
                        className="MultiLocationActionForm-locationItem">
                        <ActionFormLocation location={ locLabel } />
                        <ResponseWidget action={ action }
                            isBooked={ isBooked } response={ response }
                            onChange={ this.onChange.bind(this) }/>
                    </li>
                );
            });

            content = (
                <ul className="MultiLocationactionForm-locations">
                    { locItems }
                </ul>
            );
        }
        else {
            let isBooked = this.props.bookings.length === actions.length;
            let response = this.props.responses.length === actions.length;

            content = [
                <Link key="multiLocationLink"
                    className="MultiLocationActionForm-locationsLink"
                    msgId="campaignForm.action.multiLocationLabel"
                    msgValues={{ count: actions.length }}
                    onClick={ this.onClickExpand.bind(this) }/>,
                <ResponseWidget key="responseWidget"
                    action={ actions[0] }
                    isBooked={ isBooked }
                    response={ response }
                    onChange={ this.onChangeAll.bind(this) }/>
            ];
        }

        let classes = cx('MultiLocationActionForm', {
            expanded: this.state.expanded,
        });

        return (
            <div className="MultiLocationActionForm">
                <ActionFormTitle
                    title={ actions[0].getIn(['activity', 'title']) } />
                <ActionFormTime time={ timeLabel } />
                { content }
            </div>
        );
    }

    onClickExpand() {
        this.setState({
            expanded: true,
        });
    }

    onChange(action, ev) {
        if (this.props.onChange) {
            this.props.onChange(action, ev.target.checked);
        }
    }

    onChangeAll(action, ev) {
        if (this.props.onChange) {
            for (let i = 0; i < this.props.actions.length; i++) {
                let action = this.props.actions[i];
                this.props.onChange(action, ev.target.checked);
            }
        }
    }
}
