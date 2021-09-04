import React, {useMemo, useState} from 'react';
import SecondNavigation from "./elements/SecondNavigation";
import NavLogo from "./elements/NavLogo";
import firebase from "firebase";
import {get, useForm} from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from "@hookform/resolvers/yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faDiceOne, faDiceTwo} from "@fortawesome/free-solid-svg-icons";
import fontawesome from "@fortawesome/fontawesome";
import AudioPlayer from "./elements/AudioPlayer";
import {Link, useHistory} from "react-router-dom";
import Notification from "./elements/Notification";
import successNotification from "../../functions/successNotification";
import errorNotification from "../../functions/errorNotification";
import EqualizerBoxes from "./animations/EqualizerBoxes";
import HelloUser from "./elements/HelloUser";

const WriteText = () => {
//stan komponentu
    const [isActive, setActive] = useState(false);
    const [isPlayPause, setPlayPause] = useState(false);
    const [isCheckUrlActive, setCheckUrlActive] = useState(true);
    const [isChangeBeatActive, setChangeBeatActive] = useState(false);
    const [currentBeatUrl, setCurrentBeatUrl] = useState("");
    const [isVisibleTwo, setIsVisibleTwo] = useState(false);

//ustawienia walidacji formularza
    const validationSchema = yup.object().shape({
        url: yup.string()
            .required("To pole jest wymagane")
            .url("To pole musi zawierać adres URL"),
    });

//hooki z useForm()
    const {handleSubmit, register, formState: {errors}, setValue, getValues} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(validationSchema)
    });

//przydatne zmienne
    const history = useHistory();
    const user = firebase.auth().currentUser;
    const email = user.email;
    const db = firebase.firestore();
    const soundCloudLink = <Link to="https://soundcloud.com" target="_blank">Soundcloud.com</Link>;

//rejestracja nowego tekstu w bazie firebase
    const textRegister = async () => {
        const currentUrl = currentBeatUrl;
        const textTitle = getValues("title");
        const textContent = getValues("content");
        db.collection(user.uid).doc(textTitle).set({
            title: textTitle,
            url: currentUrl,
            content: textContent
        })
            .then(function () {
                successNotification("Dodano tekst do listy");
            })
            .catch(function (error) {
                errorNotification(error)
            })
        history.push("/track-list");
    };

//Handlerki i submit
    const changeBeatHandler = () => {
        setActive(!isActive);
        setChangeBeatActive(false);
        setCheckUrlActive(true);
    }

    const pauseHandler = () => {
        setPlayPause(!isPlayPause);
    }

    const onSubmit = (data, e) => {
        const currentUrl = getValues("url");
        setActive(!isActive);
        setCurrentBeatUrl(currentUrl);
        setCheckUrlActive(false);
        setIsVisibleTwo(true);
        setChangeBeatActive(true);
        successNotification("dodano nowy beat");
    }

//dodawanie ikonek do biblioteki
    useMemo(() => {
        fontawesome.library.add(faPlay, faPause, faDiceOne, faDiceTwo);
    }, []);

    return (
        <>
            <Notification/>
            <NavLogo/>
            <SecondNavigation/>
            <div className="content-box">
                <AudioPlayer
                    url={currentBeatUrl}
                    loop={true}
                    playing={!isPlayPause}
                    controls={false}
                />
                <section className="app-write-section wrapper">
                    <HelloUser/>
                    <div className="write-box">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-add-beat">
                                <div className={isActive ? "hidden" : "soundcloud-label-input"}>
                                    <FontAwesomeIcon icon="dice-one"/>
                                    <div className="num-form">
                                        <label>Link do beatu z {soundCloudLink}
                                        </label>
                                        <input
                                            placeholder="https://soundcloud.com/dizzladbeats/guitar-piano-instrumental-beat-dear-me-prod-dizzla-d"
                                            name="url"
                                            {...register("url")}
                                            onChange={e => setValue("url", e.target.value)}
                                        />
                                        <ErrorMessage as={<div className={"error-message"}/>} errors={errors}
                                                      name={"url"}/>
                                    </div>
                                </div>
                                <div className={isActive ? "pause-button" : "hidden"}>
                                    <div className={isPlayPause ? "low-loader-container" : "loader-container"}>
                                        <EqualizerBoxes/>
                                    </div>
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
                                    <div className={isPlayPause ? "low-loader-container" : "loader-container"}>
                                        <EqualizerBoxes/>
                                    </div>
                                </div>
                                <button type="submit"
                                        className={isCheckUrlActive ? "app-btn" : "hidden"}
                                >Dodaj beat
                                </button>
                                <button type="reset"
                                        onClick={changeBeatHandler}
                                        className={isChangeBeatActive ? "app-btn" : "hidden"}
                                >Zmień beat
                                </button>
                            </div>
                        </form>
                        <form onSubmit={handleSubmit(textRegister)}>
                            <div className={isVisibleTwo ? "form-textarea" : "hidden"}>
                                <div className="textarea-title">
                                    <FontAwesomeIcon icon="dice-two"/>
                                    <div className="textarea-label-input">
                                        <label>Pisz swój tekst poniżej</label>
                                        <input placeholder="Tytuł tekstu"
                                               {...register("title")}
                                        />
                                    </div>
                                </div>
                                <textarea {...register("content")} />
                                <button type="submit" className="app-btn">Zapisz tekst</button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>

        </>
    )
        ;
};

export default WriteText;