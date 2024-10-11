// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiDGnPUlq_dcNIAE8FytrkJW21vRRpBik",
    authDomain: "airbnb-clone-abaf9.firebaseapp.com",
    projectId: "airbnb-clone-abaf9",
    storageBucket: "airbnb-clone-abaf9.appspot.com",
    messagingSenderId: "424420125443",
    appId: "1:424420125443:web:8db5c534f475b350ddd736"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;