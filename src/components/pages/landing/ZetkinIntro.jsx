import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';


export default class ZetkinIntro extends React.Component {
    render() {
        return (
            <section className="ZetkinIntro">
                <Msg tagName="h2" id="pages.landing.zetkin.h1"/>
                <Msg tagName="h3" id="pages.landing.zetkin.h2"/>
                <Msg className="ZetkinIntro-text" tagName="p" id="pages.landing.zetkin.paragraph"/>
                <ul className="ZetkinIntro-highlights">
                    <li className="ZetkinIntro-highlight">
                        <Msg id="pages.landing.zetkin.usp1"/>
                    </li>
                    <li className="ZetkinIntro-highlight">
                        <Msg id="pages.landing.zetkin.usp2"/>
                    </li>
                    <li className="ZetkinIntro-highlight">
                        <Msg id="pages.landing.zetkin.usp3"/>
                    </li>
                </ul>
            </section>
        );
    }
}
