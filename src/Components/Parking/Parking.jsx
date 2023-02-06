import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../../App";
import Data from "../../Data.json";

export default function Parking() {

  const { id } = useParams();
  const {posts, currentUser} = useContext(MyContext);
  const current = posts.find((post) => post.id == id);

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
          <li class="text-primary"><h2>Parking Detail</h2></li>
          <li class="text-primary"><b>city: </b>{current.address}</li>
          <li class="text-primary"><b>street: </b>{}</li>
          <li class="text-primary"><b>location: </b>{}</li>
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
    </div>
    : 
    ''}
    </>
  )
}

