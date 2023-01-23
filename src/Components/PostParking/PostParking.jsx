import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App'

export default function PostParking() {
  const {currentUser} = useContext(MyContext);
  const navigate = useNavigate();

  function changeNavigate(){
    navigate("/User")
  }
  useEffect(()=>{
    if(currentUser == undefined){
      changeNavigate();
    }
  }, [])
  
  return (
    <>
      {currentUser == undefined ? changeNavigate()
      :  
      <div>PostParking</div>
      }
    </>
  )
}
