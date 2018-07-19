import React from 'react';

import ConnectInfo from './ConnectInfo';
import FoundationIntro from './FoundationIntro';
import SignUpSplash from './SignUpSplash';
import ZetkinIntro from './ZetkinIntro';
import ZetkinFeatures from './ZetkinFeatures';


export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="LandingPage">
                <SignUpSplash/>
                <ZetkinIntro/>
                <ZetkinFeatures/>
                <FoundationIntro/>
                <ConnectInfo/>
            </div>
        );
    }
}
