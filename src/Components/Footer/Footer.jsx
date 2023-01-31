import React from 'react';
import './Footer.css';

const api_key = "0d1d8fa39ae14774b80d34e9c2fe719e";

var requestOptions = {
  method: 'GET',
};

fetch(`https://api.geoapify.com/v1/geocode/autocomplete?${ap}=Mosco&apiKey=${api_key}`, requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

export default function Footer() {
  return (
    <div className='container align-text-bottom a w-50'>
      <input />

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum repellendus non porro quidem laboriosam soluta dolorum delectus enim cum! Enim, repudiandae optio nesciunt illum tempora ea id eum laboriosam quibusdam blanditiis quia! Natus mollitia at autem animi, commodi expedita. Ad velit soluta magnam doloremque dolore voluptas architecto consequatur itaque molestias optio repellat nisi inventore, laborum eius asperiores id nam alias.
    </div>
  )
}
