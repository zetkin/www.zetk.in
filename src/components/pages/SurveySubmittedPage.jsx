import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';
import { connect } from 'react-redux';

import SimplePageBase from './SimplePageBase';
import Button from '../../common/misc/Button';
import { survey } from '../../store/surveys';
import { organization } from '../../store/orgs';
import { retrieveSurvey } from '../../actions/survey';


const mapStateToProps = (state, props) => {
    let s = survey(state, props.params.surveyId);

    return {
        survey: s,
    };
}

@connect(mapStateToProps)
export default class SurveyPage extends SimplePageBase {
    componentDidMount() {
        let orgId = this.props.params.orgId;
        let surveyId = this.props.params.surveyId;

        if (!this.props.survey) {
            this.props.dispatch(retrieveSurvey(orgId, surveyId));
        }
    }

    renderContent() {
        let survey = this.props.survey;
        let values = {
            survey: survey.get('title'),
        }
        
        return (
            <div className="SurveySubmittedPage">
                <Msg key="h" tagName="h1" id="pages.surveySubmitted.h"/>
                <Msg key="p" tagName="p" id="pages.surveySubmitted.p"
                    values={ values }
                    />
                <Button labelMsg="pages.surveySubmitted.dashboardButton"
                    href="/dashboard"
                    />
            </div>
        );
    }
}
