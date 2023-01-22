import React, { useContext, useRef, useState } from 'react';
import { MyContext } from '../../App';

export default function SignIn() {
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const {handleSubmit, users,setUsers,setCurrentUser} = useContext(MyContext);
  const userName = useRef();
  const pass = useRef();

  const submithandler = (event) => {
    event.preventDefault();
    // Log the user in using the email a
    const user ={
      userName: userName.current.value,
      password: pass.current.value,
    }
    setUsers([...users, user]);
    setEmail(userName.current.value);
    setPassword(pass.current.value);
    handleSubmit(user);
    setCurrentUser(userName.current.value);
    userName.current.value = "";
    pass.current.value = "";
  }
  console.log(password);
  return (
    <form onSubmit={submithandler}>
      <label>
        Email:
        <input type="email" ref={userName} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" ref={pass} />
      </label>
      <br />
      <button type="submit">Sign In</button>
    </form>
  );
}
