import React, {useState, useEffect, useMemo} from 'react';
import NavLogo from "./elements/NavLogo";
import SecondNavigation from "./elements/SecondNavigation";
import firebase from "firebase";
import {Link} from "react-router-dom";
import MyText from "./elements/MyText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import fontawesome from "@fortawesome/fontawesome";
import * as url from "url";
import Notification from "./elements/Notification";

const TrackList = () => {

    const [textList, setTextList] = useState([]);
    const [itemContent, setItemContent] = useState("");
    const [selectedText, setSelectedText] = useState(false);


    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const content = db.collection(user.uid);
    const email = user.email;



    const deleteText = () => {
        const textTitle = selectedText?.title;
        setTextList((prev) => prev.filter(p => p.title !== textTitle));
        setSelectedText(false);
        db.collection(user.uid).doc(textTitle).delete();
    }

    const getTextList = async () => {
        setTextList([]);
        const data = await content.get();
        data.docs.forEach(item => {
            setTextList((prev) => [...prev, item.data()]);
        })
        console.log(data);
    }

    useEffect(async () => {
        await getTextList();
    }, []);

    const visibleHandler = (item) => {
        setSelectedText(item);
    }

    useMemo(() => {
        fontawesome.library.add(faPlay);
    }, []);

    return (
        <>
            <Notification/>
            <NavLogo/>
            <SecondNavigation/>
            <div className={selectedText ? "hidden" : "text-content-box"}>
                <h1>Witaj {email}</h1>
                <p>Twoja lista tekstów</p>
                <div className="text-list">
                    <ul>
                        {
                            textList.map((item, index) => {
                                return (
                                    <li className="wrapper" onClick={() => visibleHandler(item)}
                                        key={index}>{item.title}<FontAwesomeIcon icon="play" /></li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            {selectedText ? <MyText onDelete={deleteText} onUpdate={getTextList} selectedText={selectedText} setSelectedText={setSelectedText}/> : <div></div>}
        </>
    );
};

export default TrackList;