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

export default function MyAccount() {
  const navigate = useNavigate();

  const { currentUser, posts, updateUser, userDelete, setUsers, users, setCurrentUser } = useContext(MyContext);

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

  const localeUId = localStorage.getItem('userId');

  useEffect(() => {
    setTimeout(() => {
        
    }, 5000);
    if (!localeUId){
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

    function deleteUser(id){
        userDelete(id);
        localStorage.clear();
        setUsers(users.filter((e)=> e.id != id));
        setCurrentUser({});
        navigate(`/`);
    }

  return (
    <>
     <Container className="mt-4 mb-5 vh-100 ">
      <Row>
        <Col md={5} className='mb-sm-0 mb-3 col-sm-6 col-12 d-flex justify-content-sm-start justify-content-center'>
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
<hr/>
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
<hr/>
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
<hr/>
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
<hr/>
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
<hr/>
<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
    <button type="submit" className="btn btn-primary btn-lg mt-4">submit</button>
</div>
</form>
              </div>}
            </Card.Body>
          </Card>
        </Col>
        <Col md={7} className='col-sm-6 col-12 d-flex flex-column align-items-center'>
          <Card className="shadow" style={{height:'354px'}}>
            <Card.Header className="bg-secondary shadow text-light">Last Posts</Card.Header>
            <Card.Body>
            {myPosts[0] == undefined ? <Link to={"/PostParking"} className='btn btn-primary raunded-circle'>add post</Link> :
            <Carousel autoPlay showIndicators={true} transitionTime={3} showThumbs={false} infiniteLoop={true} showStatus={true}>
                {myPosts.map((item, i) => (
                <Link to={item.id} className='bg-dark'>
                    <div className='text-primary ' key={i} >
                        <img className='w-75 ' style={{ height:"250px"}}  src={item.imgUrl}/>
                        <div className=''>
                            <div className='mt-sm-2'></div>
                            <div>
                                <span className='mt-sm-2 mt-4'>{item.city + ", " + item.street}</span>
                                <span className=''>{} </span>
                            </div>
                            <div className=''>{}</div>
                        </div>
                    </div>
                </Link> 
                ))}
            </Carousel>
            }
            </Card.Body>
          </Card>
          <div className='btn btn-danger mt-3 d-flex justify-content-center w-50' onClick={()=> deleteUser(currentUser.id)}>Delete My Account</div>
        </Col>
      </Row>
    </Container>

    
    </>
  )
}