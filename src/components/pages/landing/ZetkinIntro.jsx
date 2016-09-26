import React from 'react';


export default class ZetkinIntro extends React.Component {
    render() {
        return (
            <div className="ZetkinIntro">
                <h2>Headline about what Zetkin is about</h2>
                <h3>Subheading the other thing</h3>
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
                <ul className="ZetkinIntro-highlights">
                    <li>Super safe</li>
                    <li>Radical & revolutionary</li>
                    <li>Very efficient</li>
                </ul>
            </div>
        );
    }
}
