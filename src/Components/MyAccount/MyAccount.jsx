import React, { useEffect } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../App';
import { Link } from "react-router-dom";

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

  const changeNavigate = () => {
    navigate("/LogIn");
  };

  useEffect(() => {
    if (currentUser.YourName == undefined)
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
  
  return (
    <>
      {currentUser.YourName == undefined ? changeNavigate() :
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
                            <div className="card text-white" style={{ borderRadius: "25px", backgroundColor: "rgba(31, 30, 29, 0.6)",}}>
                                <div className="card-body p-md-5">
                                    {/* <div className="row justify-content-center"> */}
                                        {/* <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"> */}
                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 display-3">My Profile</p>
                                            <form className="mx-1 mx-md-4" >

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label display-6" for="form3Example3c"><b>NAME : </b>{currentUser.YourName} </label>
                                                        <br/>
                                                        <button type="button" id="form3Example3c" onClick={() => chageName == false ? setChageName(true) : setChageName(false)} className="mx-2">change</button>
                                                        { chageName == false ? "" 
                                                        :
                                                        <input placeholder="enter name to change" type="text" />}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label display-6" for="form3Example3c"><b>PHONE : </b>{currentUser.Phone} </label>
                                                        <br/>
                                                        <button type="button" id="form3Example3c" onClick={() => chagePhone == false ? setChagePhone(true) : setChagePhone(false)} className="mx-2">change</button>
                                                        { chagePhone == false ? "" 
                                                        :
                                                        <input placeholder="enter phone to change" type="text" />}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label display-6" for="form3Example3c"><b>ADDRESS : </b>רחובות </label>
                                                        <br/>
                                                        <button type="button" id="form3Example3c" onClick={() => chageAddress == false ? setChageAddress(true) : setChageAddress(false)} className="mx-2">change</button>
                                                        { chageAddress == false ? "" 
                                                        :
                                                        <input placeholder="enter address to change" type="text" />}
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label display-6" for="form3Example3c"><b>MAIL : </b>{currentUser.userName} </label>
                                                        <br/>
                                                        <button type="button" id="form3Example3c" onClick={() => chageMail == false ? setChageMail(true) : setChageMail(false)} className="mx-2">change</button>
                                                        { chageMail == false ? "" 
                                                        :
                                                        <input placeholder="enter mail to change" type="text" />}
                                                    </div>
                                                </div>

                                                <div className=" flex-row align-items-center mb-4">
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label display-6" for="form3Example3c"><b>PASSWORD : </b>*****</label>
                                                        <br/>
                                                        <button type="button" id="form3Example3c" onClick={() => chagePassword == false ? setChagePassword(true) : setChagePassword(false)} className="mx-2">change</button>
                                                        { chagePassword == false ? "" 
                                                        :
                                                        <div className=''>
                                                            <input placeholder="Enter old password" type="text" />
                                                            <br/>
                                                            <input placeholder="Enter a new password" type="text" />
                                                            <br/>
                                                            <input placeholder="Verify new password" type="text" />
                                                        </div>}
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg mt-4">submit</button>
                                                </div>
                                            </form>
                                        {/* </div> */}
                                    {/* </div> */}
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
