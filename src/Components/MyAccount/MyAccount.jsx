import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../App';
import { Link } from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'

export default function MyAccount() {
  const navigate = useNavigate();
  const {setCurrentUser ,currentUser, data} = useContext(MyContext);


  const [profile, setProfile] = useState(false);
  const [posts, setPosts]     = useState(false);

  const [chageName, setChageName] = useState(false);
  const [chagePhone, setChagePhone] = useState(false);
  const [chageMail, setChageMail] = useState(false);
  const [chageAddress, setChageAddress] = useState(false);
  const [chagePassword, setChagePassword] = useState(false);
  const [eye1, setEye1] = useState(false);
  const [eye2, setEye2] = useState(false);
  const [eye3, setEye3] = useState(false);

  const changeName = useRef();
  const changePhone = useRef();
  const changeEmail = useRef();
  const changeAddress = useRef();
  const changePassword1 = useRef();
  const changePassword2 = useRef();
  const changePassword3 = useRef();


  const changeNavigate = () => {
    navigate("/LogIn");
  };

  useEffect(() => {
    if (currentUser.yourName == undefined)
      changeNavigate();
  }, []);

  const funcProfile = () => {
    setProfile(true);
    setPosts(false);
  }

  const funcPosts = () => {
    setPosts(true);
    setProfile(false);
  }

//   function setKeyCode(e){
//     if(chageName.target.checked == false){
//         setChageName(false);
//     } else {
//     setCurrentUser({...currentUser, YourName: e.target.value});
// }
//   }

function changeSeePassword1(e) {
        if( changePassword1.current.type == 'password'){
            changePassword1.current.type = 'text';
            setEye1(true);
        } else {
            changePassword1.current.type = 'password';
            setEye1(false);
        }
  }
function changeSeePassword2(e) {
        if( changePassword2.current.type == 'password'){
            changePassword2.current.type = 'text';
            setEye2(true);
        } else {
            changePassword2.current.type = 'password';
            setEye2(false);
        }
  }
function changeSeePassword3(e) {
        if( changePassword3.current.type == 'password'){
            changePassword3.current.type = 'text';
            setEye3(true);
        } else {
            changePassword3.current.type = 'password';
            setEye3(false);
        }
  }
  
  return (
    <>
      {currentUser.yourName == undefined ? changeNavigate() :
        <div className='container'>
            <div className='row'>
                <div className='col-6 d-flex border justify-content-center btn btn-primary' onClick={funcProfile}>My Profile</div>
                <div className='col-6 d-flex border justify-content-center btn btn-primary' onClick={funcPosts}>My Posts</div>
            </div>
            {posts == true 
            ?
            <div className="row justify-content-center pt-3">
                <div className="row justify-content-around container rounded">
                    {data.map((item, i) => (
                    <Link to={item.id} key={i} className=" border m-1 cards rounded" style={{ width: "350px", height: "450px" }}>
                        <h4 className="d-flex justify-content-center">{item.cityAdress}</h4>
                        <div className="div-imges d-flex justify-content-center" style={{ height: "65%" }}>
                            <img className="img-card border rounded" src={item.img} alt={item.name} style={{ height: "85%", width: "100%" }}/>
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
            :
            <div className="vh-100 pt-3">
                <div className="container h-100 ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-white" style={{ borderRadius: "25px", backgroundColor: "rgba(245, 240, 249, 0.3)",}}>
                                <div className="card-body p-md-5">
                                    <p className="text-center text-primary h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 display-3">My Profile</p>
                                    <form className="mx-1 mx-md-4" >

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label display-6 text-info" for="form3Example3c"><b>NAME : </b>{currentUser.yourName} </label>
                                                <br/>
                                                <button className="btn btn-warning mx-2" type="button" id="form3Example3c" onClick={() => chageName == false ? setChageName(true) : setChageName(false)}>change</button>
                                                { chageName == false ? "" 
                                                :
                                                <input ref={changeName} placeholder="enter name to change" type="text" />}
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label display-6 text-info" for="form3Example3c"><b>PHONE : </b>{currentUser.phone} </label>
                                                <br/>
                                                <button className="btn btn-warning mx-2" type="button" id="form3Example3c" onClick={() => chagePhone == false ? setChagePhone(true) : setChagePhone(false)}>change</button>
                                                { chagePhone == false ? "" 
                                                :
                                                <input ref={changePhone} placeholder="enter phone to change" type="text" />}
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label display-6 text-info" for="form3Example3c"><b>ADDRESS : </b>{currentUser.address} </label>
                                                <br/>
                                                <button className="btn btn-warning mx-2" type="button" id="form3Example3c" onClick={() => chageAddress == false ? setChageAddress(true) : setChageAddress(false)} >change</button>
                                                { chageAddress == false ? "" 
                                                :
                                                <input ref={changeAddress} placeholder="enter address to change" type="text" />}
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label display-6 text-info" for="form3Example3c"><b>MAIL : </b>{currentUser.userName} </label>
                                                <br/>
                                                <button className="btn btn-warning mx-2" type="button" id="form3Example3c" onClick={() => chageMail == false ? setChageMail(true) : setChageMail(false)} >change</button>
                                                { chageMail == false ? "" 
                                                :
                                                <input ref={changeEmail} placeholder="enter mail to change" type="text" />}
                                            </div>
                                        </div>
 
                                        <div className=" flex-row align-items-center mb-4"> 
                                            <div className=" form-outline flex-fill mb-0">
                                                <label className="form-label display-6 text-info" for="form3Example3c"><b>PASSWORD : </b>*****</label>
                                                <br/>
                                                <div className='d-flex'>
                                                <button className="btn btn-warning mx-2" type="button" id="form3Example3c" onClick={() => chagePassword == false ? setChagePassword(true) : setChagePassword(false)} >change</button>
                                                { chagePassword == false ? "" 
                                                :
                                                <div className=''>
                                                    <input ref={changePassword1} placeholder="Enter old password" type="password" />
                                                    <div  onClick={()=>changeSeePassword1()}>{eye1 == false ? <AiFillEyeInvisible/> : <AiFillEye/> } </div>
                                                    <input ref={changePassword2} placeholder="Enter a new password" type="password" />
                                                    <div  onClick={()=>changeSeePassword2()}>{eye2 == false ? <AiFillEyeInvisible/> : <AiFillEye/> } </div>
                                                    <input ref={changePassword3} placeholder="Verify new password" type="password" />
                                                    <div  onClick={()=>changeSeePassword3()}>{eye3 == false ? <AiFillEyeInvisible/> : <AiFillEye/> } </div>
                                                    </div>}
                                                </div>
                                                
                                            </div>
                                        </div>
 
                                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                            <button type="submit" className="btn btn-primary btn-lg mt-4">submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>}
    </>
  )
}