import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';


export default class Welcome extends React.Component {

    render() {
        return (
            <div className="Welcome">
                <Msg tagName="h1" id="misc.welcome.header" />
                <Msg tagName="p" id="misc.welcome.notConnected" />
                <Msg tagName="p" id="misc.welcome.getLink" />
                <img src="/static/images/no-connections.png" alt="" title=""/>
            </div>
        );
    }
}
