import React, { createContext, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Data from './Data.json'

import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import User from './Components/User/User'
import Parkings from './Components/Parkings/Parkings';
import Parking from './Components/Parking/Parking';
import About from './Components/About/About';


export const MyContext = createContext() // הצהרה רישונית

export default function App() {

  const [data, setData] = useState(Data)

  const AllData = {
    data,
    setData
  }

  return (
    <div className='bg-warning'>
    <MyContext.Provider value={AllData}>
    <Header />
    
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/User" element={<User />}></Route>
      <Route path="/Parkings" element={<Parkings />}></Route>
      <Route path="/Parking/:id" element={<Parking />}></Route>
      <Route path="/About" element={<About />}></Route>
    </Routes>
    </MyContext.Provider>
    </div>
  )
}
