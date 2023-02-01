import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useContext } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../App";
// import {BiAccessibility} from 'react-icons/bi'

const PostParking = () => {
  const {
    currentUser,
    setName,
    setStorage,
    setImage,
    image,
    setNewPost,
  } = useContext(MyContext);
  const navigate = useNavigate();
  const imageRef = useRef();
  const accessibility = useRef();
  const address = useRef();
  const suitable = useRef();
  const price = useRef();

  const [url, setUrl] = useState([]);
  const [code, setCode] = useState();
  const [keyCode, setKeyCode] = useState();
  const [activityTime, setActivityTime] = useState(); 
  const changeNavigate = () => {
    navigate("/LogIn");
  };

  useEffect(() => {
    if (currentUser.yourName == undefined)
      changeNavigate();
  }, []);

  let img = document.getElementById("myimg");

  const submitPost = async (e) => {
    e.preventDefault();
    setStorage(imageRef.current.files[0]);
    setName(imageRef.current.files[0].name);
    //setImage(undefined);
    img = undefined;
      const post = {
      userId: currentUser.userId,
      nameFile: imageRef.current.files[0].name,
      accessibility: accessibility.current.checked,
      code: code.target == undefined ? code.target.checked : "",
      address: (address.current.value.charAt(0).toUpperCase() + address.current.value.slice(1)),
      price: price.current.value,
      suitable: suitable.current.value,
      keyCode : keyCode.target != undefined ? keyCode.target.value : "",
      activityTime: activityTime.target.value,
      };
    setNewPost(post);
    accessibility.current.checked = false;
    code.target != undefined ? code.target.checked = false : code.target = undefined;
    suitable.current.value = "";
    price.current.value = "";
    imageRef.current.value = null;
    address.current.value = "";
    activityTime.target.value = "";
  };

  // useEffect(() => {
  //   if (img != undefined) {
  //     img.setAttribute("src", image);
  //   }
  // }, []);

  const unsetImage = (e) => {
    e.preventDefault();
    setImage(undefined);
    img = undefined;
    imageRef.current.value = null;
  };

  function setLocaleImage(e) {
    setImage(imageRef.current.files[0]);
    let _url = URL.createObjectURL(imageRef.current.files[0]);
    setUrl(_url);
  }

  return (
    <>
      {currentUser.yourName == undefined ? (
        changeNavigate()
      ) : (
      <div className="vh-100 ">
        <div className="container h-100 ">
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
                              <label className=" form-label" for="form3Example4c">accessibility?</label>
                              <input type="checkbox" ref={accessibility} id="form3Example4c" className="mx-2"/>
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
                                  <input required placeholder="Street, Number, City" type="text" id="form3Example1c" className="form-control" ref={address}/>
                                  <label className="form-label" for="form3Example1c">Adress</label>
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
                                  <input required placeholder="sun - thurs " type="text" id="form3Example4c" className="form-control" onChange={e => setActivityTime(e)}/>
                                  <label className="form-label" for="form3Example4c">Activity time?</label>
                              </div>
                          </div>

                          <div className="d-flex flex-row align-items-center mb-4">
                              <div className="form-outline flex-fill mb-0">
                                  <input required placeholder="Price For Hour " type="text" id="form3Example4c" className="form-control" ref={price}/>
                                  <label className="form-label" for="form3Example4c">Please Enter Price: </label>
                              </div>
                          </div>

                          <div className="mb-1">
                              <div className="">
                                  <input onChange={() => setLocaleImage()} ref={imageRef} type="file" />
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
                              <button type="submit" className="btn btn-primary btn-lg mt-4">submit</button>
                          </div>
                        </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </>
  );
};
export default PostParking;
