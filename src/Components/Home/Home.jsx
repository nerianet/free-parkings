import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { location } from "../API/APIs";
import { GrFavorite } from "react-icons/gr";
import { MdFavorite } from "react-icons/md";
import { height } from "@mui/system";

export default function Home() {
  const {setInput, popularPosts, currentUser, setFavoritePosts, favoritePosts, updatePost, updateUser} = useContext(MyContext);
  const [inputData, setInputData] = useState([]); 
  
  

  let v = document.getElementById('search');
  function startSearch(){
    setInput(v.value.charAt(0).toUpperCase() + v.value.slice(1));
  }

  useEffect(()=>{
    setInput('');
  },[])
  
  function addToIn(e){
    v.value = e;
    setInputData([]);
  }

  function getData(e){
    location(e, setInputData);
  }

  function setFavorite(post){
    if(currentUser.id){
      let p = currentUser.favoritePosts.filter((e)=> e === post.id);
      if(p[0]){
        currentUser.favoritePosts = currentUser.favoritePosts.filter((e)=>e !== post.id);
        updateUser(currentUser);
        post.favorite-=1;
        updatePost(post);
        let v = favoritePosts.filter((e)=> e.id !== post.id);
        if(v[0]){
          setFavoritePosts(v);
        } else {
          setFavoritePosts([]);
        }
      } else {
        currentUser.favoritePosts = [...currentUser.favoritePosts, post.id];
        updateUser(currentUser);
        post.favorite+=1;
        updatePost(post);
        setFavoritePosts([...favoritePosts, post]);
      }
    } else {
      window.alert("Please log in");
    }
    
  }

  const setFav = (id)=>{
    if(currentUser.id){
      let p = currentUser.favoritePosts.find((e)=> e === id);
      if(p){
        return (<MdFavorite size={30}/>)
      } else {
        return (<GrFavorite size={30}/>)
      }
    }
  }


  return (
  <>
  <div className="container-fluid row m-0">
    <div className="col-12">
    <h1 className="d-flex justify-content-center display-2">Search Parkings</h1>
      <div className="d-flex flex-wrap justify-content-center"> 
        <p className="d-flex justify-content-center pb-sm-2 fs-1 ">Here you can easily </p>
        <p className="d-flex justify-content-center pb-2 fs-1 mx-2">find parking</p>
      </div>
      <div className="d-flex justify-content-center display-6">Choose City ...</div>
      <div className="d-flex justify-content-center col-12">
        <div className="col-sm-6 col-12">
          <div class="input-group d-flex justify-content-center w-sm-75 rounded" style={{border: "4px solid rgb(111, 184, 184)", shadow: "2px 2px 12px 2px rgb(12, 11, 11)" }}>
            <input id="search" type="text" className="form-control" placeholder="Please Enter City" onChange={e=>getData(e.target.value) } />
            <div class="input-group-append">
              <Link to={'/Parkings'}><button class="btn btn-outline-secondary" type="button" onClick={startSearch}>Search</button></Link>
            </div>
          </div>
          <div className="">{inputData.map((e, i)=>(
            <div className="border bg-light">{i < 1 ? <div onClick={e=>addToIn(e.target.innerHTML)} className="btn text-dark" >{e.properties.city+ ', ' + e.properties.country}</div> 
              : 
              inputData[i].properties.city == inputData[i-1].properties.city ? ""
              : 
              <div className="btn text-dark" onClick={e=>addToIn(e.target.innerHTML)}>{e.properties.city+ ', ' + e.properties.country}</div>}
            </div>))}
          </div>
        </div>
      </div>

    </div>
    <div className="d-flex justify-content-center flex-wrap">
      <div className="col-sm-5 col-10 mx-sm-3 d-flex justify-content-center mb-sm-0 mb-2 rounded  h-sm-75" >
        <img  src="https://i.imagesup.co/images2/6d4130c2afe7821e921360c5d3c789ed38a6ab64.png" width={'100%'}/>
      </div>
      <div className="col-sm-5 col-12 d-flex flex-sm-wrap flex-column align-items-center">
        <div className="mx-4 mb-1">
          <div className="display-2 text-light"><b>Hellow </b></div>
          <div className="display-3 text-light">How are you</div>
          <div className=" d-flex mt-3 w-75 justify-content-between">
            <Link id="linkToParkings" to={"/Parkings"} className="btn btn-outline-light w-100 hover-overlay">Search Parkings</Link>
            <Link to={"/PostParking"} className="btn text-light w-100">post parking</Link>
          </div>
        </div>
      </div>
    </div>

    <div className="row justify-content-center ">
    <div className="row justify-content-around container rounded mr-0">
   
      {popularPosts[0] ? popularPosts.map((item, i) => (
        <div className="border cards rounded mb-2" style={{ width: "300px", height: "450px" }}>
          <Link to={item.id} key={i} className={'text-decoration-none color-font'}>
          <div className="d-flex justify-content-center mt-3" style={{ height: "65%" }}>
              <img className="img-card border rounded" src={item.imgUrl} style={{ height: "90%", width: "100%" }}/>
          </div>
          <h5 className=""><b>City: </b>{item.city}</h5>
          <h5 className=""><b>Street: </b>{item.street.length > 20 ? item.street.substring(0, 20) + "..." : item.street }</h5>
          <h5 className=""><b>Price: </b>{item.price}₪</h5>
          </Link>
          <div className="d-flex justify-content-between">
            <div>{item.favorite + " Like this parking "}</div>
            <div className="color-font" style={{width:'30px'}} onClick={()=>setFavorite(item)}>
              {currentUser.id ? currentUser.favoritePosts[0] ? setFav(item.id) : <GrFavorite size={30}/> :  <GrFavorite size={30}/>}
            </div>
          </div>
        </div>
      )) :''}
    </div>
  </div>

    
  </div>
  </>
  );
}


//style={{width: '80%'}}
