import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App'
import { getAuth, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import {app} from '../../firebase/Firebase'
import "./LogIn.css"


export default function LogIn() {
  const { setUser, setProfileUrl } = useContext(MyContext);
  const userName = useRef();
  const password = useRef();
// get users data


  //////////////////////////////////////////////////////////////////////////////
  const handleSignWithGoogle = () =>{
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const auth = getAuth(app); 
      signInWithPopup(auth, provider)
        .then((result) => {
          // The signed-in user info.
          const userr = result.user;
          setProfileUrl(userr.photoURL);
          setUser(userr.email);
        })
        .catch((error) => {
        
        });
  }

  const submithandler = (a) => {
    a.preventDefault();
    setUser(userName.current.value, password.current.value);
      userName.current.value = "";
      password.current.value = "";
  }


  const [email, setEmail] = useState('');
  const auth = getAuth();

  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    await confirmPasswordReset(auth, )
    // console.log();
  }


  function hideReset(){
    let a = document.getElementById('Reset');
    if(a.style.display == "none"){
      a.style.display = "block";
    }
    else{
      a.style.display = "none";
    }
  }
  ////////////////////////////////////////////////////////////////////////////// 

  return ( 
    <div className='body '>
    <form className='form-signin bg_login rounded' onSubmit={submithandler}>
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

      <div className='btn text-primary d-flex justify-content-center' onClick={hideReset}>Forgot Password</div>
      <div id='Reset' style={{display: "none"}}>
        <div class="input-group d-flex justify-content-center w-sm-75 rounded">
          <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)}/>
          <div class="input-group-append">
            <button class="btn btn-warning btn-outline-secondary" type="button" onClick={triggerResetEmail}>Reset Password</button>
          </div>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2022-2023</p>
    </form>
    </div>
  )
}