import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

export default function Home() {
  return (
  <>
  <div id="GoToUp" className="">
    <div className="container h-100 text-primary" style={{height:'920px'}}>
      <h1 className="d-flex justify-content-center display-2">search parkings</h1>
      <p className="d-flex justify-content-center pb-5 display-5">Here you can easily find parking</p>
      
      <div className="h-100 ">
        <div className="row justify-content-between w-100 h-100 mx-1 ">
          <Link to={"/PostParking"} style={{width:'450px', height:'450px'}} className=" link-warning  col-4 bgCircle1 d-flex justify-content-center align-items-center border rounded-circle"><strong>Post a Park</strong></Link>
          <Link to={"/Parkings"} style={{width:'450px', height:'450px'}}    className="link-warning col-4 bgCircle2 d-flex justify-content-center align-items-center border rounded-circle"><strong>parking search</strong></Link>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}
