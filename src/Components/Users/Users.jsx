import React, { useContext, useState } from 'react'
import { MyContext } from '../../App'

export default function Users() {
    const {users, posts} = useContext(MyContext);
    const [currPosts, setCurrPosts] = useState([]);
    const [seePosts, setSeePosts] = useState(false);

    function setPosts(e){
        setSeePosts(!seePosts);
    }

  return (
    <div>
        {users.map((u, i)=>( <div>
            <div>{(i + 1) + '. ' + u.userName}</div>
            <div className='btn btn-warning' onClick={e => setPosts(u)}>See Posts</div>
        </div>
        ))}
    </div>
  )
}
