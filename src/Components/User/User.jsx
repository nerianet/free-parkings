import React, { useState, useEffect, useContext, useRef } from 'react'
import { Link } from 'react-router-dom';
import { MyContext } from '../../App'
import { async } from '@firebase/util';
import { firestore } from '../../firebasee/firebase';
import "./User.css"
import Home from '../Home/Home'

export default function User() {
  const {handleSubmit, users, setUsers, setCurrentUser} = useContext(MyContext);
  const userName = useRef();
  const password = useRef();

  const submithandler = (a) => {
    a.preventDefault();
    // console.log(users);
    for(let i = 0; i < users.length; i++){
      if(users[i].userName == ''){
         console.log("Moshe");
        prompt("Please Log In");
      }
      else if( users[i].userName == userName.current.value){
        setCurrentUser(users[i].userName);
        console.log("Haii`m");
      }
      else{
        prompt("Please Sign In");
      }
    }
    userName.current.value = "";
    password.current.value = "";
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



//<Link to={'/:SignIn'} class="btn btn-lg btn-primary btn-block" style={{marginLeft:'3px'}}>Sign in</Link>
