import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App'
import { async } from '@firebase/util';
import { firestore } from '../../firebasee/firebase';
import "./User.css"
import Home from '../Home/Home'

export default function User() {
  const {handleSubmit, users, setUsers, setCurrentUser, currentUser} = useContext(MyContext);
  const userName = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const submithandler = (a) => {
    a.preventDefault();
    if(users[0] == undefined)
    {
      console.log("You Dont Have a acount");
    }
    else{
     const found = users.find((user) => user.userName === userName.current.value);
     if(found){
      console.log("Haii`m");
      setCurrentUser(found.YourName);
      userName.current.value = "";
      password.current.value = "";
      navigate('/');
     } else{
     // prompt("Please Sign In");
      window.alert("Please Sign In");
     }       
    userName.current.value = "";
    password.current.value = "";
  }
  }

  return ( 
    <div className='body'>
    <form className='form-signin' onSubmit={submithandler}>
      <div className='text-center mb-4'>
        <img className='mb-4' src={"https://i.ibb.co/mcCN2jp/logo-free-parking.png"} alt="icon" width="72" height="72" />
        <h1 class="h3 mb-3 font-weight-normal">Enter User</h1>
        <Link to={'/NewUser'}>New User? Click here</Link>
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
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2022-2023</p>
    </form>
    </div>
  )
}