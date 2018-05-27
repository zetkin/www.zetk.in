import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormattedMessage as Msg } from 'react-intl';

import LoadingIndicator from '../../common/misc/LoadingIndicator';
import { retrieveRecommendedOrganizations } from '../../actions/org';



const mapStateToProps = state => ({
    recList: state.getIn(['orgs', 'recommendedOrgsList']),
});


@withRouter
@connect(mapStateToProps)
export default class Welcome extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            retrievedRecommendations: false,
        };
    }

    componentDidMount() {
        this.props.dispatch(retrieveRecommendedOrganizations());

        this.setState({
            retrievedRecommendations: true,
        });
    }

    render() {
        let connectElement = null;

        if (this.state.retrievedRecommendations) {
            const recList = this.props.recList;
            let connectContent = null;
            let modClass;

            if (recList.get('isPending')) {
                modClass = 'pending';
                connectContent = [
                    <LoadingIndicator key="loadingIndicator"/>,
                    <Msg key="p" tagName="p" id="misc.welcome.recommendations.loading" />,
                ];
            }
            else if (recList.get('items').size) {
                let orgItems = recList.get('items').toList().map(org => {
                    const logoSrc = '//api.'
                        + process.env.ZETKIN_DOMAIN + '/v1/orgs/'
                        + org.get('id') + '/avatar';

                    return (
                        <li key={ org.get('id') }
                            className="Welcome-orgItem"
                            onClick={ this.onOrgItemClick.bind(this, org) }
                            >

                            <img src={ logoSrc }/>
                            <span>{ org.get('title') }</span>
                        </li>
                    );
                });

                modClass = 'withRecommendations';
                connectContent = [
                    <Msg key="p0" tagName="p"
                        id="misc.welcome.recommendations.intro"
                        values={{ count: orgItems.size }}/>,
                    <ul key="list" className="Welcome-orgList">
                        { orgItems }
                    </ul>
                ];
            }
            else {
                modClass = 'noRecommendations';
                connectContent = [
                    <Msg key="h" tagName="h2" id="misc.welcome.recommendations.none.h" />,
                    <Msg key="p" tagName="p" id="misc.welcome.recommendations.none.p" />,
                ];
            }

            connectElement = (
                <div className={ 'Welcome-connect ' + modClass }>
                    { connectContent }
                </div>
            );
        }

        return (
            <div className="Welcome">
                <Msg tagName="h1" id="misc.welcome.header" />
                <Msg key="p" tagName="p" id="misc.welcome.intro" />
                <img className="Welcome-illustration"
                    src="/static/images/no-connections.png" alt="" title=""/>
                { connectElement }
            </div>
        );
    }

    onOrgItemClick(org) {
        const url = '/o/' + (org.get('slug') || org.get('id'));

        this.props.router.push(url);
    }
}
