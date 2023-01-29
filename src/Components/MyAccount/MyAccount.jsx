import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../../App';

export default function MyAccount() {
  const navigate = useNavigate();
  const {currentUser} = useContext(MyContext);

  const changeNavigate = () => {
    navigate("/LogIn");
  };

  useEffect(() => {
    if (currentUser == undefined)
      changeNavigate();
  }, []);

  return (
    <div className='container'>
      {currentUser == undefined ? changeNavigate() :
      <div className='border'>
        <div className='d-flex justify-content-center '>
            <div className='col-6 '>My Profile</div>
            <div className='col-6'>My Posts</div>
        </div>
      
    </div>
      }
      
      
    </div>
  )
}
