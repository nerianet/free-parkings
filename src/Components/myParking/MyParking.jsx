import React, { useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../../App';

export default function MyParking() {
    const { id } = useParams();
    const {posts, currentUser, postDelete} = useContext(MyContext);
    const current = posts.find((post) => post.id == id);
    const navigate = useNavigate();


    function deletePost (id, nameFile){
      postDelete(id, nameFile);
      navigate('/MyAccount')
      // let arr = posts.filter((item)=> item.id != id);
      // setMyPosts(arr);
    }

    return (
      <> 
      <div class="container mt-5">
        <div class="row">
          <h1>{current.address}</h1>
          <div class="col-md-6">
            <img src={current.imgUrl} alt="picture parking" class="img-fluid" width={"500px"} />
          </div>
          <div class="col-md-6">
            <h3 class="text-primary">{current.price}₪</h3>
            
          </div>
        </div> 
        <div class="row mt-5">
          <div class="col-md-12">
          <button onClick={()=>deletePost(id, current.nameFile)}>Delete</button>
          </div>
        </div>
      </div>
      </>
    )
}
