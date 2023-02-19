import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../../App";

export default function Parking() {

  const { id } = useParams();
  const {posts, currentUser} = useContext(MyContext);
  const current = posts.find((post) => post.id == id);

  // async function mapRouting(fromWaypoint, toWaypoint){
  //   // const fromWaypoint = [38.937165,-77.045590]; // latutude, longitude
  //   // const toWaypoint = [38.881152,-76.990693]; // latitude, longitude
  //   const url = `https://api.geoapify.com/v1/routing?waypoints=${fromWaypoint.join(',')}|${toWaypoint.join(',')}&mode=drive&details=instruction_details&apiKey=${myAPIKey}`;

  //   await fetch(url).then(res => res.json()).then(result => { 
  //     ro = result;
  //   }, error => console.log(error));
  // }

  // async function setRout(geo){
  //   await mapRouting([cordUser.latitude , cordUser.longitude], [geo.lat , geo.lon]);    
  //   if(ro){
  //     console.log(geo)
  //     setTimeout(() => {
  //       L.geoJSON(ro, {
  //         style: (feature) => {
  //           return {
  //             color: "rgba(20, 137, 255, 0.7)",
  //             weight: 5
  //           };
  //         }
  //       }).bindPopup((layer) => {
  //         return `${layer.features.properties.distance} ${layer.features.properties.distance_units}, ${layer.features.properties.time}`
  //       }).addTo(map); 
  //     }, 5000);
  //   }
  // }

  useEffect(() => {

  },[]);

  const [hide, setHide] = useState(false);

  function hideContact(){
    if (hide == true) {
      setHide(false);
    }
    else{
      setHide(true);
    }
    
  }

  return (
    <> 
    {current ? 
    <div class="container mt-5">
      <div class="row">
        <h1>{current.address}</h1>
        <div class="col-md-6">
          <img src={current.imgUrl} alt="picture parking" class="img-fluid rounded-3 border" style={{ width: "500px", height: "350px" }} />
        </div>
        <ul class="col-md-6 list-unstyled fs-5">
          <li class="text-primary"><h2>Parking Detail</h2>{current.detail ? current.detail : ""}</li>
          <li class="text-primary"><b>city: </b>{current.city}</li>
          <li class="text-primary"><b>street: </b>{current.street}</li>
          <li class="text-primary"><b>Activity time: </b>{current.activityTime}</li>
          <li class="text-primary"><b>price: ₪</b>{current.price}</li>
          <li class="text-primary"><b>accessibility: </b>{current.accessibility == true ? "yes" : "no"}</li>
          <li class="text-primary"><b>Have a Code?: </b>{current.code == true ? "yes" : "no"}</li>
        </ul>
      </div> 

      <div class="row mt-5">
        <div class="col-2">
          <button class="btn btn-primary btn-lg" onClick={() => hideContact()}>contact</button>
          {hide ? 
          <div className="col-3 ">
            <img className="" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" style={{ width: "90px", height: "90px" }} />
            <div className="">Name: {current.contactName}</div>
            <div className="">Phone: {current.contactPhone}</div>
          </div>
        : ''}
        </div>
      </div>
      <div className="" id="my-map"></div> {/* container map*/}
    </div>
    : 
    ''}
    </>
  )
}

