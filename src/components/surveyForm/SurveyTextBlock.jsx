import React from 'react';

import PropTypes from '../../utils/PropTypes';


export default class SurveyTextBlock extends React.Component {
    static propTypes = {
        block: PropTypes.map.isRequired,
    };

    render() {
        let block = this.props.block;

        let h = null;
        if (block.get('header')) {
            h = <h2>{ block.get('header') }</h2>;
        }

        let p = null;
        if (block.get('content')) {
            p = <p>{ block.get('content') }</p>;
        }

        return (
            <div className="SurveyTextBlock">
                { h }
                { p }
            </div>
        );
    }
}
