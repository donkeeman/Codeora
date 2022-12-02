import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "codeora-421.firebaseapp.com",
    projectId: "codeora-421",
    storageBucket: "codeora-421.appspot.com",
    messagingSenderId: "873041017960",
    appId: "1:873041017960:web:d6bc115cf0f366e0030fdd",
    measurementId: "G-0177D6YLX5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, analytics, auth };
