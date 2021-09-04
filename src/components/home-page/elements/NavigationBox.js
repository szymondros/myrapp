import React, {useState, useEffect} from 'react';
import Logo from "./Logo";
import Button from "./Button";
import {HashLink as Link} from "react-router-hash-link";

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
                    <Link to={"/#"}
                          onClick={clickHandler}
                    >
                        <li className={`${active ? "fade" : ""}`}>
                            start
                        </li>
                    </Link>
                    <Link to="#about"
                          onClick={clickHandler}
                    >
                        <li className={`${active ? "fade" : ""}`}>
                            aplikacja
                        </li>
                    </Link>
                    <Link to="/#form"
                          onClick={clickHandler}
                    >
                        <li className={`${active ? "fade" : ""}`}>
                            kontakt
                        </li>
                    </Link>
                    <Button text={"Zaloguj się"}/>
                </ul>
            </nav>
        </>
    );
};

export default NavigationBox;