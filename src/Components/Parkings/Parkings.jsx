import React, { useContext, useEffect, useRef, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import './parkings.css';

import L from 'leaflet';
import {} from 'mapbox-gl-leaflet';


export default function Parkings() {

  const [inputData, setInput] = useState("");
  const {setCordUser, cordUser, posts} = useContext(MyContext);
  const [flag, setFlag] = useState(false);
  

  const v = useGeolocated();
  var myAPIKey = "7aeea4fe26fa4c258c13fb720430df95";

  useEffect(()=>{
    if(v.coords != undefined){
      setCordUser({latitude : v.coords.latitude, longitude: v.coords.longitude});
    }
  }, [v.coords])


  const postInput = function (input) {
    setInput(input.charAt(0).toUpperCase() + input.slice(1));
  };
  


  let arr = [];
  function live (e){
    e.preventDefault();
    setFlag(true);
    arr = [];
    let s = 'lonlat:' + cordUser.longitude + ',' + cordUser.latitude + ';size:medium';
    posts.map((e)=>{
      s += '|lonlat:' + e.cordLocation.lon + ',' + e.cordLocation.lat + ';color:%23ff0000;size:medium';
      arr.push(e.cordLocation)
    })
    setTimeout(() => {
      let mark = document.getElementById("maps");
      mark.setAttribute('src' , `https://maps.geoapify.com/v1/staticmap?style=osm-liberty&width=600&height=400&center=lonlat:${cordUser.longitude},${cordUser.latitude}&marker=${s}&zoom=14.5&apiKey=${myAPIKey}`);
    }, 5000);
  }

  function searcheByLoc(e){
    e.preventDefault();
  }

  return (
  <>
   <div className="d-flex justify-content-start m-3">
    <form className="col-2 d-flex form-inline my-2 my-lg-0">
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <input className="form-control mr-sm-2" style={{width:'150px'}} type="search" placeholder="Search" aria-label="Search" onChange={(e) => postInput(e.target.value)}/>
      <button className="btn btn-primary mx-4" onClick={e=>live(e)} >Live</button>
    </form>
  </div>
        {!flag ? "" : <div> <iframe id="maps" src={`https://maps.geoapify.com/v1/staticmap?style=osm-liberty&width=600&height=400&center=lonlat:${cordUser.longitude},${cordUser.latitude}&marker=lonlat:${cordUser.longitude},${cordUser.latitude}&zoom=14.5&apiKey=${myAPIKey}`}
        width="900px" style={{height:"500px", border:'0' }}
        loading="lazy" >
        </iframe>
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
