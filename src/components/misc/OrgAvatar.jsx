import React from 'react';


export default class OrgAvatar extends React.Component {
    render() {
        const orgId = this.props.orgId;
        const avatarDomain = '//api.' + process.env.ZETKIN_DOMAIN;
        const avatarSrc = avatarDomain + '/orgs/' + orgId + '/avatar';

        return (
            <div className="OrgAvatar">
                <img src={ avatarSrc }/>
            </div>
        );
    }
}
