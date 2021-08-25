import firebase from "firebase/app"
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBJ28n4qd3OAgn1smRvr0c8-oD_7vBvArA",
    authDomain: "rapp-0.firebaseapp.com",
    databaseURL: "https://rapp-0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rapp-0",
    storageBucket: "rapp-0.appspot.com",
    messagingSenderId: "296013056029",
    appId: "1:296013056029:web:fa36f5fa20f93c4a6f5ef4",
    measurementId: "G-7P3S6KW89G"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;