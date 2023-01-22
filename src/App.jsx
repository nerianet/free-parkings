import React, { createContext, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Data from './Data.json'
import { firebase } from './firebasee/firebase';
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import User from './Components/User/User'
import Parkings from './Components/Parkings/Parkings';
import Parking from './Components/Parking/Parking';
import About from './Components/About/About';
import Footer from './Components/Footer/Footer';
import handleSubmit from './firebasee/firebase';
import { useRef } from 'react';
import SignIn from './Components/SignIn/SignIn';

export const MyContext = createContext() // הצהרה רישונית

export default function App() {
  const [users, setUsers] = useState([{userName: '', password: '' }]);
  const [currentUser, setCurrentUser] = useState([]);



  const [data, setData] = useState(Data)
  const AllData = {
    data,
    setData,
    handleSubmit,
    users,
    setUsers,
    currentUser,
    setCurrentUser
  }
   
  


  
  
  return (

    <>
      <div className='bg-warning'>
        <MyContext.Provider value={AllData}>
        <Header />
        <Footer/>
        
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/User" element={<User />}></Route>
          <Route path="/Parkings" element={<Parkings />}></Route>
          <Route path="/Parkings/:id" element={<Parking />}></Route>
          <Route path="/About" element={<About />}></Route>
          <Route path="/:SignIn" element={<SignIn />}></Route>
        </Routes>
        </MyContext.Provider>
      </div>
      </>
  )
}
