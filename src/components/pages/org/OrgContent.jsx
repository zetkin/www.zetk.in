import React from 'react';
import { FormattedMessage as Msg, injectIntl } from 'react-intl';

import FormattedLink from '../../../common/misc/FormattedLink';
import OrgSignUp from './OrgSignUp';
import ConnectLink from './ConnectLink';

@injectIntl
export default class OrgContent extends React.Component {
    render() {
        const {isAuthenticated, isMember, orgItem, user} = this.props
        let content =[];
        if (isMember) {
            content = null;
        }
        else if (isAuthenticated) {
            content.push(
                <div className="OrgContent-column" key="connect">
                    <Msg tagName="h2" id="pages.orgPage.connect.title"
                    values={ {name:  user.get('first_name')}}
                    />
                    <Msg tagName="p" id="pages.orgPage.connect.description"
                        values={ {org:  orgItem.get('title')}}/>
                    <div className="OrgContent-cta">
                        <ConnectLink isAuthenticated={this.props.isAuthenticated}
                            isMember={this.props.isMember}
                            orgItem={orgItem}
                            />
                    </div>
                </div>
            );
        }
        else {
            let infoHref = this.props.intl.formatMessage(
                { id: 'pages.orgPage.zetkin.infoLink.href' });
                content.push(
                    <div className="OrgContent-column" key="description">
                    <Msg tagName="h2" id="pages.orgPage.zetkin.title"/>
                    <Msg tagName="p" id="pages.orgPage.zetkin.description"
                    values={ {org:  orgItem.get('title')}}
                    />
                    <p>
                    <FormattedLink href={ infoHref }
                        msgId="pages.orgPage.zetkin.infoLink.text"/>
                    </p>
                </div>
                );
                content.push(
                    <div className="OrgContent-column" key="signup"><OrgSignUp/></div>
                );
        }
        return (
            <div className="OrgContent">
                {content}
            </div>
        )
    }
}
