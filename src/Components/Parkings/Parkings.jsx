import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import './parkings.css';

export default function Parkings() {

  
  const { posts } = useContext(MyContext);
  const [inputData, setInput] = useState("");

  const postInput = function (input) {
    setInput(input.charAt(0).toUpperCase() + input.slice(1));
  };


  return (
  <>
   <div className="d-flex justify-content-start m-3">
    <form className="col-2 d-flex form-inline my-2 my-lg-0">
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <input className="form-control mr-sm-2" style={{width:'150px'}} type="search" placeholder="Search" aria-label="Search" onChange={(e) => postInput(e.target.value)}/>
    </form>
  </div>

  <div className="row justify-content-center ">
    <div className="row justify-content-around container rounded ">
   
      {posts.filter((post) => post.address.startsWith(inputData)).map((item, i) => (
        <Link to={item.id} key={i} className="text-decoration-none border m-1 cards rounded" style={{ width: "350px", height: "450px" }}>
          <h4 className="d-flex justify-content-center">{item.address}</h4>
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
