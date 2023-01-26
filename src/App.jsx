import React, { createContext, useState } from "react";
import { Routes, Route, Await } from "react-router-dom";
import Data from "./Data.json";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import LogIn from "./Components/logIn/LogIn";
import Parkings from "./Components/Parkings/Parkings";
import Parking from "./Components/Parking/Parking";
import About from "./Components/About/About";
import Footer from "./Components/Footer/Footer";
//import handleSubmit from './firebasee/firebase';
import { firestore, storage } from "./firebasee/firebase";
import { addDoc, collection, onSnapshot, query, where } from "@firebase/firestore";
import { getDownloadURL, ref , listAll } from "firebase/storage";
import { uploadBytes } from "firebase/storage";


import { useEffect } from "react";

import NewUser from "./Components/NewUser/NewUser";
import PostParking from "./Components/PostParking/PostParking";
import "./App.css";
export const MyContext = createContext(); // הצהרה רישונית

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [userID, setUserID] = useState();

  /////////////////////////////////
  const fireRef = collection(firestore, "test_data"); // Firebase creates this automaticall//
  //console.log(image)
  const handleSubmit = (testdata) => {
    try {
      addDoc(fireRef, testdata);
      // getDocs()
    } catch (err) {
      console.log(err);
    }
   
  };
   
  
  let q = query(fireRef);
  // where("id", "==", userID)
  // real time collection data
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      setUsers(books);
      console.log(books);
      //console.log(books[0].userName);
    });
  }, []);

  useEffect(()=>{
    check();
  },[users])

  function check () {
    // console.log(users)
    if(users[0] != undefined)  {
      users.map((e)=>{
      if (localStorage.getItem('id') === e.id) {
        setCurrentUser(e.YourName);
        // console.log(e);
      }
    })
  }
  }
  
 
 

  const setStorage = (file) => {
    const storageRef = ref(storage, currentUser + "/images/" + file.name); // Firebase creates this automaticall//
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded successed!');
      getUrl();
    });
    function getUrl (){
      getDownloadURL(storageRef)
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
    
        // This can be downloaded directly:
        // const xhr = new XMLHttpRequest();
        // xhr.responseType = 'blob';
        // xhr.onload = (event) => {
        //   const blob = xhr.response;
        // };
        // xhr.open('GET', url);
        // xhr.send();
    
        // Or inserted into an <img> element
        const img = document.getElementById('myimg');
       // setImage(img);
    
        img.setAttribute('src', url);
    
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
    }
};

  //console.log(image[0]);
  

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
    name,
    setName,
    setImage,
    userID,
    setUserID,
  };
  //console.log(users);
  return (
    <div className="bg_site vh-100 ">
      <div className="bg_site">
        <MyContext.Provider value={AllData}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/LogIn" element={<LogIn />}></Route>
            <Route path="/Parkings" element={<Parkings />}></Route>
            <Route path="/Parkings/:id" element={<Parking />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/NewUser" element={<NewUser />}></Route>
            <Route path="/PostParking" element={<PostParking />}></Route>
          </Routes>
          {image != undefined ? <img className="rounded mx-3" style={{width:'500px', height:'300px'}} id="myimg" /> : ""}
          <Footer />
        </MyContext.Provider>
      </div>
     
    </div>
  );
}
