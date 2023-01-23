import React from 'react'
import { useContext } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';


export default function Header() {
  const {currentUser} = useContext(MyContext);

  return (
    <>
    <ul className='d-flex fs-2 gap-4 sticky-top list-unstyled bg-warning'>
      <li></li>
      <li><Link to={"/"}><img src='https://i.ibb.co/mcCN2jp/logo-free-parking.png' width="100px" height="70px"/></Link></li>
      <li></li>
      <li><Link to={"/User"}>User</Link><FaUserAlt/></li>
      <li></li>
      <li><Link to={"/About"}>About</Link></li>
      <li>Hello {currentUser}</li>
    </ul>
    </>
  )
}
