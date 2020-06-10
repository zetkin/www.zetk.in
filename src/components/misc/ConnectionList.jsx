import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';
import { Link } from 'react-router';

import FormattedLink from '../../common/misc/FormattedLink';

import LoadingIndicator from '../../common/misc/LoadingIndicator';
import OrgAvatar from '../misc/OrgAvatar';


export default class ConnectionList extends React.Component {
    render() {
        let content = null;

        if (this.props.connectionList.isPending) {
            content = <LoadingIndicator />;
        }
        else {
            let list = this.props.connectionList;
            let items;

            if (list.get('items').size) {
                items = list.get('items').toList().map(i => {
                    let roleMsg = 'misc.connectionList.roles.' + (i.get('role') || 'none');
                    let org = i.get('organization');
                    let orgLink = "/o/" + org.get('id') + "/";

                    return (
                        <li key={ org.get('id') } className="ConnectionList-item">
                        <Link className="ConnectionList-orgLink" to={ orgLink }>
                            <OrgAvatar orgId={ org.get('id') }/>
                            <h3>{ org.get('title') }</h3>
                            <p className="ConnectionList-itemRole">
                                <Msg id={ roleMsg }/>
                            </p>
                        </Link>
                        { i.get('follow') ?
                            <FormattedLink className="ConnectionList-disconnect"
                                msgId="misc.connectionList.deleteLink"
                                onClick={ this.onDeleteLinkClick.bind(this, org) }
                                />
                            :
                            <FormattedLink className="ConnectionList-disconnect"
                                msgId="misc.connectionList.followLink"
                                onClick={ this.onFollowLinkClick.bind(this, org) }
                                />
                        }
                        </li>
                    );
                });
            }
            else {
                items = (
                    <div className="ConnectionList-empty">
                        <Msg id="misc.connectionList.empty"/>
                    </div>
                );
            }

            content = (
                <ul className="ConnectionList-list">
                    { items }
                </ul>
            );
        }

        return (
            <div className="ConnectionList">
                { content }
            </div>
        );
    }

    onDeleteLinkClick(org) {
        if (this.props.onDisconnect) {
            this.props.onDisconnect(org);
        }
    }

    onFollowLinkClick(org) {
        if(this.props.onFollow) {
            this.props.onFollow(org);
        }
    }
}
