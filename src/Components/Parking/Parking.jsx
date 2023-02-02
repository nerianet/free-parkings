import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MyContext } from "../../App";
import Data from "../../Data.json";

export default function Parking() {

  const { id } = useParams();
  const {posts} = useContext(MyContext);
  const current = posts.find((post) => post.id == id);

  return (
    <> 
    <div class="container mt-5">
      <div class="row">
        <h1>{current.address}</h1>
        <div class="col-md-6">
          <img src={current.imgUrl} alt="picture parking" class="img-fluid" width={"500px"} />
        </div>
        <div class="col-md-6">
          <h3 class="text-primary">{current.price}₪</h3>
          <Link><button class="btn btn-primary btn-lg">לסל</button></Link>
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

