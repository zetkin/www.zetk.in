import React from 'react';

import PropTypes from '../../../utils/PropTypes';


export default class TextWidget extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        question: PropTypes.map.isRequired,
    };

    render() {
        let name = this.props.name;
        let question = this.props.question;

        if (question.getIn(['response_config', 'multiline'])) {
            var widget = (
                <textarea name={ name + '.text' }/>
            );
        }
        else {
            var widget = (
                <input type="text" name={ name + '.text' }/>
            );
        }

        return (
            <div className="TextWidget">
                { widget }
            </div>
        );
    }
}
