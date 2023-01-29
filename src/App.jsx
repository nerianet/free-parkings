import React, { createContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Data from "./Data.json";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import LogIn from "./Components/logIn/LogIn";
import Parkings from "./Components/Parkings/Parkings";
import Parking from "./Components/Parking/Parking";
import About from "./Components/About/About";
import Footer from "./Components/Footer/Footer";
import NewUser from "./Components/NewUser/NewUser";
import PostParking from "./Components/PostParking/PostParking";

// firestore Files
import { firestore, storage } from "./firebasee/firebase";
import { addDoc, collection, onSnapshot, query, where } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes  } from "firebase/storage";
///////////////////////////////////

export const MyContext = createContext(); // הצהרה רישונית

export default function App() {

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [userID, setUserID] = useState();

  /////////////////////////////////
  const usersRef = collection(firestore, "users"); // Firebase creates this automaticall//
  const setNewUser = (testdata) => {
    try {
      addDoc(usersRef, testdata);
    } catch (err) {
      console.log(err);
    }
  };

  const postsRef = collection(firestore, "posts"); // Firebase creates this automaticall//
  const setNewPost = (testdata) => {
    try {
      addDoc(postsRef, testdata);
    } catch (err) {
      console.log(err);
    }
  };
   
  let q = query(usersRef);
  // get collection users data
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      setUsers(books);
    });
  }, []);

  useEffect(()=>{
    check();
  },[users])

  function check () {
    if(users[0] != undefined)  {
      users.map((e)=>{
      if (localStorage.getItem('id') === e.id) {
        setCurrentUser(e.YourName);
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

        // Or inserted into an <img> element
        //setImage(url);
      })
      .catch((error) => {
        console.log(error);
      });
    }
};
  ////////////////////////////////////////////////
 
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
          <Footer />
        </MyContext.Provider>
      </div>
    </div>
  );
}
