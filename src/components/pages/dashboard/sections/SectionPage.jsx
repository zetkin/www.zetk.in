import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { FormattedMessage as Msg } from 'react-intl';

import { componentClassNames } from '../../..';

export default class SectionPage extends React.Component {

    render() {
        const data = this.getRenderData();

        const classes = cx(componentClassNames(this));

        let title = <Msg tagName="h1"
                id={ this.getSectionTitle(data) }/>;

        return (
            <div className={ classes }>
                <div className="SectionPage-title">{ title }</div>
                <div className="SectionPage-content">
                    { this.renderSectionContent(data) }
                </div>
            </div>
        );
    }

    getSectionTitle(data) {
        throw "Must implement getSectionTitle()";
    }

    renderSectionContent(data) {
        return null;
    }

    getRenderData() {
        return {};
    }
}
