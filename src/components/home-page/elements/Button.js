import React from 'react';
import {Link} from "react-router-dom";

const Button = ({text}) => {

    const toggleBody = () => {
        document.body.classList.toggle('nav-active');
    }

    return (
        <div onClick={toggleBody} className="box-for-transition">
            <Link
                to="/signin"
                className={"btn"}
            >{text}</Link>
        </div>
    );
};

export default Button;