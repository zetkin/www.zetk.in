import { FormattedMessage as Msg } from 'react-intl';
import React from 'react';
import { Link } from 'react-router';


export default class ConnectInfo extends React.Component {
    render() {
        return (
            <section className="ConnectInfo">
                <Msg id="pages.landing.connect.h1" tagName="h2"/>
                <Msg id="pages.landing.connect.h2" tagName="h3"/>
                <Msg id="pages.landing.connect.paragraph" tagName="p"/>
                <Link to="https://zetkin.org/join">
                    <Msg id="pages.landing.connect.applyLink"/></Link>
            </section>
        );
    }
}
