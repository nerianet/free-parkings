import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from '../../firebase/Firebase'
import "./LogIn.css"


export default function User() {
  const { users,  setCurrentUser} = useContext(MyContext);
  const userName = useRef();
  const password = useRef();
  const navigate = useNavigate();

  
  const submithandler = (a) => {
    a.preventDefault();
    const found = users.find((user) => user.userName === userName.current.value);
     if(found){
      if(password.current.value === found.password){
        console.log(found);
        setCurrentUser(found);
        userName.current.value = "";
        password.current.value = "";
        navigate('/');
        localStorage.setItem("userName", `${found.userName}`);
      } else {
        password.current.value = "";
      }
     } else {
     // prompt("Please Sign In");
      window.alert("Please Sign In");
     }       
    userName.current.value = "";
    password.current.value = "";
  }

  //////////////////////////////////////////////////////////////////////////////
  const handleSignWithGoogle = () =>{
    const provider = new GoogleAuthProvider();provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const auth = getAuth(app);
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const userr = result.user;
          console.log(userr);
          //setCurrentUser(user);
          // setUserID(user.id);
          const found = users.find((user) => user.userName === userr.email);
        //  console.log(found);
          if(found != undefined) {
            setCurrentUser(found);
            navigate('/');
            localStorage.setItem("userName", `${found.userName}`);
          }
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
  }
  
  //////////////////////////////////////////////////////////////////////////////

  return ( 
    <div className='body '>
    <form className='form-signin bg_header rounded' onSubmit={submithandler}>
      <div className='text-center mb-4'>
        <img className='mb-4' src={"https://i.ibb.co/mcCN2jp/logo-free-parking.png"} alt="icon" width="72" height="72" />
        <h1 class="h3 mb-3 font-weight-normal text-light">Enter User</h1>
        <Link className='link-light' to={'/NewUser'}>New User? Click here</Link>
      </div>

      <div class="form-label-group">
        <input ref={userName} type="email" id="inputEmail" class="form-control" placeholder="Email address" required autoFocus />
        <label for="inputEmail">Email address</label>
      </div>

      <div class="form-label-group">
        <input ref={password} type="password" id="inputPassword" class="form-control" placeholder="Password" required />
        <label for="inputPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label className='text-light'>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" >Login</button>
      <button class="btn btn-lg btn-primary btn-block mx-5" onClick={handleSignWithGoogle} >Login With Google</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2022-2023</p>
    </form>
    </div>
  )
}