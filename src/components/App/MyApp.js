import React from 'react';
import app from "../../base";

const MyApp = () => {

    const logoutHandler = () => {
        app.auth().signOut();
    }

    return (
        <div>
            <h1>Hello in my APP</h1>
            <button onClick={logoutHandler}>Log out</button>
        </div>
    );
};

export default MyApp;