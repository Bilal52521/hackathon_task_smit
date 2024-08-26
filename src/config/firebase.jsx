// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD56vYSc5fFfGPFfDi5c6Wy0Dexio_ONdc",
  authDomain: "hackathon-task-2538c.firebaseapp.com",
  projectId: "hackathon-task-2538c",
  storageBucket: "hackathon-task-2538c.appspot.com",
  messagingSenderId: "267270016286",
  appId: "1:267270016286:web:4afdc675060d73da278d0f",
  measurementId: "G-LSBJ2N93JV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const firestore = getFirestore(app)

export {auth , analytics , firestore}