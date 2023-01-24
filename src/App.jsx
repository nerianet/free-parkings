import React, { createContext, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Data from './Data.json'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import User from './Components/User/User'
import Parkings from './Components/Parkings/Parkings';
import Parking from './Components/Parking/Parking';
import About from './Components/About/About';
import Footer from './Components/Footer/Footer';
//import handleSubmit from './firebasee/firebase';
import { firestore } from './firebasee/firebase';
import { addDoc,
         collection,
         onSnapshot,
         query,} from "@firebase/firestore"

import { useRef } from 'react';
import SignIn from './Components/SignIn/SignIn';
import { useEffect } from 'react';

import NewUser from './Components/NewUser/NewUser';
import PostParking from './Components/PostParking/PostParking';
import './App.css'
export const MyContext = createContext() // הצהרה רישונית

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  /////////////////////////////////
  const ref = collection(firestore, "test_data") // Firebase creates this automaticall// 

  const handleSubmit = async (testdata) => {
    try {
      addDoc(ref, testdata);
      // getDocs()
      } catch(err) {
      console.log(err);
      }
  }
  let q = query(ref);
  // real time collection data
  useEffect(()=>{
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
  useEffect(()=>{
   // console.log();
  });
  const [data, setData] = useState(Data);
  const AllData = {
    data,
    setData,
    handleSubmit,
    users,
    setUsers,
    currentUser,
    setCurrentUser
  }
  console.log(users);
  return (
    <div className='bg_site vh-100 '>
    <div className='bg_site'>
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
      <Footer/>
      </MyContext.Provider>
    </div>
    </div>
  )
}
