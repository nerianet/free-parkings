import React, { useContext, useRef, useState } from 'react';
import { MyContext } from '../../App';
import { useNavigate } from "react-router-dom";

export default function NewUser() {
  const {setNewUser, users,setUsers,setCurrentUser, currentUser} = useContext(MyContext);
  const userName = useRef();
  const pass1 = useRef();
  const pass2 = useRef();
  const Phone = useRef();
  const YourName = useRef();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const found = users.find((user) => user.userName == userName.current.value);
    if(found){
      window.alert("You Hava A Acount");
    } else {
    const user = {
      userName: userName.current.value, 
      Phone: Phone.current.value,
      YourName: YourName.current.value,
      password: pass1.current.value
    }
    if(pass1.current.value!=pass2.current.value){
      window.alert("the password not correct");
    } else {
      setUsers([...users, user]);
      setNewUser(user);
      setCurrentUser(user);
      localStorage.setItem("id", `${user.id}`);
      userName.current.value = "";
      pass1.current.value = "";
      Phone.current.value = "";
      YourName.current.value = "";
      pass2.current.value = "";
      navigate('/');
    }  
  }
}

  return (
  <>
  {currentUser.YourName != undefined ? <div></div> :
  <div class="vh-100" >
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-lg-12 col-xl-11">
          <div class="card text-white" style={{borderRadius: '25px', backgroundColor:'rgba(31, 30, 29, 0.6)'}}>
            <div class="card-body p-md-5">
              <div class="row justify-content-center">
                <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                  <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                  <form class="mx-1 mx-md-4" onSubmit={submitHandler}>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="text" id="form3Example1c" class="form-control" ref={YourName} />
                        <label class="form-label" for="form3Example1c">Your Name</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="number" id="form3Example4c" class="form-control" ref={Phone}/>
                        <label class="form-label" for="form3Example4c">Your Phone</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="email" id="form3Example3c" class="form-control" ref={userName} />
                        <label class="form-label" for="form3Example3c">Your Email</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example4c" class="form-control" ref={pass1}/>
                        <label class="form-label" for="form3Example4c">Password</label>
                      </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                      <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div class="form-outline flex-fill mb-0">
                        <input type="password" id="form3Example4cd" class="form-control" ref={pass2}/>
                        <label class="form-label" for="form3Example4cd">Repeat your password</label>
                      </div>
                    </div>

                    <div class="form-check d-flex justify-content-center mb-5">
                      <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                      <label class="form-check-label" for="form2Example3">
                        I agree all statements in <a href="#!">Terms of service</a>
                      </label>
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="submit" class="btn btn-primary btn-lg">Register</button>
                    </div>

                  </form>

                </div>
                <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                    class="img-fluid" alt="Sample image" />
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
  );
}

