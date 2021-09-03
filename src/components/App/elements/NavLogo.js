import React from 'react';
import Logo from "../../home-page/elements/Logo";
import app from "../../../base";
import Notification from "./Notification";
import {toast} from "react-toastify";

const NavLogo = () => {

    const logoutHandler = () => {
        app.auth().signOut();
        successNotification();
    }

    const successNotification = () => {
        toast.success('Nastąpiło poprawne wylogowanie.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>
            <Notification/>
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