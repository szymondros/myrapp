import React from 'react';
import NavigationBox from "./elements/NavigationBox";
import Landing from "./Landing";

const Home = () => {
    return (
        <>
            <header className={"header"}>
                <NavigationBox/>
            </header>
                <Landing/>
        </>

    );
};

export default Home;