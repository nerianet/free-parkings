import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";

export default function FavoritePosts () {
    const { updatePost, updateUser, currentUser, favoritePosts, setFavoritePosts, posts} = useContext(MyContext);

    function setFavorite(post){
        currentUser.favoritePosts = currentUser.favoritePosts.filter((e)=> e !== post.id);
        updateUser(currentUser);
        post.favorite-=1;
        updatePost(post);
        let v = favoritePosts.filter((e)=> e.id !== post.id);
        if(v[0]){
        setFavoritePosts(v);
        } else {
        setFavoritePosts([]);
        }
    }

    const setFav = (id)=>{
        let p = currentUser.favoritePosts.find((e)=> e === id);
        if(p){
          return (<MdFavorite size={30}/>)
        } else {
          return (<GrFavorite size={30}/>)
        }
    }
    
   

  return (
    <div>
      <div className="row justify-content-center ">
        <div className="row justify-content-around container rounded mr-0">
            {favoritePosts[0] ? favoritePosts.map((post, i) => (
                <div key={i} className="border cards rounded mb-2" style={{ width: "300px", height: "420px" }}>
                    <Link to={post.id} className={'text-decoration-none color-font'}>
                    <div className="d-flex justify-content-center mt-3" style={{ height: "65%" }}>
                        <img className="img-card border rounded" src={post.imgUrl} style={{ height: "90%", width: "100%" }}/>
                    </div>
                    <h4 className=""><b>City: </b>{post.city}</h4>
                    <h5 className=""><b>Street: </b>{post.street}</h5>
                    <h5 className=""><b>Price: </b>{post.price}₪</h5>
                    </Link>
                    <div className="color-font" style={{width:'30px'}} onClick={()=>setFavorite(post)}>
                    {currentUser.favoritePosts[0] ? setFav(post.id) : <GrFavorite size={30}/>}
                    </div>
                </div>
            ))
             : 
            <div>
                <p>You dont have any favorite posts, </p>
                <Link className='text-decoration-none text-dark' to={'/Parkings'}>To add</Link>
            </div>
            }
            </div>
        </div>
    </div>
  )
}
