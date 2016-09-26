import React from 'react';
import { Link } from 'react-router';


export default class ConnectInfo extends React.Component {
    render() {
        return (
            <div className="ConnectInfo">
                <h2>The more the merrier</h2>
                <h3>Become affiliated with Zetkin now</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas ornare dictum odio, nec pharetra ipsum tristique nec.
                    Aenean efficitur, sem sed tincidunt volutpat, enim erat
                    suscipit erat, vitae gravida mauris mi a arcu. Cras aliquet.
                </p>
                <Link to="https://zetkin.org/join">Apply now</Link>
            </div>
        );
    }
}
