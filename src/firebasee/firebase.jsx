// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getFirestore, addDoc, collection } from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK5PLfIapMOYTcRqQ20yuQ2hm-nap_Elw",
  authDomain: "project-my-daab8.firebaseapp.com",
  projectId: "project-my-daab8",
  storageBucket: "project-my-daab8.appspot.com",
  messagingSenderId: "694751906767",
  appId: "1:694751906767:web:d97e5177f7ecc86fe0e0ba",
  measurementId: "G-V0Y3ETJH0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);

const handleSubmit = async (testdata) => {
  const ref = collection(firestore, "test_data") // Firebase creates this automaticall// 
    try {
    addDoc(ref, testdata);
    } catch(err) {
    console.log(err);
    }
}
export default handleSubmit;