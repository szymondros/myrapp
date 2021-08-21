import React from 'react';

const Button = ({text}) => {

    const clickHandler = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <a
                href="/signin"
                className={"btn"}
                // onClick={(e) => clickHandler(e)}
            >{text}</a>
        </>
    );
};

export default Button;