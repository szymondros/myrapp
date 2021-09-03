import React, {useEffect, useMemo, useState} from 'react';
import AudioPlayer from "./AudioPlayer";
import BackArrow from "../../home-page/elements/BackArrow";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faEdit, faWindowClose, faTrash} from "@fortawesome/free-solid-svg-icons";
import fontawesome from "@fortawesome/fontawesome";
import {get, useForm} from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from "@hookform/resolvers/yup";
import {Link} from "react-router-dom";
import firebase from "firebase";
import Notification from "./Notification";
import {toast} from "react-toastify";

const MyText = ({selectedText, setSelectedText, onDelete, onUpdate}) => {

    const validationSchema = yup.object().shape({
        url: yup.string()
            .required("To pole jest wymagane")
            .url("To pole musi zawierać adres URL")
    });

    const user = firebase.auth().currentUser;
    const db = firebase.firestore();

    const {handleSubmit, register, formState: {errors}, setValue, getValues} = useForm({
        mode: "onSubmit",
        resolver: yupResolver(validationSchema)
    });

    const [isPlayPause, setIsPlayPause] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [isEditable, setIsEditable] = useState(false);

    const soundCloudLink = <Link to="/soundcloud" target="_blank">Soundcloud.com</Link>;

    const successNotification = () => {
        toast.success('Zapisano poprawnie.', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const errorNotification = () => {
        toast.error('Błąd zapisu', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    const pauseHandler = () => {
        setIsPlayPause(!isPlayPause);
    }

    const editHandler = () => {
        setIsEditable(!isEditable);
    }

    const activeHandler = () => {
        setSelectedText(false);
        setIsPlayPause(true);
        onUpdate();
    }

    const onSubmit = () => {
        setIsEditable(!isEditable);
        setIsPlayPause(false);
        const currentUrl = getValues("url");
        const textTitle = selectedText?.title;
        const content = getValues("content");
        const textObj = {
            content: content,
            title: textTitle,
            url: currentUrl
        }
        db.collection(user.uid).doc(textTitle).set(textObj)
            .then(function () {
                console.log("dane zapisane w bazie");
                setSelectedText(textObj);
                successNotification();
            })
            .catch(function (error) {
                console.log("Błąd zapisu danych: ", error);
                errorNotification();
            })
    }

    useEffect(() => {
        onUpdate();
        console.log("Przeładowany");
    }, [])

    useMemo(() => {
        fontawesome.library.add(faPlay, faPause, faEdit, faWindowClose, faTrash);
    }, []);


    return (
        <div className="text-content-box wrapper">
            <AudioPlayer
                url={selectedText?.url}
                loop={true}
                playing={!isPlayPause}
                controls={false}
            />
            <div className="buttons-box">
                <div>
                    <BackArrow onClick={activeHandler}/>
                </div>
                <div onClick={editHandler} className="edit-btn">
                    {isEditable ?
                        <>
                            <FontAwesomeIcon icon="window-close"/>
                        </>
                        :
                        <FontAwesomeIcon icon="edit"/>
                    }
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {isEditable
                    ?
                    <div className="num-form">
                        <label>Link do beatu z {soundCloudLink}
                        </label>
                        <input
                            type="search"
                            placeholder="https://soundcloud.com/dizzladbeats/guitar-piano-instrumental-beat-dear-me-prod-dizzla-d"
                            defaultValue={selectedText?.url}
                            name="url"
                            {...register("url")}
                            onChange={e => setValue("url", e.target.value)}
                        />
                        <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"url"}/>
                    </div>
                    :
                    <div className="play-pause-box">
                        <div className={isActive ? "pause-button" : "hidden"}>
                            <div className={isPlayPause ? "low-loader-container" : "loader-container"}>
                                <div className="rectangle-1"/>
                                <div className="rectangle-2"/>
                                <div className="rectangle-3"/>
                                <div className="rectangle-4"/>
                                <div className="rectangle-5"/>
                                <div className="rectangle-6"/>
                                <div className="rectangle-5"/>
                                <div className="rectangle-4"/>
                                <div className="rectangle-3"/>
                                <div className="rectangle-2"/>
                                <div className="rectangle-1"/>
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
                                <div className="rectangle-1"/>
                                <div className="rectangle-2"/>
                                <div className="rectangle-3"/>
                                <div className="rectangle-4"/>
                                <div className="rectangle-5"/>
                                <div className="rectangle-6"/>
                                <div className="rectangle-5"/>
                                <div className="rectangle-4"/>
                                <div className="rectangle-3"/>
                                <div className="rectangle-2"/>
                                <div className="rectangle-1"/>
                            </div>
                        </div>
                    </div>
                }

                <div className="form-box">
                    <h1>{selectedText?.title}</h1>
                    <textarea className={isEditable ? "editable-textarea" : "non-editable-textarea"}
                              defaultValue={selectedText?.content}
                              readOnly={!isEditable}
                              {...register("content")}
                    />
                    <div className={isEditable ? "submit-trash" : "hidden"}>
                        <button type="submit" className="app-btn">Zapisz</button>
                        <div onClick={onDelete} className="trash-icon">
                            <FontAwesomeIcon icon="trash"/>
                        </div>
                    </div>
                </div>
            </form>
            <Notification/>
        </div>


    );
};

export default MyText;