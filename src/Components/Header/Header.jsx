import React from 'react'
import { useContext } from 'react';
import { FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';


export default function Header() {
  const {currentUser,setCurrentUser} = useContext(MyContext);

  function Disconnect(){
    setCurrentUser(undefined);
    localStorage.clear();
  } 
  return (
    <>
    <ul className='d-flex justify-content-around fs-2 sticky-top list-unstyled bg_header'>
      <li><Link to={"/"}><img className='rounded-circle' src='https://images.template.net/85586/free-car-parking-illustration-ql7jz.jpg' width="100px" height="70px"/></Link></li>
      <li></li>
      <li></li>
      <li><Link className='link-light' to={"/About"}>About</Link></li>
      <div className='d-flex '>
      {currentUser != undefined ? 
       <li><button style={{marginLeft:'6px'}} className='btn btn-danger' onClick={Disconnect}>{currentUser} <FaUserCheck/></button></li>
      : 
      <li><Link style={{marginLeft:'6px'}} className='btn btn-primary' to={"/LogIn"}>LogIn <FaUserAltSlash/></Link></li>}
      </div>
      

    {/* <div class="btn-group" role="group">
      <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Dropdown
      </button>
      <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
        <a class="dropdown-item" href="#">Dropdown link</a>
        <a class="dropdown-item" href="#">Dropdown link</a>
      </div>
    </div> */}

    </ul>
    </>
  )
}
