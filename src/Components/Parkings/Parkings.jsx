import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

export default function Parkings() {
  const { data } = useContext(MyContext);

  return (
    <>
    <div className="d-flex justify-content-end m-3">
      <form class="col-2 d-flex form-inline my-2 my-lg-0">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      </form>
    </div>
    
    <div className="row justify-content-center">
      <div className="row justify-content-around container ">
        {data.map((item, i) => (
          <Link
            to={item.id}
            key={i}
            className="card border m-1"
            style={{ width: "350px", height: "450px" }}
          >
            <h4 className="d-flex justify-content-center">{item.name}</h4>
            <div
              className="div-imges d-flex justify-content-center"
              style={{ height: "65%" }}
            >
              <img
                className="img-card"
                src={item.img}
                alt={item.name}
                style={{ height: "85%", width: "100%" }}
              />
            </div>
            <h2 className="d-flex justify-content-center">{item.price}💲</h2>
            <div className=" d-flex justify-content-center">
              <button type="button" class="btn btn-success">
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
