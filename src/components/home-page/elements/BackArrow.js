import React, {useMemo} from 'react';
import {Link} from "react-router-dom";
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const BackArrow = ({location, onClick}) => {

    useMemo(() => {
        fontawesome.library.add(faArrowLeft);
    }, []);

    return (

        onClick ? (
                <div onClick={onClick} className="back-arrow">
                    <FontAwesomeIcon icon="arrow-left"/>
                </div>
            )
            :
            (
                <div className="back-arrow">
                    {
                        !!location && <Link to={location}><FontAwesomeIcon icon="arrow-left"/></Link>
                    }
                </div>
            )
    )
}

export default BackArrow;