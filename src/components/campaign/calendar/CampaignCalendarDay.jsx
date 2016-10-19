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
            });

        let link = null;
        if (this.props.hasBookings || this.props.numActions > 0) {
            let fragment = date.format('{yyyy}-{MM}-{dd}');
            let href = '#' + fragment;

            link = (
                <a className="CampaignCalendarDay-link"
                    href={ href }/>
            );
        }

        return (
            <li className={ classes }>
                { link }
            </li>
        );
    }
}
