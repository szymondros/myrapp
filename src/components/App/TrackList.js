import React, {useState, useEffect, useMemo} from 'react';
import NavLogo from "./elements/NavLogo";
import SecondNavigation from "./elements/SecondNavigation";
import firebase from "firebase";
import MyText from "./elements/MyText";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";
import fontawesome from "@fortawesome/fontawesome";
import Notification from "./elements/Notification";
import HelloUser from "./elements/HelloUser";
import successNotification from "../../functions/successNotification";

const TrackList = () => {

//Stan Komponentu
    const [textList, setTextList] = useState([]);
    const [selectedText, setSelectedText] = useState(false);

//Przydatne zmienne
    const db = firebase.firestore();
    const user = firebase.auth().currentUser;
    const content = db.collection(user.uid);
    const email = user.email;

//Handlerki i metody
    const visibleHandler = (item) => {
        setSelectedText(item);
    }

    const deleteText = async() => {
        const textTitle = selectedText?.title;
        setTextList((prev) => prev.filter(p => p.title !== textTitle));
        setSelectedText(false);
        await db.collection(user.uid).doc(textTitle).delete();
        successNotification("Tekst usunięty pomyślnie");
    }

    const getTextList = async () => {
        setTextList([]);
        const data = await content.get();
        data.docs.forEach(item => {
            setTextList((prev) => [...prev, item.data()]);
        })
    }

// Aktualizacja listy
    useEffect(async() => {
        await getTextList();
    }, []);

// Dodawanie ikon do biblioteki
    useMemo(() => {
        fontawesome.library.add(faPlay);
    }, []);

    return (
        <>
            <Notification/>
            <NavLogo/>
            <SecondNavigation/>
            <div className={selectedText ? "hidden" : "text-content-box"}>
                <HelloUser />
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
            {selectedText ? <MyText onDelete={deleteText} onUpdate={getTextList} selectedText={selectedText} setSelectedText={setSelectedText} /> : <div></div>}
        </>
    );
};

export default TrackList;