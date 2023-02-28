import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { MyContext } from '../../App';
import { Link } from "react-router-dom";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';

export default function Admin() {

  const { id } = useParams();


  const { posts, users } = useContext(MyContext);

  const [currPosts, setCurrPosts] = useState([]);
  const [otherCurrUser, setOtherCurrUser] = useState();

  useEffect(()=>{
    setOtherCurrUser(users.find((e)=> e.userId == id));
    setCurrPosts(posts.filter((e)=> e.userId == id));
  },[])
  
  return (
    <> { !otherCurrUser ? "" :
     <Container className="mt-4 mb-5 vh-100 ">
      <Row>
        <Col md={5} className='mb-sm-0 mb-3 col-sm-6 col-12 d-flex justify-content-sm-start justify-content-center'>
          <Card className="shadow w-sm-100 w-75">
            <Card.Header className="bg-primary text-light">Profile</Card.Header>
            <Card.Body>
              <div className="d-flex flex-column align-items-center">
                <img src={otherCurrUser.profileUrl ? otherCurrUser.profileUrl : "https://via.placeholder.com/150"} alt="Profile" className="rounded-circle mb-3" />
                <h5 className="mb-0">{otherCurrUser.yourName}</h5>
                <small className="text-muted">{otherCurrUser.userName}</small>
              </div>
              <hr />
              
            </Card.Body>
          </Card>
        </Col>
        <Col md={7} className='col-sm-6 col-12 '>
          <Card className="shadow" style={{height:'354px'}}>
            <Card.Header className="bg-secondary shadow text-light">Last Posts</Card.Header>
            <Card.Body>
            {currPosts[0] == undefined ? <Link to={"/PostParking"} className='btn btn-primary raunded-circle'>add post</Link> :
            <Carousel autoPlay showIndicators={true} transitionTime={3} showThumbs={false} infiniteLoop={true} showStatus={true}>
                {currPosts.map((item, i) => (
                <div className='bg-dark'>
                    <img className='w-75' style={{ height:"250px"}}  src={item.imgUrl}/>
                    <Link to={item.id} className='text-primary' key={i} >
                    {/* <img className='w-75' style={{ height:"250px"}}  src={item.imgUrl}/> */}
                    <div className=''>
                        <div className='mt-sm-2'></div>
                        <div>
                            <span className='mt-sm-2 mt-4'>{item.city + ", " + item.street}</span>
                            <span className=''>{} </span>
                        </div>
                        <div className=''>{}</div>
                    </div>
                    </Link>
                </div> 
                ))}
            </Carousel>
            }
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>

          }
    </>
  )
}



























// import React from 'react'
// import MyParking from '../myParking/MyParking'

// export default function Admin() {
//   return (
//     <div>
//       <MyParking/>
//     </div>
//   )
// }
