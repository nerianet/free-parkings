import React, { useContext, useEffect, useRef, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import './parkings.css';


import L from 'leaflet';
import {} from 'mapbox-gl-leaflet';

const myAPIKey = "7aeea4fe26fa4c258c13fb720430df95";




export default function Parkings() {

  const [inputData, setInput] = useState("");
  const {setCordUser, cordUser, posts} = useContext(MyContext);
  const [flag, setFlag] = useState(false);

 


  const v = useGeolocated();

  useEffect(()=>{
    if(v.coords != undefined){
      setCordUser({latitude : v.coords.latitude, longitude: v.coords.longitude});
    }
  }, [v.coords])


  const postInput = function (input) {
    setInput(input.charAt(0).toUpperCase() + input.slice(1));
  };
  


  let arr = [];

  function searcheByLoc(e){
    e.preventDefault();
  }


  let m = document.getElementById('my-map');
  function maps(e){
    e.preventDefault();
      setFlag(true);
      m.style.height =  '500px';
      m.style.width =  '500px';
      m.style.position = 'relative';
      var map = L.map('my-map').setView([cordUser.latitude, cordUser.longitude], 15);
  
    const isRetina = L.Browser.retina;
  const baseUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${myAPIKey}`;
  const retinaUrl = `https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}@2x.png?apiKey=${myAPIKey}`;
  L.tileLayer(isRetina ? retinaUrl : baseUrl, {
      attribution: 'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors',
      apiKey: myAPIKey, 
      maxZoom: 20, 
      id: 'osm-bright'
  }).addTo(map);

    posts.map((e)=>{
      L.marker([e.cordLocation.lat , e.cordLocation.lon]).addTo(map)
      .bindPopup(`${e.street + " " + e.city}`)
      .openPopup();
    })

    L.marker([cordUser.latitude , cordUser.longitude]).addTo(map)
        .bindPopup('You Find Here')
        .openPopup();
  }

  return (
  <>
   <div className="d-flex justify-content-start m-3">
    <form className="col-2 d-flex form-inline my-2 my-lg-0">
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <input className="form-control mr-sm-2" style={{width:'150px'}} type="search" placeholder="Search" aria-label="Search" onChange={(e) => postInput(e.target.value)}/>
      <button className="btn btn-primary mx-4" onClick={e=>maps(e)} >Live</button>
    </form>
  </div>
  <div className="" id="my-map"></div>
        {!flag ? "" : <div> 
        <button className="btn btn-primary" onClick={e=>searcheByLoc(e)}>Search</button>
        </div>}
        {/* <iframe src="https://www.openstreetmap.org/#map=13/32.8003/35.0150"
        width="900px" style={{height:"500px", border:'0' }}
        loading="lazy" >
        </iframe> */}

        

  <div className="row justify-content-center ">
    <div className="row justify-content-around container rounded ">
   
      {posts.filter((post) => post.city.startsWith(inputData)).map((item, i) => (
        <Link to={item.id} key={i} className="text-decoration-none border m-1 cards rounded" style={{ width: "350px", height: "450px" }}>
          <h4 className="d-flex justify-content-center">{item.city}</h4>
          <h4 className="d-flex justify-content-center">Name: {item.contactName}</h4>
          <div className="div-imges d-flex justify-content-center" style={{ height: "65%" }}>
            <img className="img-card border rounded" src={item.imgUrl} alt={item.name} style={{ height: "85%", width: "100%" }}/>
          </div>
          <h2 className="d-flex justify-content-center">{item.price}₪</h2>
          <div className=" d-flex justify-content-center">
            <button type="button" className="btn btn-success">
              Detail Parking
            </button>
          </div>
        </Link>
      ))}
    </div>
  </div>
  </>
  );
}


