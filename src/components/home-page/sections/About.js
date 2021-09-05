import React from 'react';

const About = () => {
    return (
        <section id="about">
            <div className="wrapper about">
                <h1>Aplikacja</h1>
                <div className="boxes">
                    <div className="freestyle-box">
                        <img src="./images/freestyle.png" alt="freestyle"/>
                        <div className="about-text-box">
                            <h2>Freestyle</h2>
                            <span>Losuj podkład oraz temat i bierz się za nawijanie. Pamiętaj aby nie wypadać z bitu!
                            Ewentualnie jak trafisz na zbyt szybki beat to zmień go i trenuj skillsy</span>
                        </div>
                    </div>
                    <div className="favourite-box">
                        <div className="about-text-box">
                            <h2>Ulubione</h2>
                            <span>Dodawaj bity z Soundcloud.com i wykorzystaj je przy tworzeniu własnego utworu.
                                Następnie zapisuj kompozycję i wracaj do niej kiedy tylko chcesz.</span>
                        </div>
                        <img src="./images/favouriterap.png" alt="favourite-rap"/>
                    </div>
                    <div className="createrap-box">
                        <img src="./images/createrap.png" alt="create-rap"/>
                        <div className="about-text-box">
                            <h2>Własne teksty</h2>
                            <span>Twoje własne teksty do utworów zawsze w zasięgu Twojej ręki. Dopisuj, zmieniaj podkład
                            usuwaj i ćwicz nawijkę pod wybrany beat</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;