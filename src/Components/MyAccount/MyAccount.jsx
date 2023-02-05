import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../App';
import { Link } from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';


export default function MyAccount() {
  const navigate = useNavigate();

  const { currentUser, posts, postDelete, updateUser } = useContext(MyContext);

  const [profile, setProfile] = useState(false);
  const [localePosts, setLocalePosts] = useState(false);
  const [myPosts, setMyPosts] = useState([]);

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


  useEffect(() => {
    if (currentUser.yourName == undefined){
    navigate("/LogIn");
    }else{
     //   console.log(currentUser);
      const items = posts.filter(item => item.userId == currentUser.userId);
      setMyPosts(items);
    }
     //console.log(posts);
  }, [currentUser]);

  const funcProfile = () => {
    setProfile(true);
    setLocalePosts(false);
  }

  const funcPosts = () => {
    setLocalePosts(true);
    setProfile(false);
  }

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

    function deletePost (id, nameFile){
        postDelete(id, nameFile);
        let arr = myPosts.filter((item)=> item.id != id);
        setMyPosts(arr);
    }

    

    function checkPassword(){
        if(changePassword1.current.value == currentUser.password){
            if(changePassword2.current.value == changePassword3.current.value){
                data.password = changePassword2.current.value;
                return 1;
            } else {
                window.alert("The Password Not Matched");
            }
        } else {
            window.alert("The Password Not Correct");
        }
    }
    let  data;
    const submitChange = (e) =>{
        e.preventDefault();
        data = {
            userName: changeEmail.current  ? changeEmail.current.value : currentUser.userName, 
            phone: changePhone.current  ? changePhone.current.value : currentUser.phone,
            yourName: changeName.current  ? changeName.current.value : currentUser.yourName,
            address: changeAddress.current  ? changeAddress.current.value : currentUser.address,
        };
        if(chagePassword == true){
            if(checkPassword() == 1){
                updateUser(data);
            }
        } else {
            updateUser(data);
        }
    }

   

  return (
    <>
      {currentUser.yourName == undefined ? navigate('/LogIn') :
        <div className='container'>
            <div className='row'>
                <div className='col-6 d-flex border justify-content-center btn btn-primary' onClick={funcProfile}>My Profile</div>
                <div className='col-6 d-flex border justify-content-center btn btn-primary' onClick={funcPosts}>My Posts</div>
            </div>
            {localePosts == true 
            ?
            <div className="row justify-content-center pt-3">
                <div className="row justify-content-around container rounded">
                    {myPosts.map((item, i) => (
                    <div className="border m-1 cards rounded" style={{ width: "350px", height: "450px" }}>
                        <Link to={item.id} key={i} >
                            <h4 className="d-flex justify-content-center">{item.address}</h4>
                            <h4 className="d-flex justify-content-center">{item.price}</h4>
                            <h4 className="d-flex justify-content-center">{item.activityTime}</h4>
                            <h4 className="d-flex justify-content-center">accessibility: {item.accessibility == true ? "Yes" : "No"}</h4>
                            <div className="div-imges d-flex justify-content-center" style={{ height: "65%" }}>
                                <img className="img-card border rounded" src={item.imgUrl} alt={item.name} style={{ height: "85%", width: "100%" }}/>
                            </div>
                            <h2 className="d-flex justify-content-center">{}</h2>
                            <div className=" d-flex justify-content-center">
                                <button type="button" className="btn btn-success">
                                    Detail Parking
                                </button>
                            </div>
                        </Link>
                        <button onClick={()=>deletePost(item.id, item.nameFile)}>Delete</button>
                    </div>
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
                                    <form className="mx-1 mx-md-4" onSubmit={submitChange} >

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label display-6 text-info" ><b>NAME : </b>{currentUser.yourName} </label>
                                                <br/>
                                                <button className="btn btn-warning mx-2" type="button" onClick={() => chageName == false ? setChageName(true) : setChageName(false)}>change</button>
                                                { chageName == false ? "" 
                                                :
                                                <input defaultValue={currentUser.yourName} id="mo" ref={changeName} placeholder="enter name to change" type="text" />}
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label display-6 text-info" ><b>PHONE : </b>{currentUser.phone} </label>
                                                <br/>
                                                <button className="btn btn-warning mx-2" type="button" onClick={() => chagePhone == false ? setChagePhone(true) : setChagePhone(false)}>change</button>
                                                { chagePhone == false ? "" 
                                                :
                                                <input defaultValue={currentUser.phone} ref={changePhone} placeholder="enter phone to change" type="text" />}
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label display-6 text-info" ><b>ADDRESS : </b>{currentUser.address} </label>
                                                <br/>
                                                <button className="btn btn-warning mx-2" type="button" onClick={() => chageAddress == false ? setChageAddress(true) : setChageAddress(false)} >change</button>
                                                { chageAddress == false ? "" 
                                                :
                                                <input defaultValue={currentUser.address} ref={changeAddress} placeholder="enter address to change" type="text" />}
                                            </div>
                                        </div>

                                        <div className="d-flex flex-row align-items-center mb-4">
                                            <div className="form-outline flex-fill mb-0">
                                                <label className="form-label display-6 text-info" ><b>MAIL : </b>{currentUser.userName} </label>
                                                <br/>
                                                <button className="btn btn-warning mx-2" type="button" onClick={() => chageMail == false ? setChageMail(true) : setChageMail(false)} >change</button>
                                                { chageMail == false ? "" 
                                                :
                                                <input defaultValue={currentUser.userName} ref={changeEmail} placeholder="enter mail to change" type="text" />}
                                            </div>
                                        </div>
 
                                        <div className=" flex-row align-items-center mb-4"> 
                                            <div className=" form-outline flex-fill mb-0">
                                                <label className="form-label display-6 text-info" ><b>PASSWORD : </b>*****</label>
                                                <br/>
                                                <div className='d-flex'>
                                                <button className="btn btn-warning mx-2" type="button" onClick={() => chagePassword == false ? setChagePassword(true) : setChagePassword(false)} >change</button>
                                                { chagePassword == false ? "" 
                                                :
                                                <div className=''>
                                                    <div className='d-flex '>
                                                        <input ref={changePassword1} placeholder="Enter old password" type="password" />
                                                        <div className='mx-2'  onClick={()=>changeSeePassword1()}>{eye1 == false ? <AiFillEyeInvisible/> : <AiFillEye/> } </div>
                                                    </div>
                                                    <div className='d-flex pt-1'>
                                                        <input ref={changePassword2} placeholder="Enter a new password" type="password" />
                                                        <div className='mx-2'  onClick={()=>changeSeePassword2()}>{eye2 == false ? <AiFillEyeInvisible/> : <AiFillEye/> } </div>
                                                    </div>
                                                    <div className='d-flex pt-1'>
                                                        <input ref={changePassword3} placeholder="Verify new password" type="password" />
                                                        <div className='mx-2'  onClick={()=>changeSeePassword3()}>{eye3 == false ? <AiFillEyeInvisible/> : <AiFillEye/> } </div>
                                                    </div>
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