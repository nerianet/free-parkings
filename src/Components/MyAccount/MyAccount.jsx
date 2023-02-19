import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../App';
import { Link } from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import './myAccount.css'

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
  const [change, setChange] = useState(false);

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
      {/* {currentUser.yourName == undefined ? navigate('/LogIn') :
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
                            <div className="card text-white" style={{ borderRadius: "25px", backgroundColor: "rgba(100, 140, 149, .7)",}}>
                                <div className="card-body p-md-5">
                                    <p className="text-center text-primary h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">My Profile</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>} */}

        <Container className="mt-4 mb-5">
      <Row>
        <Col md={4} className='mb-sm-0 mb-3 col-sm-5 col-12 d-flex justify-content-sm-start justify-content-center'>
          <Card className="shadow w-sm-100 w-75">
            <Card.Header className="bg-primary text-light">Profile</Card.Header>
            <Card.Body>
              <div className="d-flex flex-column align-items-center">
                <img src={currentUser.profileUrl ? currentUser.profileUrl : "https://via.placeholder.com/150"} alt="Profile" className="rounded-circle mb-3" />
                <h5 className="mb-0">{currentUser.yourName}</h5>
                <small className="text-muted">{currentUser.userName}</small>
              </div>
              <hr />
              <Button variant="primary" block onClick={()=>setChange(!change)}>Edit Profile</Button>
              {!change ? "" : 
              <div>
                <form className="mx-1 mx-md-4" onSubmit={submitChange} >

<div className="d-flex flex-row align-items-center mb-4">
    <div className="form-outline flex-fill mb-0">
        <label className="form-label text-info" ><b>NAME : </b>{currentUser.yourName} </label>
        <br/>
        <button className="btn btn-warning mx-2" type="button" onClick={() => chageName == false ? setChageName(true) : setChageName(false)}>change</button>
        { chageName == false ? "" 
        :
        <input defaultValue={currentUser.yourName} id="mo" ref={changeName} placeholder="enter name to change" type="text" />}
    </div>
</div>

<div className="d-flex flex-row align-items-center mb-4">
    <div className="form-outline flex-fill mb-0">
        <label className="form-label text-info" ><b>PHONE : </b>{currentUser.phone} </label>
        <br/>
        <button className="btn btn-warning mx-2" type="button" onClick={() => chagePhone == false ? setChagePhone(true) : setChagePhone(false)}>change</button>
        { chagePhone == false ? "" 
        :
        <input defaultValue={currentUser.phone} ref={changePhone} placeholder="enter phone to change" type="text" />}
    </div>
</div>

<div className="d-flex flex-row align-items-center mb-4">
    <div className="form-outline flex-fill mb-0">
        <label className="form-label text-info" ><b>ADDRESS : </b>{currentUser.address} </label>
        <br/>
        <button className="btn btn-warning mx-2" type="button" onClick={() => chageAddress == false ? setChageAddress(true) : setChageAddress(false)} >change</button>
        { chageAddress == false ? "" 
        :
        <input defaultValue={currentUser.address} ref={changeAddress} placeholder="enter address to change" type="text" />}
    </div>
</div>

<div className="d-flex flex-row align-items-center mb-4">
    <div className="form-outline flex-fill mb-0">
        <label className="form-label text-info" ><b>MAIL : </b>{currentUser.userName} </label>
        <br/>
        <button className="btn btn-warning mx-2" type="button" onClick={() => chageMail == false ? setChageMail(true) : setChageMail(false)} >change</button>
        { chageMail == false ? "" 
        :
        <input defaultValue={currentUser.userName} ref={changeEmail} placeholder="enter mail to change" type="text" />}
    </div>
</div>

<div className=" flex-row align-items-center mb-4"> 
    <div className=" form-outline flex-fill mb-0 ">
        <label className="form-label text-info" ><b>PASSWORD : </b>*****</label>
        <br/>
        <div className='d-flex'>
        <button className="btn btn-warning mx-2" type="button" onClick={() => chagePassword == false ? setChagePassword(true) : setChagePassword(false)} >change</button>
        { chagePassword == false ? "" 
        :
        <div className=''>
            <div className='d-flex '>
                <input className='in' ref={changePassword1} placeholder="Old password" type="password" />
                <div className='mx-2'  onClick={()=>changeSeePassword1()}>{eye1 == false ? <AiFillEyeInvisible/> : <AiFillEye/> } </div>
            </div>
            <div className='d-flex pt-1'>
                <input className='in' ref={changePassword2} placeholder="New password" type="password" />
                <div className='mx-2'  onClick={()=>changeSeePassword2()}>{eye2 == false ? <AiFillEyeInvisible/> : <AiFillEye/> } </div>
            </div>
            <div className='d-flex pt-1'>
                <input className='in' ref={changePassword3} placeholder="Verify new password" type="password" />
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
              </div>}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8} className='col-sm-7 col-12 '>
          <Card className="shadow" style={{height:'354px'}}>
            <Card.Header className="bg-secondary text-light">Last Activity</Card.Header>
            <Card.Body>
            <Carousel autoPlay showIndicators={true} showThumbs transitionTime={3} infiniteLoop={true} showStatus={true}>
                    {posts.map((item, i) => (
                    <div className='bg-dark'>
                        <Link to={item.id} className='text-primary' key={i} >
                        <img className='w-75' style={{ height:"250px"}}  src={item.imgUrl}/>
                        <div className=''>
                            <div className=''>{}Momo</div>
                            <div>
                            <span className=''>{}</span>
                            <span className=''>{} </span>
                            </div>
                            <div className=''>{}</div>
                        </div>
                        </Link>
                    </div> 
                    ))}
                </Carousel>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

    
    </>
  )
}