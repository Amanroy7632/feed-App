import React, { useEffect, useState } from 'react'
import PostCard from '../post/PostCard'
import Alert from '../customalert/Alert'

const Home = ({currentUser}) => {
    const [alertMessage, setAlertMessage] = useState('');
    const [post,setPost]=useState([])
    useEffect(()=>{
        const localData = JSON.parse(localStorage.getItem("posts"))
        if (localData) {
            setPost(localData)
        }
    },[])
    const onClose =()=>{
       setAlertMessage('')
    }
  return (
    <div className=''>
        {alertMessage &&<Alert message={"hello"} onClose={onClose}  />}
       <div className='container w-[80%] m-auto flex flex-col justify-center items-center'>
        <div className=' p-4'>
            <h1 className=' text-3xl font-semibold'>All Feeds are Here</h1>
        </div>
          <div className=' grid grid-cols-4 gap-5'>
             {post.map((p,i)=>{
                return <PostCard key={i} cardInfo={p} currentUser={currentUser} />
             })}
          </div>
       </div>
    </div>
  )
}

export default Home
