import React from 'react';
import app from "../../base";
import Logo from "../home-page/Logo";
import Button from "../home-page/Button";
import {Link} from "react-router-dom";

const MyApp = () => {

    const logoutHandler = () => {
        app.auth().signOut();
    }

    return (
        <>
            <nav className="myapp-nav">
                <div className="myapp-wraper">
                    <Logo/>
                    <button className="login-btn logout-btn" onClick={logoutHandler}>Wyloguj się</button>
                </div>
            </nav>
            <h1>Witaj użytkowniku! :D</h1>
        </>
    )
        ;
};

export default MyApp;