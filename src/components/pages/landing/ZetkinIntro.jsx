import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';


export default class ZetkinIntro extends React.Component {
    render() {
        return (
            <div className="ZetkinIntro">
                <Msg tagName="h2" id="pages.landing.zetkin.h1"/>
                <Msg tagName="h3" id="pages.landing.zetkin.h2"/>
                <Msg tagName="p" id="pages.landing.zetkin.paragraph"/>
                <ul className="ZetkinIntro-highlights">
                    <Msg tagName="li" id="pages.landing.zetkin.usp1"/>
                    <Msg tagName="li" id="pages.landing.zetkin.usp2"/>
                    <Msg tagName="li" id="pages.landing.zetkin.usp3"/>
                </ul>
            </div>
        );
    }
}
