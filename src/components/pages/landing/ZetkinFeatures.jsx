import React from 'react';
import { Link } from 'react-router';


export default class ZetkinFeatures extends React.Component {
    render() {
        return (
            <div className="ZetkinFeatures">
                <h2>Activist highlights</h2>
                <h3>Subheading the other thing</h3>
                <ul className="ZetkinFeatures-features">
                    <li>
                        <h4>Overview of all the things</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </li>
                    <li>
                        <h4>Get organized in activities</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </li>
                    <li>
                        <h4>Reach out to the crowds</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </li>
                    <li>
                        <h4>Help your organization grow</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </li>
                </ul>
                <Link to="/register">Register</Link>
            </div>
        );
    }
}
