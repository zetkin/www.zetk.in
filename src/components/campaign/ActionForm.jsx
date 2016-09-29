import React from 'react';


export default (props) => {
    let action = props.action;

    return (
        <div className="ActionForm">
            <h3>{ action.getIn(['activity', 'title']) }</h3>
        </div>
    );
};
