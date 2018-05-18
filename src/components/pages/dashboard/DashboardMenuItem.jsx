import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';

import PropTypes from '../../../utils/PropTypes';
import cx from 'classnames';

export default class DashboardMenuItem extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        title: PropTypes.string,
        sub: PropTypes.string,
        disabled: PropTypes.bool,
        selected: PropTypes.bool,
        onSelection: React.PropTypes.func,
    };

    constructor(props) {
        super(props);
    }

    render() {
        let name = this.props.name;

        let classes = cx('DashboardMenuItem',
            this.props.name, {
            disabled: this.props.disabled,
            selected: this.props.selected,
        });

        return (
            <li className={ classes }
                onClick={ this.onClick.bind(this) }>
                <div className="DashboardMenuItem-icon"></div>
                <div className="DashboardMenuItem-info">
                    <span className="DashboardMenuItem-infoTitle">
                        <Msg id={ this.props.title }/>
                    </span>
                    <span className="DashboardMenuItem-infoSub">
                        { this.props.sub }
                    </span>
                </div>
            </li>
        );
    }

    onClick(ev) {
        if (this.props.onSelection) {
            this.props.onSelection(!this.props.selected);
        }
    }
}