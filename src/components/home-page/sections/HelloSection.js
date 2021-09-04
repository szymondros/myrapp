import React, {useEffect, useState} from 'react';
import Button from "../elements/Button";

const HelloSection = () => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const titleTimeout = setTimeout(() => {
            setActive(prev => !prev);
        }, 2000);

        return () => {
            clearTimeout(titleTimeout);
        }
    })
    return (
        <section id="hello-section">
            <div className={"wrapper hello-section"}>
                <video playsInline autoPlay muted loop poster="" id="bgvid">
                    <source src="./video/bgvid.mp4" type="video/mp4"/>
                </video>
                <h1>Dzięki tej aplikacji staniesz się</h1>
                <h1>{active ? "raperem" : "freestylowcem"}</h1>
                <div className={"icons-wrapper"}>
                    <img src="./images/freestyler.png" alt="freestyler" className={active ? "icon-opacity" : ""}/>
                    <img src={"./images/rapper.png"} alt="rapper" className={!active ? "icon-opacity" : ""}/>
                </div>
                <Button text={"Zaloguj się"}/>
            </div>
        </section>
    );
};

export default HelloSection;