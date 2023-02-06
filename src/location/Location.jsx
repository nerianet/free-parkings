import React from 'react';
import { useGeolocated } from "react-geolocated";


export default function Location() {
  const v = useGeolocated();
  const longitude = v.longitude;
  const latitude = v.latitude;

  return (
    <div>
        <iframe src="https://storage.googleapis.com/maps-solutions-lk0sprswmw/locator-plus/dsvj/locator-plus.html"
        width="100%" style={{height:"100%", border:'0' }} 
        
        loading="lazy">
        </iframe>
  </div>
  )
}
