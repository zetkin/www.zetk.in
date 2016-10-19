import React from 'react';
import cx from 'classnames';

import PropTypes from '../../../utils/PropTypes';
import CampaignCalendarWeek from './CampaignCalendarWeek';
import CampaignCalendarDay from './CampaignCalendarDay';


export default class CampaignCalendar extends React.Component {
    static propTypes = {
        actions: PropTypes.list.isRequired,
        bookings: PropTypes.list.isRequired,
        startDate: PropTypes.object,
        endDate: PropTypes.object,
    };

    render() {
        let startDate = this.props.startDate;
        let endDate = this.props.endDate;
        let bookings = this.props.bookings;
        let actions = this.props.actions.sort((a0, a1) => {
            let d0 = new Date(a0.get('start_time')),
                d1 = new Date(a1.get('start_time'));

            return d0.getTime() - d1.getTime();
        });

        if (!startDate && actions.size > 0) {
            startDate = new Date(actions.first().get('start_time'));
        }

        if (!endDate && actions.size > 0) {
            endDate = new Date(actions.last().get('end_time'));
        }

        // Always start on previous Monday
        let startDay = startDate.getDay();
        startDate.setDate(startDate.getDate() + 1 - (startDay? startDay : 7));

        // Always end on next Sunday
        endDate.setDate(endDate.getDate() + (7 - endDate.getDay()));

        // Don't show calendar when actions span less than seven days
        let duration = endDate.getTime() - startDate.getTime();
        if (duration < (7 * 24 * 60 * 60 * 1000)) {
            return null;
        }

        let d = new Date(startDate.toDateString());
        let weeks = [];
        let days = [];
        let idx = 0;

        while (d <= endDate) {
            let numDayActions = 0;
            let hasBookings = false;

            while (idx < actions.size) {
                let action = actions.get(idx);
                let ad = new Date(action.get('start_time'));

                if (d.getYear() == ad.getYear()
                    && d.getMonth() == ad.getMonth()
                    && d.getDate() == ad.getDate()) {
                    numDayActions++;
                    idx++;
                }
                else {
                    break;
                }

                hasBookings = hasBookings ||
                    bookings.contains(action.get('id').toString());
            }


            days.push(
                <CampaignCalendarDay key={ d } date={ new Date(d) }
                    numActions={ numDayActions }
                    hasBookings={ hasBookings }
                    />
            );

            if (d.getDay() == 0) {
                let week = d.getWeekNumber();
                weeks.push(
                    <CampaignCalendarWeek key={ week } week={ week}>
                        { days }
                    </CampaignCalendarWeek>
                );

                days = [];
            }

            d.setDate(d.getDate() + 1);
        }

        let classes = cx('CampaignCalendar', this.props.className);

        return (
            <div className={ classes }>
                { weeks }
            </div>
        );
    }
}
