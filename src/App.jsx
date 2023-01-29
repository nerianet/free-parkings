import React, { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Data from "./Data.json";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import LogIn from "./Components/logIn/LogIn";
import Parkings from "./Components/Parkings/Parkings";
import Parking from "./Components/Parking/Parking";
import About from "./Components/About/About";
import Footer from "./Components/Footer/Footer";
// firestore Files
import { firestore, storage } from "./firebasee/firebase";
import { addDoc, collection, onSnapshot, query, where } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes  } from "firebase/storage";
///////////////////////////////////

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
  const usersRef = collection(firestore, "users"); // Firebase creates this automaticall//
  //console.log(image)
  const setNewUser = (testdata) => {
    try {
      addDoc(usersRef, testdata);
      // getDocs()
    } catch (err) {
      console.log(err);
    }
  };

  const postsRef = collection(firestore, "posts"); // Firebase creates this automaticall//
  //console.log(image)
  const setNewPost = (testdata) => {
    try {
      addDoc(postsRef, testdata);
      // getDocs()
    } catch (err) {
      console.log(err);
    }
   
  };
   
  
  let q = query(usersRef);
  // where("id", "==", userID)
  // real time collection data
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      setUsers(books);
      //console.log(books);
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
        //setImage(url);
        console.log(url);
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
    setNewUser,
    setNewPost,
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
    setImage,
    image,
  };
  //console.log(users);
  return (
    <div className="bg_site vh-100 ">
      <div className="bg_site">
        <MyContext.Provider value={AllData}>
          <Header />
          {users.map((e)=>(
            <div>{e.YourName}</div>
          ))}
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/LogIn" element={<LogIn />}></Route>
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
