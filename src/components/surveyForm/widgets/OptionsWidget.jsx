import React from 'react';

import PropTypes from '../../../utils/PropTypes';


export default class OptionsWidget extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        question: PropTypes.map.isRequired,
    };

    render() {
        let name = this.props.name;
        let question = this.props.question;
        let type = question.getIn(['response_config', 'widget_type']) || 'radio';

        if (type == 'select') {
            let optionItems = question.get('options').map(opt => {
                let id = opt.get('id');

                return (
                    <option key={ id } value={ id }>
                        { opt.get('text') }
                    </option>
                );
            });

            return (
                <div className="OptionsWidget">
                    <select name={ name + '.options' }>
                        { optionItems }
                    </select>
                </div>
            );
        }
        else {
            let optionItems = question.get('options').map(option => {
                let id = option.get('id');

                return (
                    <li key={ id }>
                        <input type={ type } value={ id }
                            name={ name + '.options' }
                            id={ 'option-' + id }
                            />
                        <label htmlFor={ 'option-' + id }>
                            { option.get('text') }
                        </label>
                    </li>
                );
            });

            return (
                <div className="OptionsWidget">
                    <ul>
                        { optionItems }
                    </ul>
                </div>
            );
        }
    }
}
