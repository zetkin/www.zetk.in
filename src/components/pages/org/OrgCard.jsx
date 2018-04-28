import React from 'react';

import OrgAvatar from '../../misc/OrgAvatar';

export default class OrgCard extends React.Component {
    render() {
        if (this.props.orgItem) {
            let orgDescription, orgWebsite;
            let org = this.props.orgItem;
            if (org.get('description')) {
                orgDescription = <p className="OrgCard-description">org.get('description')</p>
            }
            if (org.get('website')) {
                orgWebsite = <a href={org.get('website')} className="OrgCard-website">org.get('website')</a>
            }

            return (
                <div className="OrgCard">
                    <OrgAvatar orgId={ org.get('id') }/>
                    <div className="OrgPage-info">
                        <h1 className="OrgCard-title">{ org.get('title') }</h1>
                        {orgDescription}
                        {orgWebsite}
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}
