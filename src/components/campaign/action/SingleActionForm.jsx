import React from 'react';
import cx from 'classnames';
import ReactDOM from 'react-dom';
import { FormattedMessage as Msg } from 'react-intl';

import ActionFormTitle from './ActionFormTitle';
import ActionFormLocation from './ActionFormLocation';
import ActionFormTime from './ActionFormTime';
import ResponseWidget from './ResponseWidget';


export default class SingleActionForm extends React.Component {
    static propTypes = {
        onChange: React.PropTypes.func,
        isBooked: React.PropTypes.bool,
        response: React.PropTypes.bool,
    };

    constructor(props) {
        super(props);

        this.state = {
            viewMode: undefined,
        };
    }

    componentDidMount() {
        let node = ReactDOM.findDOMNode(this.refs.infoText);
        if (node) {
            if (node.clientHeight > 42) {
                this.setState({
                    viewMode: 'contracted',
                });
            }
        }
    }

    render() {
        let action = this.props.action;
        let activity = action.getIn(['activity', 'title']);

        let startTime = Date.create(action.get('start_time'),
            { fromUTC: true, setUTC: true });
        let endTime = Date.create(action.get('end_time'),
            { fromUTC: true, setUTC: true });

        // TODO: Find nice way to localize this
        let timeLabel = startTime.format('{HH}:{mm}')
            + ' - ' + endTime.format('{HH}:{mm}');

        let location = action.getIn(['location', 'title']);

        let infoText = null;
        if (action.get('info_text')) {
            infoText = [
                <p key="infoText" ref="infoText"
                    className="SingleActionForm-info">
                    { action.get('info_text') }
                </p>
            ];

            if (this.state.viewMode) {
                infoText.push(
                    <button
                        key="toggleExpandButton"
                        className="SingleActionForm-toggleExpandButton"
                        onClick={ this.onClickToggleExpandButton.bind(this) }>
                        </button>
                );
            }

        }

        let classes = cx('SingleActionForm', {
            contracted: this.state.viewMode === 'contracted',
            expanded: this.state.viewMode === 'expanded',
        });

        return (
            <div className={ classes }>
                <ActionFormTitle title={ activity } />
                <ActionFormLocation location={ location } />
                <ActionFormTime time={ timeLabel } />

                { infoText }

                <div className="SingleActionForm-response">
                    <ResponseWidget action={ action }
                        isBooked={ this.props.isBooked }
                        response={ this.props.response }
                        onChange={ this.onChange.bind(this) }/>
                </div>
            </div>
        );
    }

    onClickToggleExpandButton(ev) {
        ev.preventDefault();
        this.setState({
            viewMode: (this.state.viewMode === 'contracted')?
                'expanded' : 'contracted',
        });
    }

    onChange(action, ev) {
        if (this.props.onChange) {
            this.props.onChange(action, ev.target.checked);
        }
    }
};
