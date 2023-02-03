import React, { createContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import MyAccount from "./Components/MyAccount/MyAccount";
import PageError from "./Components/PageError/PageError";
import Location from "./location/Location";

// firestore Files
import { firestore, storage } from "./firebase/Firebase";
import { addDoc, collection, onSnapshot, query, where, doc, updateDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes  } from "firebase/storage";
//////////////////////////////////////////////////////////////////////////////////////////////

export const MyContext = createContext(); // הצהרה רישונית

export default function App() {

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [name, setName] = useState("");
  const [image, setImage] = useState();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false)
//////////////////////////////////////////////////////////////////////////////////////////////

  const localeUId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const usersRef = collection(firestore, "users");
  const setNewUser = (userData) => {
    try {
      addDoc(usersRef, userData);
    } 
    catch (err) {
      console.log(err);
    }
  };

  let postsRef = collection(firestore, "posts");
  let idImg;
  // Firebase creates this automaticall//
  const setNewPost = (postData) => {
    try { 
      // doc(firestore,"posts", )
      let n = addDoc(postsRef, postData)
      .then((result)=>{
        idImg = result.id;
        postData.id = result.id;
        getUrl();
        }) .catch((error) => console.log(error));
      setPosts([...posts, postData]);     
    } 
    catch (err) {
      console.log(err);
    }  
  };
   
  function setUser (UserName, password){ 
    let queryUser;
  if(localeUId != null) {
    console.log(localeUId);
    queryUser = query(usersRef, where('userId', '==', `${localeUId}`));
  } else {
    queryUser = query(usersRef, where('userName', '==', `${UserName}`));
  }
      onSnapshot(queryUser, (snapshot) => {
      const books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      if(books[0] != undefined){
        if(localeUId != null) {
          setCurrentUser(books[0]);
          localStorage.setItem("userId", `${books[0].userId}`);
          navigate('/');
        } else {
          if(books[0].password == password){
            setCurrentUser(books[0]);
            localStorage.setItem("userId", `${books[0].userId}`);
            navigate('/');
          } else {
            window.alert("Please Enter Password correct");
          }
        }
      } else {
        if(password == undefined) {}
        else window.alert("Please Sign In");
    }
    });
  
  }

  useEffect(() => {
    setUser();
    let queryPosts = query(postsRef);
    onSnapshot(queryPosts, (snapshot) => {
      const books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
    //  console.log(currentUser);
      setPosts(books);     
    });
  },[]);

  let storageRef;
  let flag;
  const setStorage = (file) => {
    flag = false;
    storageRef = ref(storage, currentUser.userId + "/images/" + file.name); // Firebase creates this automaticall//
    setIsLoading(true);
    uploadBytes(storageRef, file)
    .then((snapshot) => {
      console.log('Uploaded successed!');
      flag = true;
      setIsLoading(false);
      setIsShowModal(true);
      getUrl();
    });
  };

  function getUrl() {
    if(idImg == undefined || flag == false){}
    else{
      getDownloadURL(storageRef)
      .then((url) => {
        const u = doc(firestore, "posts", `${idImg}`);
        const loc = updateDoc(u,{"imgUrl": `${url}`});
        // Set the field 
        //const res = await loc.update();
        // `url` is the download URL for 'images/stars.jpg'
    
        // Or inserted into an <img> element
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////
 
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
    setImage,
    image,
    posts,
    isLoading,
    isShowModal,
    setIsShowModal,
    setUser,
  };

  return (
    <div className="bg_site vh-100 ">
      <div className="bg_site">
        {/* <Location/> */}
        <MyContext.Provider value={AllData}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/*" element={<PageError />}></Route>
            <Route path="/LogIn" element={<LogIn />}></Route>
            <Route path="/MyAccount" element={<MyAccount />}></Route>
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
