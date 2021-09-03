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
import {toast} from "react-toastify";
import Notification from "./elements/Notification";

const WriteText = () => {

    const [isActive, setActive] = useState(false);
    const [isPlayPause, setPlayPause] = useState(false);
    const [isCheckUrlActive, setCheckUrlActive] = useState(true);
    const [isAddBeatActive, setAddBeatActive] = useState(false);
    const [isChangeBeatActive, setChangeBeatActive] = useState(false);
    const [currentBeatUrl, setCurrentBeatUrl] = useState("");
    const [isVisibleTwo, setIsVisibleTwo] = useState(false);

    const validationSchema = yup.object().shape({
        url: yup.string()
            .required("To pole jest wymagane")
            .url("To pole musi zawierać adres URL")
    });

    const {handleSubmit, register, formState: {errors}, setValue, getValues} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(validationSchema)
    });

    const history = useHistory();

    const user = firebase.auth().currentUser;
    const email = user.email;
    const db = firebase.firestore();
    const soundCloudLink = <Link to="https://soundcloud.com" target="_blank">Soundcloud.com</Link>;

    const successNotification = (text) => {
        toast.success(text, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const errorNotification = () => {
        toast.error('Nie udało się dodać tekstu.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const changeBeatHandler = () => {
        setActive(!isActive);
        setChangeBeatActive(false);
        setCheckUrlActive(true);
    }

    const onSubmit = (data, e) => {
        const currentUrl = getValues("url");
        setActive(!isActive);
        setCurrentBeatUrl(currentUrl);
        setCheckUrlActive(false);
        setIsVisibleTwo(true);
        setChangeBeatActive(true);
        successNotification("Dodano beat!");

    }

    const pauseHandler = () => {
        setPlayPause(!isPlayPause);
    }

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
                successNotification("Tekst został zapisany.");
            })
            .catch(function (error) {
                errorNotification();
            })
        history.push("/track-list");
    };

    useMemo(() => {
        fontawesome.library.add(faPlay, faPause, faDiceOne, faDiceTwo);
    }, []);

    return (
        <>
            <Notification />
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
                    <h1>Witaj {email}</h1>
                    <div className="write-box">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-add-beat">
                                <div className={isActive ? "hidden" : "soundcloud-label-input"}>
                                    <FontAwesomeIcon icon="dice-one"/>
                                    <div className="num-form">
                                        <label>Link do beatu z {soundCloudLink}
                                        </label>
                                        <input
                                            className={isAddBeatActive ? "green-background" : ""}
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
                                        <div className="rectangle-1"></div>
                                        <div className="rectangle-2"></div>
                                        <div className="rectangle-3"></div>
                                        <div className="rectangle-4"></div>
                                        <div className="rectangle-5"></div>
                                        <div className="rectangle-6"></div>
                                        <div className="rectangle-5"></div>
                                        <div className="rectangle-4"></div>
                                        <div className="rectangle-3"></div>
                                        <div className="rectangle-2"></div>
                                        <div className="rectangle-1"></div>
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
                                        <div className="rectangle-1"></div>
                                        <div className="rectangle-2"></div>
                                        <div className="rectangle-3"></div>
                                        <div className="rectangle-4"></div>
                                        <div className="rectangle-5"></div>
                                        <div className="rectangle-6"></div>
                                        <div className="rectangle-5"></div>
                                        <div className="rectangle-4"></div>
                                        <div className="rectangle-3"></div>
                                        <div className="rectangle-2"></div>
                                        <div className="rectangle-1"></div>
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
                                <textarea {...register("content")}></textarea>
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