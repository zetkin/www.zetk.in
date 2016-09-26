import React from 'react';
import { Link } from 'react-router';


export default class SignUpSplash extends React.Component {
    render() {
        return (
            <div className="SignUpSplash">
                <h1>Motivational headline</h1>
                <h2>Very nice subheader</h2>
                <Link to="/register">Ok, register!</Link>
                <Link to="/info">Tell me more</Link>
                <div className="SignUpSplash-imageCaption">
                    Do you want your photo here?
                </div>
            </div>
        );
    }
}
