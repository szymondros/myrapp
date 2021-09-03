import React, {useMemo} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic, faPencilRuler, faList} from "@fortawesome/free-solid-svg-icons";
import fontawesome from "@fortawesome/fontawesome";
import {Link} from "react-router-dom";

const SecondNavigation = () => {

    useMemo(() => {
        fontawesome.library.add(faMusic, faPencilRuler, faList);
    }, []);

    return (
        <div className="navigation">
            <Link className="mobile-menu-box"
                  to="/myapp">
                <FontAwesomeIcon icon="music"/>
                <p>Freestyle</p>
            </Link>
            <Link className="mobile-menu-box"
                  to="/write-text">
                <FontAwesomeIcon icon="pencil-ruler"/>
                <p>Tworzenie tekstu</p>
            </Link>
            <Link className="mobile-menu-box"
                  to="/track-list">
                <FontAwesomeIcon icon="list"/>
                <p>Moje teksty</p>
            </Link>
        </div>
    );
};

export default SecondNavigation;