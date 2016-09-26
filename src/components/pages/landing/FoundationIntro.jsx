import React from 'react';
import { Link } from 'react-router';


export default class FoundationIntro extends React.Component {
    render() {
        return (
            <div className="FoundationIntro">
                <h2>By activists for activists</h2>
                <h3>This part gives us legitimacy</h3>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Maecenas ornare dictum odio, nec pharetra ipsum tristique nec.
                    Aenean efficitur, sem sed tincidunt volutpat, enim erat
                    suscipit erat, vitae gravida mauris mi a arcu. Cras aliquet
                    scelerisque lorem vitae varius. Cras scelerisque erat eu augue
                    lacinia, vel porta magna accumsan. Sed sit amet urna nibh.
                    Maecenas magna lectus, viverra at pharetra ornare,
                    sollicitudin nec dolor. Sed commodo velit vitae suscipit
                    pulvinar.
                </p>
                <Link to="/info">Learn more</Link>
            </div>
        );
    }
}
