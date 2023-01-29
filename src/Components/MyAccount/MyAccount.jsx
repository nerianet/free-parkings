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
        <div className='row '>
            <div className='col-6 justify-content-center '>My Profile</div>
            <div className='col-6 justify-content-center'>My Posts</div>
        </div>
      
    </div>
      }
      
      
    </div>
  )
}
