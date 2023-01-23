import { async } from '@firebase/util';
import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react'
import { Link } from 'react-router-dom';
import { MyContext } from '../../App'
import { firestore } from '../../firebasee/firebase';
import "./User.css"
import Home from '../Home/Home'

export default function User() {
  const {handleSubmit, users,setUsers, setCurrentUser} = useContext(MyContext);
  const userName = useRef();
  const password = useRef();

  const submithandler = (a) => {
    a.preventDefault();
     console.log(users[0]);
    if(users[0] == undefined)
    {
      console.log("You Dont Have a acount");
    }
    else{
      users.map((e)=>{
        if( e.userName == userName.current.value){
        setCurrentUser(e.YourName);
        console.log("Haii`m");
        }
        else{
          prompt("Please Sign In");
        }
      })
    }
    userName.current.value = "";
    password.current.value = "";
  }


  return (
    <div className='body'>
    <form className='form-signin' onSubmit={submithandler}>
      <div className='text-center mb-4'>
        <img className='mb-4' src={"https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"} alt="icon" width="72" height="72" />
        <h1 class="h3 mb-3 font-weight-normal">כניסת משתמש</h1>
        <p>Build form controls with floating labels via the <code>:placeholder-shown</code> pseudo-element. <a href="https://caniuse.com/#feat=css-placeholder-shown">Works in latest Chrome, Safari, and Firefox.</a></p>
      </div>

      <div class="form-label-group">
        <input ref={userName} type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
        <label for="inputEmail">Email address</label>
      </div>

      <div class="form-label-group">
        <input ref={password} type="password" id="inputPassword" class="form-control" placeholder="Password" required />
        <label for="inputPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" >Login</button>
      <Link to={'/:SignIn'} class="btn btn-lg btn-primary btn-block" style={{marginLeft:'3px'}}>Sign in</Link>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2022-2023</p>
    </form>
    </div>
  )
}
