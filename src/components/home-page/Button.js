import React from 'react';
import {Link} from "react-router-dom";

const Button = ({text}) => {

    return (
        <div className="box-for-transition">
            <Link
                to="/signin"
                className={"btn"}
            >{text}</Link>
        </div>
    );
};

export default Button;