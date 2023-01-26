import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App'

  const PostParking = () => {
  const {currentUser, setName, setStorage, setImage, image} = useContext(MyContext);
  const navigate = useNavigate();
  const imageRef = useRef();
  const [url, setUrl] = useState([]);

  const changeNavigate = () => {
    navigate("/LogIn")
  }
  
  useEffect(()=>{
    if(currentUser == undefined)
        changeNavigate();
  }, []);

  // console.log(post);
  let img = document.getElementById('myimg');

  const handleChange = async (e) => {
    e.preventDefault();
    setName(imageRef.current.files[0].name );
    setImage(imageRef.current.files[0]);
    setStorage(imageRef.current.files[0]);
  }
  // setImage(img);
  useEffect(()=>{
    if(img != undefined) {
      img.setAttribute('src', image);
    }
  }, [url]);

  const unsetImage = (e)=>{
    e.preventDefault();
    setImage(undefined);
    img = undefined;
  }

  function set(e){
  //  e.preventDefault();
  setImage(imageRef.current.files[0]);
   let _url = URL.createObjectURL(imageRef.current.files[0]);
   console.log(img);
   setUrl(_url)
  }
  

  return (
    <>
      {currentUser == undefined ? changeNavigate()
      :  
      <div className="vh-100 " >
      <div className="container h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-white" style={{borderRadius: '25px', backgroundColor:'rgba(31, 30, 29, 0.6)'}}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
  
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Post A Park</p>
  
                    <form className="mx-1 mx-md-4" onSubmit={handleChange}>
  
                      <div className="d-flex flex-row align-items-center mb-4">
                        {/* <FaAccessibleIcon/> */}
                        <div className="form-outline flex-fill mb-0">
                          <label className=" form-label" for="form3Example4c">accessibility?</label>
                          <input type="checkbox" id="form3Example4c" className="mx-2" />
                        </div>
                      </div>
  
                      <div className="d-flex flex-row align-items-center mb-4">
                        
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" for="form3Example3c">Have a Code?</label>
                          <input type="checkbox" id="form3Example3c" className="mx-2"  />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        
                        <div className="form-outline flex-fill mb-0">
                          <input placeholder='Street, Number, City' type="text" id="form3Example1c" className="form-control"  />
                          <label className="form-label" for="form3Example1c">Adress</label>
                        </div>
                      </div>
  
                      <div className="d-flex flex-row align-items-center mb-4">
                        
                        <div className="form-outline flex-fill mb-0">
                          <input placeholder='Car / Trunk / Bike' type="text" id="form3Example4c" className="form-control" />
                          <label className="form-label" for="form3Example4c">Suitable for?</label>
                        </div>
                      </div>

                      <div className="mb-1">
                          Image <span className="font-css top">*</span>
                          <div className="">
                              <input onChange={set} ref={imageRef} type="file" id="file-input" />
                          </div>
                      </div>
                      
                      { image == undefined ? "" : 
                      <div> 
                        <img className="rounded mx-3" src={url} style={{width:'250px', height:'150px'}} id="myimg" /> 
                        <button onClick={unsetImage}>**</button>
                      </div> }

  
                      {/* <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input type="password" id="form3Example4cd" className="form-control"/>
                          <label className="form-label" for="form3Example4cd">Repeat your password</label>
                        </div>
                      </div> */}
  
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">submit</button>
                      </div>
  
                    </form>
  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      }
    </>
  )
}
export default PostParking;
