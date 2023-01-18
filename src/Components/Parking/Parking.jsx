import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Data from "../../Data.json";

export default function Parking() {

  const { id } = useParams();
  const current = Data.find((curr) => curr.id == id);
console.log(current);
  return (
    <>
    <div class="container mt-5">
      <div class="row">
        <h1>{current.name}</h1>
        <div class="col-md-6">
          <img src={current.img} alt="picture parking" class="img-fluid" width={"500px"} />
        </div>
        <div class="col-md-6">
          <h3>תיאור</h3>
          <p>{current.description}</p>
          <h3 class="text-primary">₪{current.price}</h3>
          <Link><button class="btn btn-primary btn-lg">הוסף לסל</button></Link>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-12">
          <h3>{current.category}</h3>
        </div>
      </div>
    </div>
    </>
  )
}

