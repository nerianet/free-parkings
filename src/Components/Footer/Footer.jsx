import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';
import { location } from '../API/APIs';
import './Footer.css';


export default function Footer() {

  return (
    <>
    <div className="container-fluid text-center text-md-left  bg_header text-white ">
    <div className="row">
      <div className="col-md-6 mt-md-0 mt-3">
        <h5 className="text-uppercase">Free Parkings</h5>
        <p>Here you can use rows and columns to organize your footer content.</p>
      </div>

      <hr className="clearfix w-100 d-md-none pb-0"/>

      <div className="col-md-3 mb-md-0 mb-3">
        <ul className="list-unstyled">
          <li><Link to={"/About"}>Contact Us</Link></li>        
        </ul>
      </div>

      <div className="col-md-3 mb-md-0 mb-3">
          <ul className="list-unstyled">
            <li><Link to={"/About"}>About</Link></li>
          </ul>
      </div>
    </div>
    

    <div className="footer-copyright text-center py-3">© 2023 Free parkings:
    <a href="#GoToUp">Go To Up</a>
    </div>
    </div>
  </>
  )
}
