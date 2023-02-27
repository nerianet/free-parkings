import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../../App';



export default function MyParking() {
    const { id } = useParams();
    const {posts, currentUser, postDelete, updatePost} = useContext(MyContext);
    const navigate = useNavigate();
    const [change, setChange] = useState(false);
    const [changePrice, setChangePrice] = useState(false);
    const [changeTime, setChangeTime] = useState(false);


    const priceRef = useRef();
    const timeRef = useRef();

    const current = posts.find((post) => post.id == id);

    function deletePost (id, nameFile){
      postDelete(id, nameFile);
      navigate('/MyAccount');
    }

    function setNewCurrent(current, key, value){
      if(!value) return 0;
      current[key] = value;
      updatePost(current);
      if(key === 'price'){
        setChangePrice(!changePrice);
      } else if(key === 'activityTime'){
        setChangeTime(!changeTime);
      }
    }

    return (
      <>
      {!current ? "" : 
      <div class="container mt-5">
        <div class="row">
          <h1>{current.city + ', ' + current.street}</h1>
          <div class="col-md-6">
            <img src={current.imgUrl} alt="picture parking" className="img-fluid" style={{width:'400px', height: '200px'}} />
          </div>
          <div class="col-md-6">
            <p class="text-primary mt-2 display-6">Price: {current.price}₪
            <div className='btn btn-primary mx-4' onClick={()=>setChangePrice(!changePrice)}>Edit</div>
            {!changePrice ? "" : <div>
            <input className='w-50 mt-2' type="number" ref={priceRef}/>
            <div className='btn btn-primary mx-1' onClick={(e)=>setNewCurrent(current, 'price', priceRef.current.value)}>Ok</div>
            </div>
            }
            </p>
          </div>
          <div class="col-md-6">
            <p class="text-primary mt-2 display-6">Activity Time: {current.activityTime}
            <div  className='btn btn-primary mx-4' onClick={()=>setChangeTime(!changeTime)}>Edit</div>
            {!changeTime ? "" : <div>
            <input className='w-50 mt-2' type="text" ref={timeRef} />
            <div className='btn btn-primary mx-1' onClick={(e)=>setNewCurrent(current, 'activityTime', timeRef.current.value )}>Ok</div>
            </div>
           }
            </p>
          </div>
        </div> 
        <div class="row mt-5">
          <div class="col-md-12">
          <div className='btn btn-danger mb-2' onClick={()=>deletePost(id, current.nameFile)}>Delete Post</div>
          </div>
        </div>
      </div>}
      </>
    )
}
