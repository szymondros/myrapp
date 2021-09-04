import React, {useMemo, useState} from 'react';
import firebase from "firebase/app"
import AudioPlayer from "./elements/AudioPlayer";
import beats from "../../data/beats"
import subjects from "../../data/subjects";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import fontawesome from "@fortawesome/fontawesome";
import Equalizer from "./animations/Equalizer";
import EqualizerLow from "./animations/EqualizerLow";
import SecondNavigation from "./elements/SecondNavigation";
import NavLogo from "./elements/NavLogo";
import Notification from "./elements/Notification";
import HelloUser from "./elements/HelloUser";
import EqualizerBoxes from "./animations/EqualizerBoxes";



const MyApp = () => {

//Stan komponentu
    const [currentBeatUrl, setCurrentBeatUrl] = useState("");
    const [currentSubject, setCurrentSubject] = useState("-");
    const [isPlayPause, setPlayPause] = useState(false);
    const [isActive, setActive] = useState(false);

//Funkcja losująca
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

//Handlerki
    const freestyleHandler = () => {
        const urlBeatIndex = getRandomInt(0, beats.length);
        const subjectIndex = getRandomInt(0, subjects.length);
        setCurrentBeatUrl(beats[urlBeatIndex]);
        setCurrentSubject(subjects[subjectIndex]);
        setActive(true);
    }

    const changeBeatHandler = () => {
        const urlBeatIndex = getRandomInt(0, beats.length);
        setCurrentBeatUrl(beats[urlBeatIndex]);
    }

    const pauseHandler = () => {
        setPlayPause(!isPlayPause);
    }

    const subjectHandler = () => {
        const subjectIndex = getRandomInt(0, subjects.length);
        setCurrentSubject(subjects[subjectIndex]);
    }

//Dodawanie ikonek do biblioteki
    useMemo(() => {
        fontawesome.library.add(faPlay, faPause);
    }, []);

    return (
        <>
            <NavLogo />
            <Notification/>
            <SecondNavigation />
            <div className="content-box">
                <section className="app-freestyle-section wrapper">
                    <HelloUser />
                    <div className="freestyle-box">
                        <button className="app-btn"
                                onClick={freestyleHandler}>{isActive ? "Nowy zestaw" : "Zacznij Freestyle"}</button>
                        <button className="app-btn"
                                onClick={changeBeatHandler}
                                disabled={!isActive}
                        >Nowy beat
                        </button>
                        <button className="app-btn"
                                onClick={subjectHandler}
                                disabled={!isActive}
                        >Nowy temat
                        </button>
                        <AudioPlayer
                            url={currentBeatUrl}
                            playing={!isPlayPause}
                            controls={false}
                        />
                        <div className="subject-box">
                            <h1>Twój temat to:</h1>
                            <h1>{currentSubject}</h1>
                        </div>
                        <div className={isActive ? "equalizer-box" : "hidden"}>
                            <div className={isPlayPause ? "low-loader-container" : "loader-container"}>
                                <EqualizerBoxes />
                            </div>
                        </div>
                        <div className={isActive ? "pause-button" : "hidden"}>
                            {
                                isPlayPause ?
                                    <a onClick={pauseHandler}>
                                        <FontAwesomeIcon icon="play"/>
                                    </a>
                                    :
                                    <a onClick={pauseHandler}>
                                        <FontAwesomeIcon icon="pause"/>
                                    </a>
                            }
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default MyApp;