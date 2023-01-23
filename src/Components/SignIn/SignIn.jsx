import React, { useContext, useRef, useState } from 'react';
import { MyContext } from '../../App';

export default function SignIn() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const {handleSubmit, users,setUsers,setCurrentUser} = useContext(MyContext);
 
  const userName = useRef();
  const pass = useRef();
  const pass2 = useRef();
  const Phone = useRef();
  const YourName = useRef();
  const submithandler = (event) => {
    
    event.preventDefault();
    // Log the user in using the email a
    const user ={
      userName: userName.current.value, 
      Phone: Phone.current.value,
      YourName: YourName.current.value,
      password: pass.current.value
    }
    setUsers([...users, user]);
    setEmail(userName.current.value);
    setPassword(pass.current.value);
    handleSubmit(user);
    setCurrentUser(YourName.current.value);
    userName.current.value = "";
    pass.current.value = "";
    Phone.current.value = "";
    YourName.current.value = "";
    pass2.current.value = "";
  }
  //console.log(password);
  return (
    <div className='container d-flex justify-content-center'>
      <form className='' onSubmit={submithandler}>
        <label className='w-50'>
          Email:
          <input type="email" ref={userName} />
        </label>
        <br />
        <label className='w-50'>
          Phone:
          <input type="number" ref={Phone} />
        </label>
        <br />
        <label className='w-50'>
          Your Name:
          <input type="text" ref={YourName} />
        </label>
        <br />
        <label className='w-50'>
          Password:
          <input type="password" ref={pass} />
        </label>
        <br />
        <label className='w-50'>
          Confirm Password:
          <input type="password" ref={pass2} />
        </label>
        <br />
        <button className='mt-3 btn btn-primary' type="submit">Sign In</button>
      </form>
    </div>
  );
}
