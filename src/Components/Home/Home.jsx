import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { location } from "../API/APIs";


export default function Home() {
  const {setInput} = useContext(MyContext);
  const [inputData, setInputData] = useState([]); 
  
  console.log(inputData);
  function add(e){
    console.log(e);
    let v = document.getElementById('search');
    v.value = e;
    setInput(e);
    setInputData([]);
  }

  function getData(e){
    location(e,setInputData);
  }


  return (
  <>
  <div className="container-fluid row">
    <div className="col-12 ">
    <h1 className="d-flex justify-content-center display-2">Search Parkings</h1>
      <p className="d-flex justify-content-center pb-5 fs-1">Here you can easily find parking</p>
      <div className="d-flex justify-content-center display-6">Choose City ...</div>
      <div className="d-flex justify-content-center col-12">
        <div className="col-sm-6 col-12">
          <div class="input-group mb-3 d-flex justify-content-center w-sm-75 rounded" style={{border: "4px solid rgb(111, 184, 184)", shadow: "2px 2px 12px 2px rgb(12, 11, 11)" }}>
            <input id="search" type="text" className="form-control" placeholder="Please Enter City" onChange={e=> getData(e.target.value) } />
            <div class="input-group-append">
              <Link to={'/Parkings'}><button class="btn btn-outline-secondary" type="button">Search</button></Link>
            </div>
          </div>
          <div className="posotion-relative" style={{width: '92%'}}>{inputData.map((e, i)=>(
            <div className="border bg-light">{i < 1 ? <div onClick={e=>add(e.target.innerHTML)} className="btn text-dark" >{e.properties.city}</div> 
              : 
              inputData[i].properties.city == inputData[i-1].properties.city ? ""
              : 
              <div className="btn text-dark" onClick={e=>add(e.target.innerHTML)}>{e.properties.city}</div>}
            </div>))}
          </div>
        </div>
      </div>

    </div>
    <div className="h-50 d-flex justify-content-center flex-wrap mb-3">
      <div className="col-sm-5 col-10 mx-sm-3 d-flex justify-content-center mb-sm-0 mb-2 rounded">
        <img src="https://i.imagesup.co/images2/6d4130c2afe7821e921360c5d3c789ed38a6ab64.png" width={'100%'}/>
      </div>
      <div className="col-sm-5 col-10 d-flex align-items-center">
        <div className="mx-4 mb-1">
          <div className="display-2 text-light"><b>Hellow</b> moshe</div>
          <div className="display-3 text-light">How are you</div>
          <div className=" d-flex mt-3 w-75 justify-content-between">
            <Link to={"/Parkings"} className="btn btn-light w-100">Search Parkings</Link>
            <Link to={"/PostParking"} className="btn text-light w-100">post parking</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  );
}


//style={{width: '80%'}}
//  + ', ' + e.properties.country
