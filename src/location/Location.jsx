import React, { useContext, useEffect, useState } from 'react';
import { useGeolocated } from "react-geolocated";
import { MyContext } from '../App';


export default function Location() {
  const {setCordUser, cordUser} = useContext(MyContext);

  const v = useGeolocated();
  let L = "https://api.geoapify.com/v1/icon/?type=material&color=red&icon=cloud&iconType=awesome&apiKey=0d1d8fa39ae14774b80d34e9c2fe719e";
  const m = document.getElementById('momo');
  function KokaKola(){
    const markerIcon = L.icon({
    iconUrl: `https://api.geoapify.com/v1/icon?size=xx-large&type=awesome&color=%233e9cfe&icon=paw&apiKey=0d1d8fa39ae14774b80d34e9c2fe719e`,
    iconSize: [31, 46], // size of the icon
    iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
  });
  const zooMarker = L.marker([cordUser.longitude, cordUser.latitude], {
    icon: markerIcon
  }).addTo(m);
}
  
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
