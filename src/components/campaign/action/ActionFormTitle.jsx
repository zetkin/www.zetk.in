import React from 'react';
import { FormattedMessage as Msg } from 'react-intl';


export default function ActionFormTitle(props) {
    return (
        <h3 className="ActionFormTitle">
            { props.title }
        </h3>
    );
};
