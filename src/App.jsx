import React, { createContext, useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
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
import MyParking from "./Components/myParking/MyParking";
import Admin from "./Components/admin/Admin";

// firestore Files
import { firestore, storage } from "./firebase/Firebase";
import { addDoc, collection, onSnapshot, query, where, doc, updateDoc, deleteDoc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadBytes,deleteObject  } from "firebase/storage";
import Users from "./Components/Users/Users";
//////////////////////////////////////////////////////////////////////////////////////////////

export const MyContext = createContext(); // הצהרה רישונית

export default function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [image, setImage] = useState();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [cordUser, setCordUser] = useState();
  const [profileUrl, setProfileUrl] = useState('');
  const [users, setUsers] = useState([]);
  //////////////////////////////////////////////////////////////////////////////////////////////

  const localeUId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const usersRef = collection(firestore, "users");
  let v = 0;
  const setNewUser = (userData) => {
    const queryUser = query(usersRef, where('userName', '==', `${userData.userName}`));
    onSnapshot(queryUser, (snapshot) => {
      const books = [];
      snapshot.docs.forEach((doc) => {
        books.push({ ...doc.data(), id: doc.id });
      });
      if(books[0] && v == 0){
        window.alert("You Have a Account");
        navigate('/LogIn');
      } else if(v == 0) {
        try {
          addDoc(usersRef, userData);
        } 
        catch (err) {
          console.log(err);
        }
        localStorage.setItem("userId", `${userData.userId}`);
        setCurrentUser(userData);
        navigate('/');
      }
      v=1;
    })
  }
  
  let postsRef = collection(firestore, "posts");
  let idPost;
  // Firebase creates this automaticall//
  const setNewPost = (postData) => {
    try { 
      // doc(firestore,"posts", )
      let n = addDoc(postsRef, postData)
      .then((result)=>{
        idPost = result.id;
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
         setCurrentUser(books.find((e)=> e.userId == localeUId));
        } else {
          if(books[0].password == password){
            setCurrentUser(books[0]);
            localStorage.setItem("userId", `${books[0].userId}`);
            navigate('/');
          } else if(!password && UserName){
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
  useEffect(()=>{
    if(profileUrl !== ''){
      updateUser({...currentUser, profileUrl: profileUrl});
    }
    getAllUsers();
  }, [currentUser])

  function getAllUsers(){
    if(currentUser.admin === 'true'){
      let queryUser = query(usersRef);
      onSnapshot(queryUser, (snapshot) => {
        const books = [];
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        let v = [];
        books.map((e,i)=>{
            v[i] = {
              yourName: e.yourName,
              userName: e.userName,
              userId: e.userId,
              profileUrl:  e.profileUrl,
              id: e.id,
              admin: e.admin,
            }
        })
        setUsers(v)
      });
    }
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
      setInput('');
    });
  };

  function getUrl() {
    if(idPost == undefined || flag == false){}
    else{
      getDownloadURL(storageRef)
      .then((url) => {
        const u = doc(firestore, "posts", `${idPost}`);
        const loc = updateDoc(u,{"imgUrl": `${url}`});
       })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  function updateUser(user){
    let a = doc(firestore, 'users', `${user.id}`);
    const loc = updateDoc(a,user);
  }

  function updatePost(current){
    let a = doc(firestore, 'posts', `${current.id}`);
    const loc = updateDoc(a,current);
  }

  function postDelete(id, fileName){

    /// delete post from firebase
    let a = doc(firestore, 'posts', `${id}`);
    let n = deleteDoc(a);

    /// delete image from firebase
    storageRef = ref(storage, currentUser.userId + "/images/" + `${fileName}`);
    deleteObject(storageRef);

    let arr = posts.filter((item)=> item.id != id);
    setPosts(arr);
  }

  function userDelete(id){
    let u = users.find((e)=> e.id == id);
    let p = posts.filter((e)=> e.userId == u.userId);
    p.map((e)=>{
      postDelete(e.id, e.fileName);
    })
    p = posts.filter((e)=> e.userId != u.userId);
    setPosts(p);

    /// delete user from firebase
    let a = doc(firestore, 'users', `${id}`);
    let n = deleteDoc(a);
    let arr = users.filter((item)=> item.id != id);
    setUsers(arr);
  }
//////////////////////////////////////////////////////////////////////////////////////////////
 
  const AllData = {
///////////////////
    setNewUser,
    setNewPost,
    setStorage,
    setUser,
    postDelete,
    updateUser,
    updatePost,
    userDelete,
///////////////////
    currentUser,
    setCurrentUser,
    setImage,
    image,
    posts,
    isLoading,
    isShowModal,
    setIsShowModal,
    input, 
    setInput,
    cordUser,
    setCordUser,
    setProfileUrl,
    users,
    setUsers,
  };

  return (
    <div className="bg_site vh-100 ">
      <div className="bg_site">
        <MyContext.Provider value={AllData}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/*" element={<PageError />}></Route>
            <Route path="/LogIn" element={<LogIn />}></Route>
            <Route path="/MyAccount" element={<MyAccount />}></Route>
            <Route path="/Parkings" element={<Parkings />}></Route>
            <Route path="/Parkings/:id" element={<Parking />}></Route>
            <Route path="/MyAccount/:id" element={<MyParking />}></Route>
            <Route path="/About" element={<About />}></Route>
            <Route path="/NewUser" element={<NewUser />}></Route>
            <Route path="/PostParking" element={<PostParking />}></Route>
            <Route path="/Users" element={<Users />}></Route>
            <Route path="/Users/Admin/:id" element={<Admin />}></Route>
          </Routes>
          <Footer />
        </MyContext.Provider>
      </div>
    </div>
  );
}
