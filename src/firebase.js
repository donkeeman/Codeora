// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "codeora-421.firebaseapp.com",
    projectId: "codeora-421",
    storageBucket: "codeora-421.appspot.com",
    messagingSenderId: "873041017960",
    appId: "1:873041017960:web:d6bc115cf0f366e0030fdd",
    measurementId: "G-0177D6YLX5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, analytics, auth };
