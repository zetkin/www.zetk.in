import { FormattedMessage as Msg } from 'react-intl';
import React from 'react';
import { Link } from 'react-router';


export default class ZetkinFeatures extends React.Component {
    render() {
        return (
            <section className="ZetkinFeatures">
                <Msg id="pages.landing.features.h1" tagName="h2"/>
                <Msg id="pages.landing.features.h2" tagName="h3"/>
                <ul className="ZetkinFeatures-features">
                    <li className="ZetkinFeatures-feature">
                        <img src="/static/img/logo-white.png"
                            className="ZetkinFeatures-featureIcon"
                            alt="Zetkin"/>
                        <Msg id="pages.landing.features.f1.title" tagName="h4"/>
                        <Msg id="pages.landing.features.f1.desc" tagName="p"/>
                    </li>
                    <li className="ZetkinFeatures-feature">
                        <img src="/static/img/logo-white.png"
                            className="ZetkinFeatures-featureIcon"
                            alt="Zetkin"/>
                        <Msg id="pages.landing.features.f2.title" tagName="h4"/>
                        <Msg id="pages.landing.features.f2.desc" tagName="p"/>
                    </li>
                    <li className="ZetkinFeatures-feature">
                        <img src="/static/img/logo-white.png"
                            className="ZetkinFeatures-featureIcon"
                            alt="Zetkin"/>
                        <Msg id="pages.landing.features.f3.title" tagName="h4"/>
                        <Msg id="pages.landing.features.f3.desc" tagName="p"/>
                    </li>
                    <li className="ZetkinFeatures-feature">
                        <img src="/static/img/logo-white.png"
                            className="ZetkinFeatures-featureIcon"
                            alt="Zetkin"/>
                        <Msg id="pages.landing.features.f4.title" tagName="h4"/>
                        <Msg id="pages.landing.features.f4.desc" tagName="p"/>
                    </li>
                </ul>
                <Link to="/register">
                    <Msg id="pages.landing.features.signUpLink"/></Link>
            </section>
        );
    }
}
