import React from 'react';

import PropTypes from '../../utils/PropTypes';


export default class SurveyQuestion extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        question: PropTypes.map.isRequired,
    };

    render() {
        let question = this.props.question;
        let name = this.props.name;

        let desc = null;
        if (question.get('description')) {
            desc = (
                <p>{ question.get('description') }</p>
            );
        }

        let responseWidget = null;
        if (question.get('response_type') == 'options') {
            let optionItems = question.get('options').map(option => {
                let id = option.get('id');

                return (
                    <li key={ id }>
                        <input type="checkbox" name={ name } value={ id }
                            id={ 'option-' + id }
                            />
                        <label htmlFor={ 'option-' + id }>
                            { option.get('text') }
                        </label>
                    </li>
                );
            });

            responseWidget = (
                <ul className="SurveyQuestion-options">
                    { optionItems }
                </ul>
            );
        }
        else if (question.get('response_type') == 'text') {
            if (question.getIn(['response_config', 'multiline'])) {
                responseWidget = (
                    <textarea name={ name }/>
                );
            }
            else {
                responseWidget = (
                    <input name={ name }/>
                );
            }
        }

        return (
            <div className="SurveyQuestion">
                <h2>{ question.get('question') }</h2>
                { desc }
                { responseWidget }
            </div>
        );
    }
}
