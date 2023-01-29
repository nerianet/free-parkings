// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { MyContext } from "../App";
import { createContext, useContext } from "react";
import { useEffect } from "react";

////////////////////////////////////////////////
  // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// id firebase moshe
const firebaseConfig = {
  apiKey: "AIzaSyCE46HDKoXWiSBOUZo441i2f4PRRdONjXI",
  authDomain: "try1-a18d6.firebaseapp.com",
  databaseURL: "https://try1-a18d6-default-rtdb.firebaseio.com",
  projectId: "try1-a18d6",
  storageBucket: "try1-a18d6.appspot.com",
  messagingSenderId: "100068955353",
  appId: "1:100068955353:web:99a6e4faadeca2bb3c1ac8",
  measurementId: "G-LHT35GSMXR"
};

/////////////////////////////////////////////////////////////////
// id firebase neria levi
// const firebaseConfig = {
//   apiKey: "AIzaSyAK5PLfIapMOYTcRqQ20yuQ2hm-nap_Elw",
//   authDomain: "project-my-daab8.firebaseapp.com",
//   projectId: "project-my-daab8",
//   storageBucket: "project-my-daab8.appspot.com",
//   messagingSenderId: "694751906767",
//   appId: "1:694751906767:web:d97e5177f7ecc86fe0e0ba",
//   measurementId: "G-V0Y3ETJH0B"
// };
///////////////////////////////////////////////////////////////////

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage();




// //queries
 //let q = query(ref, where("userName", "==", "nadav amar"));


//   const onDeleteBook = (e) => {
//     e.preventDefault();
//     deleteDoc(docRef);
//   };

  


// const provider = new GoogleAuthProvider();provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// const auth = getAuth(app);
  // signInWithPopup(auth, provider)
  //   .then((result) => {
  //     // This gives you a Google Access Token. You can use it to access the Google API.
  //     const credential = GoogleAuthProvider.credentialFromResult(result);
  //     const token = credential.accessToken;
  //     // The signed-in user info.
  //     const user = result.user;
      
  //     // setCurrentUser(user.displayName);
  //     // setUserID(user.id);

  //     // ...
  //   }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     // ...
  //   });


  
  