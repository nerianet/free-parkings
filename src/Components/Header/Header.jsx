import React, { useEffect } from 'react'
import { useContext } from 'react';
import { FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';


export default function Header() {
  const {currentUser,setCurrentUser} = useContext(MyContext);

  function Disconnect(){
    setCurrentUser({});
    localStorage.clear();
  } 

  useEffect(()=>{
    let i = document.getElementById('profile')
    console.log(i);
    i.classList.add('show')
  },[])
  return (
    <div>
    <ul id='GoToUp' className='d-flex justify-content-around fs-2 list-unstyled bg_header text-light sticky-top'>
      <li><Link to={"/"}><img className='rounded-circle mt-1' src='https://images.template.net/85586/free-car-parking-illustration-ql7jz.jpg' width="100px" height="70px"/></Link></li>
      <li>Free Parkings</li>
      <li></li>
      <div className="btn-group " id='profile' role="group">
        <p className='p-2'>{currentUser.yourName}</p>
        <img id="btnGroupDrop1" type="button" className="dropdown-toggle rounded-circle mt-1 show" data-bs-toggle="dropdown" aria-expanded="true" src={currentUser.profileUrl ? currentUser.profileUrl : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} style={{ width: "60px", height: "60px" }} />
        <ul className="dropdown-menu mx-sm-0 mx-2" aria-labelledby="btnGroupDrop1">
        <li className='bg-primary d-flex justify-content-center'>{currentUser.yourName}</li>
          <li><Link className="dropdown-item link-primary d-flex justify-content-center" to={'/MyAccount'}>My Account</Link></li>
          <li>
          {currentUser.yourName != undefined ? 
        <li><button className='dropdown-item bg-danger d-flex justify-content-center' onClick={Disconnect}>Disconnect<FaUserCheck className='mx-1 mt-1'/></button></li>
        : 
        <li ><Link  className='dropdown-item btn btn-primary d-flex justify-content-center' to={"/LogIn"}>LogIn <FaUserAltSlash/></Link></li>}</li>
        <li><Link className='link-primary dropdown-item d-flex justify-content-center' to={"/About"}>About</Link></li>
        </ul>
      </div>
    </ul>
    </div>
  )
}
