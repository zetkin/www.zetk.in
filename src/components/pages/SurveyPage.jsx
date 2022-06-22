import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';
import { connect } from 'react-redux';

import LoadingIndicator from '../../common/misc/LoadingIndicator';
import SurveyForm from '../../common/surveyForm/SurveyForm';
import { survey } from '../../store/surveys';
import { retrieveSurvey } from '../../actions/survey';


const mapStateToProps = (state, props) => {
    let s = survey(state, props.params.surveyId);
    let isConnected = false;

    if (s) {
        let orgId = s.getIn(['organization', 'id']);
        if (orgId) {
            isConnected = !!state.getIn(
                ['orgs', 'membershipList', 'items', orgId.toString() ]);
        }
    }

    return {
        isConnected,
        survey: s,
        user: state.getIn(['user', 'data']),
    };
}

@connect(mapStateToProps)
export default class SurveyPage extends React.Component {
    componentDidMount() {
        let orgId = this.props.params.orgId;
        let surveyId = this.props.params.surveyId;

        if (!this.props.survey) {
            this.props.dispatch(retrieveSurvey(orgId, surveyId));
        }
    }

    render() {
        let survey = this.props.survey;
        let surveyInfo;
        let form = null;

        if (survey && survey.get('isPending')) {
            surveyInfo = <LoadingIndicator />;
        }
        else if (!survey || survey.get('error')) {
            surveyInfo = <Msg id="pages.survey.notFound.h"/>;
        }
        else if (survey) {
            surveyInfo = [
                <h2 key="title">{ survey.get('title') }</h2>,
                <span key="org" className="SurveyPage-infoOrg">
                    { survey.getIn(['organization', 'title']) }
                </span>,
                <p key="infoText">
                    { survey.get('info_text') }
                </p>
            ];

            let sigOptions = [];
            if (survey.get('signature') == 'allow_anonymous' || survey.get('signature') == 'require_signature') {
                sigOptions.push('email')
            }
            if (survey.get('signature') == 'allow_anonymous' || survey.get('signature') == 'force_anonymous') {
                sigOptions.push('anon');
            }
            if (this.props.isConnected && survey.get('signature') != 'force_anonymous') {
                sigOptions.unshift('user');
            }

            form = (
                <SurveyForm survey={ survey }
                    user={ this.props.user }
                    signatureOptions={ sigOptions }
                    />
            );
        }

        return (
            <div className="SurveyPage">
                <div className="SurveyPage-info">
                    { surveyInfo }
                </div>
                { form }
            </div>
        );
    }

    onResponse(action, checked) {
        this.props.dispatch(updateActionResponse(action, checked));
    }
}
