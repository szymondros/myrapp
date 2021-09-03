import React from 'react';
import {Link} from "react-router-dom";

const Logo = () => {
    return (
        <Link className={"logo-wrapper"} to="/">
            <h1>r</h1>
            <h1>app</h1>
        </Link>
    );
};

export default Logo;