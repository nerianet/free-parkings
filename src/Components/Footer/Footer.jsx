import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';


const API_KEY = "0d1d8fa39ae14774b80d34e9c2fe719e";
var requestOptions = { method: 'GET' };

export default function Footer() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  useEffect(()=>{
    fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${API_KEY}`, requestOptions)
    .then(response => response.json())
    .then(result => setData(result.features != undefined ? result.features : []))
    .catch(error => console.log('error', error));
  },[input])
  
  
  return (
    <>
    <div className='container align-text-bottom a w-50'>
      <input onChange={e=>setInput(e.target.value)} />
      <div className='container'>
      {
        data.map((e)=>(
          <div className='rounded text-dark border'> {e.properties.city }</div>
        ))
      }
      </div>
    </div>

    <div className="container-fluid text-center text-md-left pt-5 bg_header text-white ">
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
