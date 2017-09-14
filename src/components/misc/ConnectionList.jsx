import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';

import LoadingIndicator from '../../common/misc/LoadingIndicator';
import Button from '../../common/misc/Button';


export default class ConnectionList extends React.Component {
    render() {
        let content = null;

        if (this.props.connectionList.isPending) {
            content = <LoadingIndicator />;
        }
        else {
            content = (
                <ul className="ConnectionList-list">
                { this.props.connectionList.get('items').map(i => {
                    let roleMsg = 'misc.connectionList.roles.' + (i.get('role') || 'none');

                    return (
                        <li key={ i.get('id') } className="ConnectionList-item">
                            <h3>{ i.getIn(['organization', 'title']) }</h3>
                            <p className="ConnectionList-itemRole">
                                <Msg id={ roleMsg }/>
                            </p>
                            <Button labelMsg="misc.connectionList.deleteButton"/>
                        </li>
                    );
                })}
                </ul>
            );
        }

        return (
            <div className="ConnectionList">
                { content }
            </div>
        );
    }
}
