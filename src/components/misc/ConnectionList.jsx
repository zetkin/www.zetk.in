import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';

import LoadingIndicator from '../../common/misc/LoadingIndicator';
import OrgAvatar from '../misc/OrgAvatar';
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
                { this.props.connectionList.get('items').toList().map(i => {
                    let roleMsg = 'misc.connectionList.roles.' + (i.get('role') || 'none');
                    let org = i.get('organization');

                    return (
                        <li key={ org.get('id') } className="ConnectionList-item">
                            <OrgAvatar orgId={ org.get('id') }/>
                            <h3>{ org.get('title') }</h3>
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
