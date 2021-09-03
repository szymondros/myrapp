import React from 'react';

const About = () => {
    return (
        <section id="about">
            <div className="wrapper about">
                <h1>Aplikacja</h1>
                <div className="freestyle-box">
                    <img src={"./images/freestyle.png"} />
                    <div className="about-text-box">
                        <h2>Freestyle</h2>
                        <span>Losuj podkład oraz temat i bierz się za nawijanie. Pamiętaj aby nie wypadać z bitu!</span>
                    </div>
                </div>
                <div className="favourite-box">
                    <div className="about-text-box">
                        <h2>Ulubione</h2>
                        <span>Dodawaj bity do ulubionych i wykorzystaj je przy tworzeniu własnego kawałka.</span>
                    </div>
                    <img src={"./images/favouriterap.png"} />
                </div>
                <div className="createrap-box">
                    <img src={"./images/createrap.png"} />
                    <div className="about-text-box">
                        <h2>Własne teksty</h2>
                        <span>Twórz własne teksty i przypisuj do nich bity. Nawijaj gdziekolwiek jesteś.</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;