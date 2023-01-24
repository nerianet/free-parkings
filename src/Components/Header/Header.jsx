import React from 'react'
import { useContext } from 'react';
import { FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';


export default function Header() {
  const {currentUser,setCurrentUser} = useContext(MyContext);

  function Disconnect(){
    setCurrentUser(undefined);
  } 
  return (
    <>
    <ul className='d-flex justify-content-around fs-2 gap-4 sticky-top list-unstyled bg-warning'>
      <li></li>
      <li><Link to={"/"}><img src='https://i.ibb.co/mcCN2jp/logo-free-parking.png' width="100px" height="70px"/></Link></li>
      <li></li>
      <li></li>
      <li><Link to={"/About"}>About</Link></li>
      <div className='d-flex '>
      <li className=''>Hello {currentUser ? currentUser : "Guest"}</li>
      {currentUser != undefined ? 
       <li><button style={{marginLeft:'6px'}} className='btn btn-danger' onClick={Disconnect}><FaUserCheck/></button></li>
      : 
      <li><Link style={{marginLeft:'6px'}} className='btn btn-primary' to={"/User"}><FaUserAltSlash/></Link></li>}
      </div>
    </ul>
    </>
  )
}
