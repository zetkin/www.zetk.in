import React from 'react';
import { injectIntl } from 'react-intl';

import PropTypes from '../../utils/PropTypes';
import SurveyElement from './SurveyElement';


@injectIntl
export default class SurveyForm extends React.Component {
    static propTypes = {
        survey: PropTypes.map.isRequired,
    };

    render() {
        let survey = this.props.survey;

        let elements = survey.get('elements').map(elem => (
            <SurveyElement key={ elem.get('id') }
                element={ elem }
                />
        ));

        let submitLabel = this.props.intl.formatMessage(
            { id: 'surveyForm.submitButton' })

        return (
            <div className="SurveyForm">
                <form method="post">
                    { elements }

                    <input type="submit" value={ submitLabel }/>
                </form>
            </div>
        );
    }
}
