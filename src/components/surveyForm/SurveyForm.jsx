import React from 'react';

import PropTypes from '../../utils/PropTypes';
import SurveyElement from './SurveyElement';


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

        return (
            <div className="SurveyForm">
                <form>
                    { elements }
                </form>
            </div>
        );
    }
}
