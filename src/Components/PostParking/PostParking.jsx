import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import {BiCurrentLocation} from 'react-icons/bi'
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
import ModalC from '../modalComponnet/ModalC'
import { location, getCurrLoc } from '../API/APIs';
import { TextField } from "@mui/material";
import { useGeolocated } from "react-geolocated";


export default function PostParking() {

  const { currentUser, setStorage, setImage, image, setNewPost, isLoading, cordUser, setCordUser } = useContext(MyContext);
  const navigate = useNavigate();
  
  const imageRef = useRef();
  const accessibility = useRef();
  const city = useRef();
  const street = useRef();
  const suitable = useRef();
  const price = useRef();
  const detail = useRef();

  const [url, setUrl] = useState([]);
  const [code, setCode] = useState();
  const [keyCode, setKeyCode] = useState();
  const [activityTime, setActivityTime] = useState();
  const [cityInput, setCityInput] = useState([]);
  const [addressInput, setAddressInput] = useState([]);

  const [totalCity, setTotalCity] = useState([]);
  const [totalStreet, setTotalStreet] = useState([]);
  const [total, setTotal] = useState();
  const [geo, setGeo] = useState();
  const [currLoc, setCurrLoc] = useState();

  const changeNavigate = () => {
    navigate("/LogIn");
  };

  useEffect(() => {
    if (currentUser.yourName == undefined)
      changeNavigate();
  }, []);

  useEffect(()=>{
    if(cityInput){
    location(cityInput, setTotalCity);
    }
  },[cityInput])

  useEffect(()=>{
    if(total){
      location(total + " " + addressInput, setTotalStreet);
    }
  },[addressInput])



  let img = document.getElementById("myimg");

  const submitPost =  (e) => {
    e.preventDefault();
      const post = {
      userId: currentUser.userId,
      nameFile: imageRef.current.files[0].name,
      accessibility: accessibility.current.checked,
      detail: detail != undefined ? detail.current.value : "",
      code: code != undefined ? code.target.checked : "",
      keyCode : keyCode != undefined ? keyCode.target.value : "",
      city: cityInput,
      street: addressInput,
      price: price.current.value,
      suitable: suitable.current.value,
      activityTime: activityTime.target.value,
      contactName: currentUser.yourName,
      contactPhone: currentUser.phone,
      cordLocation: geo,
    };
    setNewPost(post);
    
    accessibility.current.checked = false;
    code != undefined ? code.target.checked = false : setCode(undefined);
    suitable.current.value = "";
    price.current.value = "";
    activityTime.target.value = "";
    setImage(undefined);
    img = undefined;
    setStorage(imageRef.current.files[0]);
    imageRef.current.value = null;
  };


  const unsetImage = (e) => {
    e.preventDefault();
    setImage(undefined);
    img = undefined;
    imageRef.current.value = null;
  };

  function setCityInputaleImage(e) {
    setImage(imageRef.current.files[0]);
    let _url = URL.createObjectURL(imageRef.current.files[0]);
    setUrl(_url);
  }

  function setCity(e){
    const t = document.getElementById('city');
    t.value = totalCity[0].properties.city;
    setCityInput(t.value);
    setTotal(e);
    setTimeout(() => {
      setTotalCity([]);
    }, 1000);
  }
  
    function setTotalAddress(e){
    setAddressInput(e);
    setTotal(total + " " + addressInput);
    const t = document.getElementById('street');
    t.value = e;
    setGeo({lat: totalStreet[0].properties.lat, lon: totalStreet[0].properties.lon});
    setTimeout(() => {
      setTotalStreet([]);
    }, 1000);
  }


  const v = useGeolocated();
  function setAutoLocation(e){
    e.preventDefault();
    let ge = {
       lat: v.coords.latitude,
       lon: v.coords.longitude
      }
    getCurrLoc(ge, setCurrLoc);
  }

  useEffect(()=>{
    if(currLoc){
      const t = document.getElementById('street');
      t.value = currLoc.address_line1;
      const v = document.getElementById('city');
      v.value = currLoc.city;
    }
  },[currLoc]);

  return (
    <>
      <ModalC/>
      {currentUser.yourName == undefined ? (
        changeNavigate()
      ) : ( 
      <div className="h-auto mb-5" >
        <div className="container border rounded bg-light">

          <div className="row">
            <div className="col-12 h1 text-center">Post A Park</div>
          </div>

          <form className="row justify-content-around " onSubmit={submitPost}>
            <div className="col-sm-6 col-10 d-flex flex-wrap">

              <div className="m-3">
                <TextField required color="warning" id="city" label="City" variant="outlined" className="bg-light col-12" onChange={(e)=>setCityInput(e.target.value)} />
                <div>{totalCity.map((e, i)=>(
                  <div>{i < 1 ? <button className="col-4 border" onClick={(e)=>setCity(e.target.innerHTML)}>{e.properties.city}</button> 
                  : 
                  totalCity[i].properties.city == totalCity[i-1].properties.city ? "" 
                  : 
                  <button className="col-4 border" onClick={(e)=>setCity(e.target.innerHTML)}>{totalCity[i].properties.city}</button>}</div>))}
                </div>
              </div>
            
              <div className="m-3">
                <TextField required color="warning" id="street" label="Street" variant="outlined" className="bg-light col-12" onChange={(e)=>setAddressInput(e.target.value)} />
                <div>{totalStreet.map((e, i)=>(
                  <div>{i < 1 ? <button className="col-4 border" onClick={(e)=>setTotalAddress(e.target.innerHTML)}>{e.properties.address_line1}</button> 
                  : 
                  totalStreet[i].properties.address_line1 == totalStreet[i-1].properties.address_line1 ? "" 
                  : 
                  <button className="col-4 border" onClick={(e)=>setTotalAddress(e.target.innerHTML)}>{totalStreet[i].properties.address_line1}</button>}</div>))}
                </div>
              </div>

              <div className="m-3">
                <TextField required color="warning" label="Activity time?" placeholder="sun - thurs" variant="outlined" className="bg-light col-12" onChange={e => setActivityTime(e)}/>
              </div>

              <div className="m-3">
                <TextField required color="warning" label="suitable for?" placeholder="Car / Trunk / Bike" variant="outlined" className="bg-light col-12" inputRef={suitable}/>
              </div>

              <div className="m-3">
                <TextField required color="warning" label="Please Enter Price:" placeholder="Price For Hour" variant="outlined" className="bg-light col-12" inputRef={price}/>
              </div>

              <div className="m-3">
                <TextField required color="warning" label="Activity time?" variant="outlined" className="bg-light col-12" onChange={e => setActivityTime(e)}/>
              </div>

              <div className="m-3">
                <label>Have a Code ?</label>
                <input type="checkbox" className="m-2" onChange={(e) => setCode(e)}/>
                {code == undefined ? "" :
                code.target.checked == false 
                ?
                ("") 
                : 
                (<input required  placeholder="Please Enter A Code" onChange={(e) => setKeyCode(e)} type="number" />)}
              </div>

              <div className="m-3">
                <label className=" form-label" for="form3Example4c">accessibility ?</label>
                <input type="checkbox" ref={accessibility} className="m-2"/>
              </div>
            


            <div className="col-10">
              
              <div className="m-3 ">
                  <TextField required color="warning" label="Parking details" placeholder="Give details about the parking" variant="outlined" multiline rows={7} className="bg-light" inputRef={detail} />
              </div>


              <div className="m-3">
                <input type="file" onChange={setCityInputaleImage} ref={imageRef} />
                {image == undefined 
                ?
                ("") 
                : 
                (<div style={{ marginTop: "9px" }}>
                    <img className="rounded" src={url} style={{ width: "250px", height: "150px" }} id="myimg"/>
                    <button onClick={unsetImage}><FaTrashAlt/></button>
                </div>)}
              </div>
            </div>
            </div>
          

          <div className="d-flex justify-content-center mb-3">
            <button type="submit" className="btn btn-primary btn-lg mt-4">{isLoading == true ? <img style={{width:'48px', height:'48px'}} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"/> : "submit"}</button>
          </div>
          </form>
        </div>







        {/* <div className="container h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-white" style={{ borderRadius: "25px", backgroundColor: "rgba(31, 30, 29, 0.6)",}}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Post A Park</p>
                      <form className="mx-1 mx-md-4" onSubmit={submitPost}>

                      <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                                <TextField required color="warning" id="outlined-basic" label="City" variant="outlined" onChange={(e)=>setCityInput(e.target.value)} className="bg-light" />
                                <div>{totalCity.map((e, i)=>(
                                  <div>{i < 1 ? <button className="col-4 border" onClick={(e)=>setCity(e.target.innerHTML)}>{e.properties.city}</button> : totalCity[i].properties.city == totalCity[i-1].properties.city ? "" : <button className="col-4 border" onClick={(e)=>setCity(e.target.innerHTML)}>{totalCity[i].properties.city}</button>}</div>
                                ))}</div>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                            <TextField required color="warning" id="outlined" label="Street" variant="outlined" onChange={(e)=>setAddressInput( e.target.value)} className="bg-light" />
                            <div>{totalStreet.map((e, i)=>(
                                  <div>{i < 1 ? <button className="col-4 border" onClick={(e)=>setTotalAddress(e.target.innerHTML)}>{e.properties.address_line1}</button> : totalStreet[i].properties.address_line1 == totalStreet[i-1].properties.address_line1 ? "" : <button className="col-4 border" onClick={(e)=>setTotalAddress(e.target.innerHTML)}>{totalStreet[i].properties.address_line1}</button>}</div>
                                ))}</div>
                            </div>
                        </div>

                        <button className="btn btn-dark text-primary mb-3" onClick={e=>setAutoLocation(e)}>Search By Current Location <BiCurrentLocation/></button>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                                <input required placeholder="sun - thurs " type="text" id="form3Example4c" className="form-control" onChange={e => setActivityTime(e)}/>
                                <label className="form-label" for="form3Example4c">Activity time?</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                            <input required placeholder="Car / Trunk / Bike" type="text" id="form3Example4c" className="form-control" ref={suitable}/>
                            <label className="form-label" for="form3Example4c">suitable for?</label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                                <input required placeholder="Price For Hour " type="text" id="form3Example4c" className="form-control" ref={price}/>
                                <label className="form-label" for="form3Example4c">Please Enter Price: </label>
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                            <div className="form-outline flex-fill mb-0">
                                <label className="form-label" for="form3Example3c">Have a Code?</label>
                                <input type="checkbox" id="form3Example3c" onChange={(e) => setCode(e)} className="mx-2"/>
                                { code == undefined ? "" :
                                code.target.checked == false 
                                ?
                                ("") 
                                : 
                                (<input required autoFocus placeholder="Please Enter A Code" onChange={(e) => setKeyCode(e)} type="number" />)}
                            </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <label className=" form-label" for="form3Example4c">accessibility?</label>
                            <input type="checkbox" ref={accessibility} id="form3Example4c" className="mx-2"/>
                          </div>
                        </div>

                        <div className="mb-1">
                            <div className="">
                                <input onChange={setCityInputaleImage} ref={imageRef} type="file" />
                            </div>
                        </div>
                        <span className="">The selected image</span>
                        {image == undefined 
                        ?
                        ("") 
                        : 
                        (<div style={{ marginTop: "9px" }}>
                            <img className="rounded mx-3" src={url} style={{ width: "250px", height: "150px" }} id="myimg"/>
                            <button onClick={unsetImage}><FaTrashAlt /></button>
                        </div>)}

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button type="submit" className="btn btn-primary btn-lg mt-4">{isLoading == true ? <img style={{width:'48px', height:'48px'}} src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"/> : "submit"}</button>
                        </div>

                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>)}
    </>
  );
};