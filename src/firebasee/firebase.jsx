// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {   addDoc,
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where, } from "@firebase/firestore"
import { useState } from "react";
import { useContext } from "react";
import { MyContext } from "../App";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCE46HDKoXWiSBOUZo441i2f4PRRdONjXI",
  authDomain: "try1-a18d6.firebaseapp.com",
  projectId: "try1-a18d6",
  storageBucket: "try1-a18d6.appspot.com",
  messagingSenderId: "100068955353",
  appId: "1:100068955353:web:99a6e4faadeca2bb3c1ac8",
  measurementId: "G-LHT35GSMXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);



//export default handleSubmit;




// // init firebase app
// initializeApp(firebaseConfig);

// // init services
// const db = getFirestore();

// // collection spacific ref
// const colRef = collection(db, "books");

// //queries
// let q = query(colRef, where("author", "==", "nadav amar"));



// export function FirsrFirebs() {
//   const [authorInp, setAuthorInp] = useState();
//   const [titleInp, settitleInp] = useState("ddd");
//   const docRef = doc(db, "books", titleInp);

//   console.log(titleInp);

//   const addNewBook = (e) => {
//     e.preventDefault();
//     addDoc(colRef, {
//       title: titleInp,
//       author: authorInp,
//     });
//   };

//   const onDeleteBook = (e) => {
//     e.preventDefault();
//     deleteDoc(docRef);
//   };

  
// }
  
  