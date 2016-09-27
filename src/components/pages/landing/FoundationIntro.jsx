import { FormattedMessage as Msg } from 'react-intl';
import React from 'react';
import { Link } from 'react-router';


export default class FoundationIntro extends React.Component {
    render() {
        return (
            <div className="FoundationIntro">
                <Msg id="pages.landing.foundation.h1" tagName="h2"/>
                <Msg id="pages.landing.foundation.h2" tagName="h3"/>
                <Msg id="pages.landing.foundation.paragraph" tagName="p"/>
                <Link to="https://zetkin.org/join">
                    <Msg id="pages.landing.foundation.infoLink"/></Link>
            </div>
        );
    }
}
