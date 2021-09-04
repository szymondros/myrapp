import React from 'react';
import firebase from "firebase";

const HelloUser = () => {
    const user = firebase.auth().currentUser;
    const email = user.email;
    return (
        <>
            <h1>Witaj {email}</h1>
        </>
    );
};

export default HelloUser;