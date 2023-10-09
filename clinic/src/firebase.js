// Import the functions you need from the SDKs you need
import { FacebookAuthProvider, getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyDh8K60M2d9hm1pi3FVBKSJ1dymKpy-vX4",
    authDomain: "otp-project-7bacd.firebaseapp.com",
    projectId: "otp-project-7bacd",
    storageBucket: "otp-project-7bacd.appspot.com",
    messagingSenderId: "413880312006",
    appId: "1:413880312006:web:60ac4e29c9e28e0f06b7c7",
    measurementId: "G-D5S00WL9JM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { app, auth, db }
// google
// const ggProvider = new GoogleAuthProvider();
// const fbProvider = new FacebookAuthProvider()

