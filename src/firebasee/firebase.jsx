// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage, ref } from "firebase/storage";


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
export const storage = getStorage();




// //queries
 //let q = query(ref, where("userName", "==", "nadav amar"));


//   const onDeleteBook = (e) => {
//     e.preventDefault();
//     deleteDoc(docRef);
//   };

  
// }
  
  