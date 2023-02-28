import React, { useContext, useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import './parkings.css';
import L from 'leaflet';
import {} from 'mapbox-gl-leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const myAPIKey = "7aeea4fe26fa4c258c13fb720430df95";

export default function Parkings() {

  const [inputData, setInput] = useState("");
  const {setCordUser, cordUser, posts, input} = useContext(MyContext);
  const v = useGeolocated();
  const [map,setMap] = useState(false);
  useEffect(()=>{
    if(input !== ""){
      let m = input.split(',');
      let v = document.getElementById('search');
      v.value = m[0];
      setInput(m[0]);
    };
    if(v.coords != undefined){
      setCordUser({latitude : v.coords.latitude, longitude: v.coords.longitude});
    }
  }, [v.coords])


  const postInput = function (inputParkings) {
    setInput(inputParkings.charAt(0).toUpperCase() + inputParkings.slice(1));
  };
  
  function setMaps(e){
    e.preventDefault();
    setMap(!map);
  }

  

  let i = L.icon({
    iconUrl:`https://api.geoapify.com/v1/icon/?color=%23ff0000&size=small&apiKey=${myAPIKey}`,
  });

  return (
  <>
  
  <div className="d-flex justify-content-start m-3">
    <form className="col-2 d-flex form-inline my-2 my-lg-0">
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <input id="search" className="form-control mr-sm-2" style={{width:'150px'}} type="search" placeholder="Search" aria-label="Search" onChange={(e) => postInput(e.target.value)}/>
      
      <button className="btn btn-primary mx-4" onClick={(e)=>setMaps(e)} >Live</button>
    </form>
  </div>

  {!map ? "" :
    <div> 
    <MapContainer className="mb-3 mx-3 rounded" id="my" center={[cordUser.latitude , cordUser.longitude]} style={{width:"500px", height:'500px'}} zoom={13} scrollWheelZoom={true}>
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={`https://maps.geoapify.com/v1/tile/maptiler-3d/{z}/{x}/{y}.png?apiKey=${myAPIKey}`}
      />
      <Marker position={[cordUser.latitude , cordUser.longitude]}>
        <Popup>
          You find here.
        </Popup>
      </Marker>
     {posts.map((post)=>(
      <Marker icon={i} position={[post.cordLocation.lat , post.cordLocation.lon]}>
      <Popup>
      {post.street + ", " + post.city}
      <Link to={post.id}> Go to</Link>
      </Popup>
    </Marker>
     ))}
    </MapContainer>
  </div>}

  <div className="row justify-content-center ">
    <div className="row justify-content-around container rounded mr-0">
   
      {posts.filter((post) => post.city.startsWith(inputData)).map((item, i) => (
        <div className="text-decoration-none border m-1 cards rounded" style={{ width: "350px", height: "450px" }}>
        <Link to={item.id} key={i} >
          <h4 className="d-flex justify-content-center">{item.city}</h4>
          <h4 className="d-flex justify-content-center">Name: {item.contactName}</h4>
          <div className="div-imges d-flex justify-content-center" style={{ height: "65%" }}>
            <img className="img-card border rounded" src={item.imgUrl} alt={item.name} style={{ height: "85%", width: "100%" }}/>
          </div>
          <h2 className="d-flex justify-content-center">{item.price}₪</h2>
          <div className=" d-flex justify-content-center">
          </div>
        </Link>
        </div>
      ))}
    </div>
  </div>
  </>
  );
}


