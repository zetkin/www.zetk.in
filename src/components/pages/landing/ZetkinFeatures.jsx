import { FormattedMessage as Msg } from 'react-intl';
import React from 'react';

import FormattedLink from '../../../common/misc/FormattedLink';


export default class ZetkinFeatures extends React.Component {
    render() {
        return (
            <section className="ZetkinFeatures">
                <Msg id="pages.landing.features.h1" tagName="h2"/>
                <ul className="ZetkinFeatures-features">
                    <li className="ZetkinFeatures-feature">
                        <img src="/static/img/home/features/yourorg.png"
                            className="ZetkinFeatures-featureIcon"
                            alt="Zetkin"/>
                        <Msg id="pages.landing.features.f1.title" tagName="h4"/>
                        <Msg id="pages.landing.features.f1.desc" tagName="p"/>
                    </li>
                    <li className="ZetkinFeatures-feature">
                        <img src="/static/img/home/features/mypage.png"
                            className="ZetkinFeatures-featureIcon"
                            alt="Zetkin"/>
                        <Msg id="pages.landing.features.f2.title" tagName="h4"/>
                        <Msg id="pages.landing.features.f2.desc" tagName="p"/>
                    </li>
                    <li className="ZetkinFeatures-feature">
                        <img src="/static/img/home/features/inthestreets.png"
                            className="ZetkinFeatures-featureIcon"
                            alt="Zetkin"/>
                        <Msg id="pages.landing.features.f3.title" tagName="h4"/>
                        <Msg id="pages.landing.features.f3.desc" tagName="p"/>
                    </li>
                    <li className="ZetkinFeatures-feature">
                        <img src="/static/img/home/features/phonebanking.png"
                            className="ZetkinFeatures-featureIcon"
                            alt="Zetkin"/>
                        <Msg id="pages.landing.features.f4.title" tagName="h4"/>
                        <Msg id="pages.landing.features.f4.desc" tagName="p"/>
                    </li>
                </ul>
                <FormattedLink href="/register"
                    msgId="pages.landing.features.signUpLink"
                    onClick={ this.onSignUpLinkClick.bind(this) }/>
            </section>
        );
    }

    onSignUpLinkClick() {
        let animatedScrollTo = require('animated-scrollto');
        let signUpSplash = document.querySelector('.SignUpSplash');

        animatedScrollTo(document.body, 0, 500);
    }
}
