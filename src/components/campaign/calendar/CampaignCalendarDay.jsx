import React from 'react';
import cx from 'classnames';


export default class CampaignCalendarDay extends React.Component {
    static propTypes = {
        numActions: React.PropTypes.number.isRequired,
        hasBookings: React.PropTypes.bool,
    };

    render() {
        let date = this.props.date;
        let classes = cx(
            'CampaignCalendarDay',
            'CampaignCalendarDay-month' + date.getMonth(), {
                'hasActions': this.props.numActions > 0,
                'hasBookings': this.props.hasBookings,
                'hasResponses': this.props.hasResponses,
            });

        let link = null;
        if (this.props.hasBookings || this.props.numActions > 0) {
            let fragment = date.format('{yyyy}-{MM}-{dd}');
            let href = '#' + fragment;

            link = (
                <a className="CampaignCalendarDay-link"
                    onClick={ this.onClick.bind(this, fragment) }
                    href={ href }/>
            );
        }

        return (
            <li className={ classes }>
                { link }
            </li>
        );
    }

    onClick(fragment, ev) {
        ev.preventDefault();

        let target = document.getElementById(fragment);
        let rect = target.getBoundingClientRect();
        let scrollTop = rect.top;

        let animatedScrollTo = require('animated-scrollto');
        let duration = 200 + scrollTop / 15;
        animatedScrollTo(document.body, scrollTop, duration);
    }
}
