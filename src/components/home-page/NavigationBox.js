import React, {useState, useEffect} from 'react';
import Logo from "./Logo";
import Button from "./Button";
import {Link} from "react-router-dom";

const NavigationBox = () => {
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        setActive(prev => !prev);
    }

    useEffect(() => {
        document.body.classList.toggle('nav-active', active);
    }, [active])
    return (
        <>

            <nav>
                <Logo/>
                <div onClick={clickHandler} className="hamburger">
                    <div className={`line ${active ? "opened-hamburger-first" : ""}`}/>
                    <div className={`line ${active ? "line-none" : ""}`}/>
                    <div className={`line ${active ? "opened-hamburger-second" : ""}`}/>
                </div>
                <ul className={`nav-links ${active ? "open" : ""}`}>
                    <li className={`${active ? "fade" : ""}`}>
                        <a href={"#"}
                           onClick={clickHandler}
                        >początek</a>
                    </li>
                    <li className={`${active ? "fade" : ""}`}>
                        <a href="#about"
                           onClick={clickHandler}
                        >aplikacja</a>
                    </li>
                    <li className={`${active ? "fade" : ""}`}>
                        <a href={"/#form"}
                           onClick={clickHandler}
                        >kontakt</a>
                    </li>
                    <Button text={"Rozpocznij"}/>
                </ul>
            </nav>
        </>
    );
};

export default NavigationBox;