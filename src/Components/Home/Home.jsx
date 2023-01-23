import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import "./Home.css"

export default function Home() {
  const {currentUser} = useContext(MyContext);
  const navigate = useNavigate();

  function changeNavigate(){
    navigate("/NewUser")
  }
  return (
  <>
  <div className="bg">
    <div className="container" style={{height:'920px'}}>
      <h1 className="d-flex justify-content-center">search parkings</h1>
      <p className="d-flex justify-content-center">Here you can easily find parking</p>
      
      <div className="d-flex row h-50 ">
        <div id="d" className="row justify-content-between w-100 h-100 ">
          <Link to={"/PostParking"} style={{width:'450px'}} className="col-4 bgCircle1 h-100 d-flex justify-content-center align-items-center border rounded-circle display-4"><strong>Post a Park</strong></Link>
          <Link to={"/Parkings"} style={{width:'450px'}} className="col-4 bgCircle2 h-100 d-flex justify-content-center align-items-center border rounded-circle display-4"><strong>parking search</strong></Link>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}
