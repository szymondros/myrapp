import React, {useState} from 'react';
import Logo from "./Logo";
import Button from "./Button";
import Landing from "./Landing";

const NavigationBox = () => {
    const [active, setActive] = useState(false);

    const clickHandler = () => {
        setActive(prev => !prev);
    }
    return (
        <>

            <nav>
                <Logo />
                <div onClick={clickHandler} className={"hamburger"}>
                    <div className={`line ${active ? "opened-hamburger-first" : ""}`}/>
                    <div className={`line ${active ? "line-none" : ""}`}/>
                    <div className={`line ${active ? "opened-hamburger-second" : ""}`}/>
                </div>
                <ul className={`nav-links ${active ? "open" : ""}`}>
                    <li className={`${active ? "fade" : ""}`}>
                        <a href={"/"}>początek</a>
                    </li>
                    <li className={`${active ? "fade" : ""}`}>
                        <a href={"/aplikacja"}>aplikacja</a>
                    </li>
                    <li className={`${active ? "fade" : ""}`}>
                        <a href={"/kontakt"}>kontakt</a>
                    </li>
                    <Button text={"Rozpocznij"}/>
                </ul>
            </nav>
            {/*<Landing />*/}
        </>
    );
};

export default NavigationBox;