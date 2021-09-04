import React from 'react';
import Logo from "../../home-page/elements/Logo";
import app from "../../../base";


const NavLogo = ({successNotification}) => {

    const logoutHandler = async() => {
        await successNotification;
        await app.auth().signOut();
    }

    return (
        <>
            <nav className="myapp-nav">
                <div className="myapp-wrapper">
                    <Logo/>
                    <button className="login-btn logout-btn" onClick={logoutHandler}>Wyloguj się</button>
                </div>
            </nav>
        </>
    );
};

export default NavLogo;