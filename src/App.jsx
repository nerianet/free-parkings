import React, { createContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Data from "./Data.json";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import User from "./Components/User/User";
import Parkings from "./Components/Parkings/Parkings";
import Parking from "./Components/Parking/Parking";
import About from "./Components/About/About";
import Footer from "./Components/Footer/Footer";
//import handleSubmit from './firebasee/firebase';
import { firestore, storage } from "./firebasee/firebase";
import { addDoc, collection, onSnapshot, query } from "@firebase/firestore";
import { ref } from "firebase/storage";


import { useEffect } from "react";

import NewUser from "./Components/NewUser/NewUser";
import PostParking from "./Components/PostParking/PostParking";
import "./App.css";
import { uploadBytes } from "firebase/storage";
export const MyContext = createContext(); // הצהרה רישונית

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [post, setPost] = useState();

  /////////////////////////////////
  const fireRef = collection(firestore, "test_data"); // Firebase creates this automaticall//
  const storageRef = ref(storage, "post" + ".jpg"); // Firebase creates this automaticall//

  const handleSubmit = async (testdata) => {
    try {
      addDoc(fireRef, testdata);
      // getDocs()
    } catch (err) {
      console.log(err);
    }
  };

  const setStorage = async (file) => {
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }


  let q = query(fireRef);
  // real time collection data
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
        // console.log(books);
        setUsers(books);
      });
      //console.log(books[0].userName);
    });
  }, []);

  ////////////////////////////////////////////////
  useEffect(() => {
    // console.log();
  });

  const [data, setData] = useState(Data);
  const AllData = {
    data,
    setData,
    handleSubmit,
    setStorage,
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    post,
    setPost,
  };
  console.log(users);
  return (
    <div className="bg_site vh-100 ">
      <div className="bg_site">
        <MyContext.Provider value={AllData}>
          <Header />

          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/User" element={<User />}></Route>
            <Route path="/Parkings" element={<Parkings />}></Route>
            <Route path="/Parkings/:id" element={<Parking />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/NewUser" element={<NewUser />}></Route>
            <Route path="/PostParking" element={<PostParking />}></Route>
          </Routes>
          <Footer />
        </MyContext.Provider>
      </div>
    </div>
  );
}
