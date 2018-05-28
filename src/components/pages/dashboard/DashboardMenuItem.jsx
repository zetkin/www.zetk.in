import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage as Msg } from 'react-intl';
import { Link } from 'react-router';

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
            <li className={ classes } >
                <Link onClick={ this.props.className }
                    to={ this.props.to }>
                    <div className="DashboardMenuItem-icon"></div>
                    <div className="DashboardMenuItem-info">
                        <span className="DashboardMenuItem-infoTitle">
                            <Msg id={ this.props.title }/>
                        </span>
                        <span className="DashboardMenuItem-infoSub">
                            { this.props.sub }
                        </span>
                    </div>
                </Link>
            </li>
        );
    }
}