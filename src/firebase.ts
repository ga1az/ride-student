// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg7-kwG7PeNUdhetbkSkmbPqQ2Mt-omGI",
  authDomain: "uberstudent-fed7e.firebaseapp.com",
  projectId: "uberstudent-fed7e",
  storageBucket: "uberstudent-fed7e.appspot.com",
  messagingSenderId: "138246155037",
  appId: "1:138246155037:web:03abc5361a1720557c0ff4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
