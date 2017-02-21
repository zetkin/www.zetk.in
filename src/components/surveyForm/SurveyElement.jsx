import React from 'react';

import PropTypes from '../../utils/PropTypes';
import SurveyTextBlock from './SurveyTextBlock';
import SurveyQuestion from './SurveyQuestion';


export default class SurveyElement extends React.Component {
    static propTypes = {
        element: PropTypes.map.isRequired,
    };

    render() {
        let element = this.props.element;
        let content = null;

        if (element.get('type') == 'text') {
            content = (
                <SurveyTextBlock
                    block={ element.get('text_block') }
                    />
            );
        }
        else if (element.get('type') == 'question') {
            content = (
                <SurveyQuestion
                    name={ element.get('id').toString() }
                    question={ element.get('question') }
                    />
            );
        }

        return (
            <div className="SurveyElement">
                { content }
            </div>
        );
    }
}
