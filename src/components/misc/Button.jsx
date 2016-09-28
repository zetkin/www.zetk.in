import cx from 'classnames';
import { Link } from 'react-router';
import React from 'react';
import { injectIntl } from 'react-intl';


@injectIntl
export default class Button extends React.Component {
    static propTypes = {
        className: React.PropTypes.string,
        labelMsg: React.PropTypes.string.isRequired,
        labelValues: React.PropTypes.object,
        href: React.PropTypes.string,
        onClick: React.PropTypes.func,
    };

    render() {
        let msgId = this.props.labelMsg;
        let label = this.props.intl.formatMessage({ id: msgId },
            this.props.labelValues)

        let classes = cx('Button', this.props.className);

        let href = this.props.href;
        if (href) {
            if (href.indexOf('//')===0) {
                href = ((process.env.NODE_ENV === 'production')?
                    'https:' : 'http:') + href;

                return (
                    <a href={ href } className={ classes }
                        onClick={ this.props.onClick }>
                        { label }
                    </a>
                );
            }
            else {
                return (
                    <Link to={ href } className={ classes }>
                        { label }
                    </Link>
                );
            }
        }
        else {
            return (
                <button className={ classes }
                    onClick={ this.props.onClick }>
                    { label }
                </button>
            )
        }
    }
}
