import React from 'react';
import cx from 'classnames';

import { componentClassNames } from '../';


export default class SimplePageBase extends React.Component {
    render() {
        let classes = cx(componentClassNames(this));

        return (
            <div className={ classes }>
                { this.renderContent() }
            </div>
        );
    }

    renderContent() {
        return null;
    }
}
