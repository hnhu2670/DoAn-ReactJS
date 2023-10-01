// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export { app, auth }
