import React, { useContext, useEffect, useState } from 'react';
import { useGeolocated } from "react-geolocated";
import { MyContext } from '../App';


export default function Location() {
  const {setCordUser, cordUser} = useContext(MyContext);

  const v = useGeolocated();
  
  useEffect(()=>{
    if(v.coords != undefined){
      setCordUser({latitude : v.coords.latitude, longitude: v.coords.longitude});
      KokaKola();
    }
  }, [v.coords])

  
 
  return (
    <div>
        {cordUser != undefined ? <iframe id='momo' src={`https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:${cordUser.longitude},${cordUser.latitude}&zoom=14&apiKey=0d1d8fa39ae14774b80d34e9c2fe719e`}
        width="900px" style={{height:"500px", border:'0' }}
        loading="lazy" >
        </iframe> : ""}
        {/* <img src='icon?type=material&color=red&size=small&icon=cloud&iconType=awesome&noShadow'/> */}
  </div>
  )
}
