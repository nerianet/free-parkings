import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../../App';



export default function MyParking() {
    const { id } = useParams();
    const {posts, currentUser, postDelete} = useContext(MyContext);
    const current = posts.find((post) => post.id == id);
    const navigate = useNavigate();
    const [change, setChange] = useState(false);
    const [changePrice, setChangePrice] = useState(false);
    const [changeTime, setChangeTime] = useState(false);
    const priceRef = useRef();
    const timeRef = useRef();



    function deletePost (id, nameFile){
      postDelete(id, nameFile);
      navigate('/MyAccount');
    }

    useEffect(()=>{
      console.log(changeTime)
    }, [changeTime])

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
            <div className='btn btn-primary mx-1'>Ok</div>
            </div>
            }
            </p>
          </div>
          <div class="col-md-6">
            <p class="text-primary mt-2 display-6">Activity Time: {current.activityTime}
            <div  className='btn btn-primary mx-4' onClick={()=>setChangeTime(!changeTime)}>Edit</div>
            {!changeTime ? "" :
            <input className='w-50 mt-2' type="text" ref={timeRef} />
            }
            </p>
          </div>
        </div> 
        <div class="row mt-5">
          <div class="col-md-12">
          <button onClick={()=>deletePost(id, current.nameFile)}>Delete</button>
          </div>
        </div>

        {/* <Button variant="primary" block onClick={()=>setChange(!change)}>Edit Profile</Button>
              {!change ? "" : 
              <div>
                <form className="mx-1 mx-md-4" onSubmit >

<div className="d-flex flex-row align-items-center mb-4">
    <div className="form-outline flex-fill mb-0">
        <label className="form-label text-info" ><b>NAME : </b>{currentUser.yourName} </label>
        <br/>
        <button className="btn btn-warning mx-2" type="button" onClick={() => chageName == false ? setChageName(true) : setChageName(false)}>change</button>
        { chageName == false ? "" 
        :
        <input defaultValue={currentUser.yourName} id="mo" ref={changeName} placeholder="enter name to change" type="text" />}
    </div>
</div>
<hr/>
<div className="d-flex flex-row align-items-center mb-4">
    <div className="form-outline flex-fill mb-0">
        <label className="form-label text-info" ><b>PHONE : </b>{currentUser.phone} </label>
        <br/>
        <button className="btn btn-warning mx-2" type="button" onClick={() => chagePhone == false ? setChagePhone(true) : setChagePhone(false)}>change</button>
        { chagePhone == false ? "" 
        :
        <input defaultValue={currentUser.phone} ref={changePhone} placeholder="enter phone to change" type="text" />}
    </div>
</div>
<hr/>
<div className="d-flex flex-row align-items-center mb-4">
    <div className="form-outline flex-fill mb-0">
        <label className="form-label text-info" ><b>ADDRESS : </b>{currentUser.address} </label>
        <br/>
        <button className="btn btn-warning mx-2" type="button" onClick={() => chageAddress == false ? setChageAddress(true) : setChageAddress(false)} >change</button>
        { chageAddress == false ? "" 
        :
        <input defaultValue={currentUser.address} ref={changeAddress} placeholder="enter address to change" type="text" />}
    </div>
</div>
<hr/>
<div className="d-flex flex-row align-items-center mb-4">
    <div className="form-outline flex-fill mb-0">
        <label className="form-label text-info" ><b>MAIL : </b>{currentUser.userName} </label>
        <br/>
        <button className="btn btn-warning mx-2" type="button" onClick={() => chageMail == false ? setChageMail(true) : setChageMail(false)} >change</button>
        { chageMail == false ? "" 
        :
        <input defaultValue={currentUser.userName} ref={changeEmail} placeholder="enter mail to change" type="text" />}
    </div>
</div>
<hr/>
<div className=" flex-row align-items-center mb-4"> 
    <div className=" form-outline flex-fill mb-0 ">
        <label className="form-label text-info" ><b>PASSWORD : </b>*****</label>
        <br/>
        <div className='d-flex'>
        <button className="btn btn-warning mx-2" type="button" onClick={() => chagePassword == false ? setChagePassword(true) : setChagePassword(false)} >change</button>
        { chagePassword == false ? "" 
        :
        <div className=''>
            <div className='d-flex '>
                <input className='in' ref={changePassword1} placeholder="Old password" type="password" />
                <div className='mx-2'  onClick={()=>changeSeePassword1()}>{eye1 == false ? <AiFillEyeInvisible/> : <AiFillEye/> } </div>
            </div>
            <div className='d-flex pt-1'>
                <input className='in' ref={changePassword2} placeholder="New password" type="password" />
                <div className='mx-2'  onClick={()=>changeSeePassword2()}>{eye2 == false ? <AiFillEyeInvisible/> : <AiFillEye/> } </div>
            </div>
            <div className='d-flex pt-1'>
                <input className='in' ref={changePassword3} placeholder="Verify new password" type="password" />
                <div className='mx-2'  onClick={()=>changeSeePassword3()}>{eye3 == false ? <AiFillEyeInvisible/> : <AiFillEye/> } </div>
            </div>
            </div>}
        </div>
        
    </div>
</div>
<hr/>
<div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
    <button type="submit" className="btn btn-primary btn-lg mt-4">submit</button>
</div>
</form>
              </div>} */}
      </div>}
      </>
    )
}
