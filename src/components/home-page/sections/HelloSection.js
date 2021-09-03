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
                <h1>Dzięki tej aplikacji staniesz się</h1>
                <h1>{active ? "raperem" : "freestylowcem"}</h1>
                <div className={"icons-wrapper"}>
                    <img src="./images/freestyler.png" className={active ? "icon-opacity" : ""}/>
                    <img src={"./images/rapper.png"} className={!active ? "icon-opacity" : ""}/>
                </div>
                <Button text={"Rozpocznij"}/>
            </div>
        </section>
    );
};

export default HelloSection;