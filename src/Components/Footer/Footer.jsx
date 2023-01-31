import React, { useState } from 'react';
import { useEffect } from 'react';
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
    <div className='container align-text-bottom a w-50'>
      <input onChange={e=>setInput(e.target.value)} />
      <div className='container'>
      {
        data.map((e)=>(
          <div className='rounded text-light border'> {e.properties.formatted }</div>
        ))
      }
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum repellendus non porro quidem laboriosam soluta dolorum delectus enim cum! Enim, repudiandae optio nesciunt illum tempora ea id eum laboriosam quibusdam blanditiis quia! Natus mollitia at autem animi, commodi expedita. Ad velit soluta magnam doloremque dolore voluptas architecto consequatur itaque molestias optio repellat nisi inventore, laborum eius asperiores id nam alias.</p>
    </div>
  )
}
