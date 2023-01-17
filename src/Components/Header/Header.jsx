import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <>
    <ul className='d-flex fs-2 gap-4 sticky-top list-unstyled bg-warning'>
      <li></li>
      <li><em><Link to={"/"}>ParkinFree</Link></em></li>
      <li></li>
      <li><Link to={"/User"}>User</Link><FaUserAlt/></li>
      <li></li>
      <li><Link to={"/About"}>About</Link></li>
    </ul>
    </>
  )
}
