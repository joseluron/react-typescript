import firebase from 'firebase/app';
import 'firebase/auth';

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyA3-jZLNDXqEUlCNhByGSzDt8ZZGtl2THk",
    authDomain: "react-typescript-app.firebaseapp.com",
    databaseURL: "https://react-typescript-app.firebaseio.com",
    projectId: "react-typescript-app",
    storageBucket: "react-typescript-app.appspot.com",
    messagingSenderId: "241972291437",
    appId: "1:241972291437:web:4ae78d9b637192da2f9c64"
};
firebase.initializeApp(FIREBASE_CONFIG);

export const firebaseAuth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
