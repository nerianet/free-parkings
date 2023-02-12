import React, { useContext, useEffect, useState } from 'react';
import { useGeolocated } from "react-geolocated";
import { MyContext } from '../App';


export default function Location() {
  const {setCordUser, cordUser} = useContext(MyContext);

  const v = useGeolocated();

  useEffect(()=>{
    if(v.coords != undefined){
      setCordUser({latitude : v.coords.latitude, longitude: v.coords.longitude});
    }
  }, [v.coords])

  
 
  return (
    <div>
        {cordUser != undefined ? <iframe src={`https://maps.geoapify.com/v1/staticmap?style=positron&width=800&height=600&center=lonlat:${cordUser.longitude},${cordUser.latitude}&zoom=11.7625&marker=lonlat:${cordUser.longitude},${cordUser.latitude};type:awesome;color:%23aa3f79;size:x-large;icon:parking&apiKey=0d1d8fa39ae14774b80d34e9c2fe719e`}
        width="900px" style={{height:"500px", border:'0' }} 
        
        loading="lazy">
        </iframe> : ""}
  </div>
  )
}
