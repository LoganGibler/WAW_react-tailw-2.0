// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAxnq_Bonx977uUSGJFvfF1PQ_vY67_OPs",

  authDomain: "webappwarfare.firebaseapp.com",

  projectId: "webappwarfare",

  storageBucket: "webappwarfare.appspot.com",

  messagingSenderId: "13162397259",

  appId: "1:13162397259:web:b73c86ac83b039874ed7ce",

  measurementId: "G-7HTSG8KZZN",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
