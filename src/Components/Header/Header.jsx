import React, { useState } from 'react'
import { useContext } from 'react';
import { FaUserAltSlash, FaUserCheck } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';


export default function Header() {
  const {currentUser,setCurrentUser} = useContext(MyContext);
  const [showName, setShowName] = useState(true);

  function Disconnect(){
    setCurrentUser({});
    localStorage.clear();
  } 

  
  return (
    <div className='sticky-top'>
    <ul id='GoToUp' className='d-flex justify-content-around fs-2 list-unstyled bg_header text-light w-100'>
      <li><Link to={"/"}><img className='rounded-circle mt-1' src='https://images.template.net/85586/free-car-parking-illustration-ql7jz.jpg' width="100px" height="70px"/></Link></li>
      <li>Free Parkings</li>
      <li></li>
      <p className='p-2 '>{showName ? currentUser.yourName : ""}</p>
      <div className="btn-group" onClick={()=>setShowName(!showName)} role="group">
        
        <img id="btnGroupDrop1" type="button" className="dropdown-toggle rounded-circle mt-1" data-bs-toggle="dropdown" aria-expanded="false" src={currentUser.profileUrl ? currentUser.profileUrl : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} style={{ width: "60px", height: "60px" }} />
        <ul className="dropdown-menu mx-sm-0 " aria-labelledby="btnGroupDrop1">
        <li className='d-flex justify-content-center bg-primary boredr rounded fs-3 mb-1'>{currentUser.yourName}</li>
          <li><Link className="dropdown-item link-primary d-flex justify-content-center" to={'/MyAccount'}>My Account</Link></li>
          {currentUser.yourName != undefined ? <div> 
        <li><button className='dropdown-item bg-danger d-flex justify-content-center' onClick={Disconnect}>Disconnect<FaUserCheck className='mx-1 mt-1'/></button></li>
        { currentUser.admin === 'false' ? "" :
          <Link className='dropdown-item d-flex justify-content-center' to={'/Users'}>Users</Link>
        }
        </div>
        : <div> 
          <li ><Link  className='dropdown-item btn btn-primary d-flex justify-content-center' to={"/LogIn"}>LogIn <FaUserAltSlash/></Link></li>
        </div>
        }
        <li><Link className='link-primary dropdown-item d-flex justify-content-center' to={"/About"}>About</Link></li>
        </ul>
      </div>
    </ul>
    </div>
  )
}
