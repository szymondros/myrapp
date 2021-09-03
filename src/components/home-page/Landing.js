import React from 'react';
import HelloSection from "./sections/HelloSection";
import About from "./sections/About";
import ContactForm from "./sections/ContactForm";
import Notification from "../App/elements/Notification";

const Landing = () => {
    return (
        <>
            <Notification/>
            <HelloSection/>
            <About/>
            <ContactForm/>
        </>
    );
};

export default Landing;