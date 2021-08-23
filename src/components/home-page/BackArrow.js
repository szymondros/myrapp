import React, { useMemo } from 'react';
import {Link} from "react-router-dom";
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const BackArrow = ({location}) => {

    useMemo(() => {
        fontawesome.library.add(faArrowLeft);
    }, []);

    return (
        <div className="back-arrow">
            <Link to={location}><FontAwesomeIcon icon="arrow-left" /></Link>
        </div>
    );
};

export default BackArrow;